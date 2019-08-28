import React, {Component} from 'react'
import {View,ActivityIndicator,AsyncStorage,Dimensions,Alert} from 'react-native'
import {MainStackContainer,LoginStackContainer,MainStackWithIntroContainer} from '../config/router' 
import {observer,inject} from 'mobx-react/native'
import store from '../store'
import userstore from '../userStore'
import { Permissions, Notifications } from 'expo';


@inject('store','userstore')
@observer
export default class Main extends Component {
	constructor(props){
		super(props);
		this.state={
			loading:true,
      alreadyLaunched:false
		}
	}
  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    this.props.store.entertoken(token);
  }
	componentWillMount=()=>{
    AsyncStorage.getItem("alreadyLaunched").then(value => {
        console.log(value+'1')
          if(value == 'true'){
            this.setState({alreadyLaunched:true})
          }
          else{
            this.setState({alreadyLaunched:false})
          }
          })
		  AsyncStorage.getItem('id_token').then((token)=>{
			if(token !=null){
			this.props.userstore.enterjwt(token)
			this._onSubmit(token);
		}
			else{
				this.setState({loading:false})
				this.props.store.authIt(false)
			}
		})
  }
  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }
	_onSubmit= async (token) => {
    return await fetch('http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile', {
              method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':token
              },
            }).then((response)=>response.json())
              .then((responseJson)=>{this._onSuccess(responseJson)})         
  }
  _onSuccess=(responseJson)=>{
      this.setState({loading:false});
      this.props.userstore.enter(decodeURI(responseJson.fullname))
      this.props.userstore.enterpid(responseJson._id)
      this.props.userstore.enterdp(responseJson.dp)
      this.props.userstore.entereaglemode(responseJson.eagle_mode)
      this.props.userstore.enterlatlang(responseJson.latitude,responseJson.longitude)
      this.props.store.authIt(true);
      
      responseJson.skill_set.map((items)=>{
      this.props.userstore.enterskills(decodeURI(items.skill_name),items.skill_rating);
    })
      responseJson.interests.map((items)=>{
        this.props.userstore.enterinterests(decodeURI(items.text));
      })
      //console.log(this.props.userstore.pid)
  }
  renderComponent(){
    console.log(Math.round(Dimensions.get('window').width));
    console.log(Math.round(Dimensions.get('window').height));
  	if (this.props.store.isAuth) {
      if(this.state.alreadyLaunched){
        return (<MainStackContainer screenProps={{image:this.props.userstore.dp}}/>);
       
      }
      else{
        return (<MainStackWithIntroContainer screenProps={{image:this.props.userstore.dp}}/>);
        
      }
	    } else {
	      return (<LoginStackContainer/>);
	    }
  }
  render() {
  	if (this.state.loading) {
      return (
      	<View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large" color="#62c4ac" />
         </View>
      )
    }
    return(
    this.renderComponent()
    )
	}
}