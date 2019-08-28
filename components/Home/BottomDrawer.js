import React,{Component} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image,FlatList ,Modal,TouchableWithoutFeedback,ActivityIndicator} from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import {Feather,AntDesign} from '@expo/vector-icons'
import {inject,observer} from 'mobx-react/native'
import userstore from '../../userStore'
import {LinearGradient} from 'expo'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
  import Orientation from 'react-native-orientation'
@inject('userstore')
@observer
export default class Bottomdrawer extends Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      modalVisible:false,
      skills:[],
      title:'',
      bio:'',
      requirements:'',
      location:'',
      dp:'',
      requests:0,
      connections:0,
      rating:0,
      fullname:'',
      pid:'',
      alreadysent:false,
      alreadyreceived:false,
      alreadyconnection:false,
      loading:true,
      loadingModal:true,
    }
  }
  _sendConnectionRequest = async(pid) =>{
    var details ={
        other_id:pid
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

    //return await fetch('http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/sendConnectionRequest', {
      return await fetch(this.props.userstore.baseURL + 'dashboard/sendConnectionRequest', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>responseJson)
  }
  componentDidMount() {
    // lor(this);
    Orientation.addOrientationListener(this._orientationDidChange)
   }
 
   componentWillUnmount() {
     //rol();
     Orientation.removeOrientationListener(this._orientationDidChange)
   }
   _orientationDidChange(orientation) {
     // console.log(orientation)
   }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  _checkRequest= async(id) =>{
    var details ={
        other_id:id
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
 //   await fetch('http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/checkRequest',{
  await fetch(this.props.userstore.baseURL + 'dashboard/checkRequest',{
      method:'POST',
      headers:{
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token':this.props.userstore.jwt
      },
      body:formBody
    }).then(response=>response.json())
    .then(responseJson => {this.setState({loadingModal:false,alreadysent:responseJson.request,alreadyconnection:responseJson.connection,alreadyreceived:responseJson.received})})

  }
  _filterPeople = async(filter) =>{
     var details ={
        latitude:encodeURI(this.props.userstore.latitude),
        longitude:encodeURI(this.props.userstore.longitude),
        radius:encodeURI(parseInt(this.props.userstore.radius,10))
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // let data= await fetch(this.props.userstore.dashboard, {
    let data= await fetch(this.props.userstore.baseURL + 'dashboard/show', {
              method: 'POST',
              headers: {
                
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : this.props.userstore.jwt
              },
              body: formBody,
            }).then((response)=>response.json())
              .then((responseJson)=>responseJson)
              this.setState({data:data,loading:false})
    
  }
  componentWillMount= async () =>{
    this.timer = setInterval(()=> this._filterPeople('location'), 1000);
  //   var details ={
  //       latitude:encodeURI(this.props.userstore.latitude),
  //       longitude:encodeURI(this.props.userstore.longitude),
  //       radius:encodeURI(parseInt(this.props.userstore.radius,10))
  //     }

  //     var formBody = [];
  //     for (var property in details) {
  //     var encodedKey = encodeURIComponent(property);
  //     var encodedValue = encodeURIComponent(details[property]);
  //     formBody.push(encodedKey + "=" + encodedValue);
  //     }
  //     formBody = formBody.join("&");

  //   let data= await fetch('https://nameless-refuge-91292.herokuapp.com/dashboard/show', {
  //             method: 'POST',
  //             headers: {
                
  //               'Content-Type': 'application/x-www-form-urlencoded',
  //               'x-access-token' : this.props.userstore.jwt
  //             },
  //             body: formBody,
  //           }).then((response)=>response.json())
  //             .then((responseJson)=>responseJson)
  //             this.setState({data})
  // }
  // <View style = {styles.part}>
  //       <Image
  //               style={styles.profile}
  //               source={{uri:item.properties.item.dp}}
  //             />
  //             <Text style={styles.info}>{item.properties.item.fullname}{'\n'}Delhi</Text>
  //       </View>
}
  render(){
    return(
      <LinearGradient
      colors={['#3AB1A7' , '#49B274']}
      style={{height:'100%'}}
      >
      <View style= {styles.container}>
      {
        this.state.loading?
        <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start'}}>
            <ActivityIndicator style={{padding:'20%'}} size="large" color="#ffffff" />
          </View>
          :
      <FlatList
        horizontal ={true}
        data={this.state.data}
        renderItem={
          ({item}) => (
              <View style = {styles.part}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PersonProfile',{id:item._id})}}
            onLongPress={()=>{{
            this._checkRequest(item._id);
            this.setState({
            modalVisible:true,
            loadingModal:true,
            fullname:decodeURI(item.fullname),
            dp:item.dp,
            skills:item.skill_set.sort(function(a, b){
                        return a.skill_rating - b.skill_rating;
                    }).reverse().filter((item,i)=> i < 5),
            title:decodeURI(item.title),
            location:'Delhi',
            connections:item.connections,
            requests:item.requests,
            rating:item.rating,
            bio:decodeURI(item.bio),
            pid:item._id

          })}}}>

          <Image
                  style={styles.profile}
                  source={{uri:item.dp}}
                />
          </TouchableOpacity >
                      <Text style={styles.info}>{decodeURI(item.fullname)}{'\n'}Delhi</Text>
                </View>
          )
        }
      >
      </FlatList>
    }
      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible)}}
          >
          <TouchableWithoutFeedback onPress= {()=>{this.setModalVisible(!this.state.modalVisible)}}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
    <View style={styles.modal}>
          <LinearGradient
      colors={['#3AB1A7' , '#49B274']}
      style={{height:'100%' , width:'100%' , borderRadius:20,padding:25}}
      >
        { 
          this.state.loadingModal?
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
          :
          <View style ={{flex:1,flexDirection:'column'}}>
              <View style={{flex:0.5,flexDirection:'row',justifyContent:'flex-start'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PersonProfile',{id:this.state.pid});this.setModalVisible(false)}}>
                <Image
                        style={styles.profile}
                        source={{uri:this.state.dp}}
                      />
              </TouchableOpacity >
              <View style={{flex:1,flexDirection:'column',marginTop:15,margin:5}}>
                <Text style={{textAlign:'left' ,color:'white',fontSize:20,fontWeight:'bold',fontFamily: 'sans-serif-light'}}>{decodeURI(this.state.fullname)}</Text>
                <Text style={{textAlign:'left',color:'white',fontFamily: 'sans-serif-light'}}>{this.state.title}</Text>
                <Text style={{textAlign:'left',color:'white',fontFamily: 'sans-serif-light'}}>{this.state.location}</Text>  
              </View>
              {
                this.state.alreadysent || this.state.alreadyreceived?
                <TouchableWithoutFeedback>
                  <Feather name="clock" size={32} color="#ffffff" style={{padding:22}} />
                </TouchableWithoutFeedback>
                :
                this.state.alreadyconnection?
                <TouchableWithoutFeedback>
                       <AntDesign name="checkcircleo" size={32} color="#ffffff" style={{padding:22}} />
                </TouchableWithoutFeedback>
                :
                <TouchableOpacity onPress = {()=>{this._sendConnectionRequest(this.state.pid);this.setState({alreadysent:true})}}>
                  <Image style={{height:30,width:30,margin:20}} source={require('../../assets/add.png')} />
                </TouchableOpacity>
              }
              </View>

              <View style={{flex:0.5,padding:10}}>
                <Text style={{color:'white'}}>
                {this.state.bio}
                </Text>
              </View>
              <View style={styles.connections}>
                <Text style={{textAlign:'center' ,color:'white',fontWeight: 'bold'}}>{this.state.requests}{'\n'} Requests</Text>
                <Text style={{textAlign:'center',color:'white',fontWeight: 'bold'}}>{this.state.connections}{'\n'} Connections</Text>
                <Text style={{textAlign:'center',color:'white',fontWeight: 'bold'}}>{this.state.rating}{'\n'} Rating</Text>  
              </View>
              <View>
              {  
                
                this.state.skills.map((items,i)=>{
                 return(
                  <View key={i} style={{margin:5 , flexDirection:'row' , justifyContent:'space-around'}}>
                  <View style={{flex:0.6}}>
                  <Text style={{fontSize:10 , textAlign:'center',alignItems:'center' ,color:'white',fontFamily: 'sans-serif-light'}}>{decodeURI(items.skill_name)}</Text>   
                  </View>
                  <View style={{flex:0.3}}> 
                     <ProgressBarAnimated
                        width={100}
                        height={8}
                        value={20*items.skill_rating}
                        backgroundColor='white'
                        borderColor = 'white'
                      />
                    </View>  
                  </View>
                 )
              }
              )
            }
          </View>
          </View>
        }
          </LinearGradient>
            </View>
            </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
        </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    padding:20
  },
  part:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center'
  },
  profile:{
    justifyContent:'flex-start',
    alignItems:'center',
    borderRadius:40,
    width:80,
    height:80,
    margin:20,
    marginBottom:0,
    borderWidth:5,
    borderColor:'white',
  },
  info:{
    fontSize:15,
    color:'white',
    alignItems:'center',
    textAlign:'center',
    fontWeight:'bold',fontFamily: 'sans-serif-light'
  },
  modal:{
    flexDirection:'column',
    width: '90%',
    height: '65%',
    backgroundColor:'#ecf0f1',
    borderRadius:20,
  },
  modalBackground:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.5)'
    },
  connections:{
    flex:0.3,
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
})