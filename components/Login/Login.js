import React, {Component} from 'react';
import {AsyncStorage,Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput,ImageBackground,ActivityIndicator,Modal,Image } from 'react-native';
import {observer , inject} from 'mobx-react/native'
import {usernameChange} from '../../store' 
import store from '../../store'
import {Alert} from 'expo';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
  import LinkedInModal from 'react-native-linkedin'
@inject('store','userstore')
@observer
export default class Login extends Component{
	constructor(props){
		super(props);
		this.state={
      phone:'',
			pass:'',
      success:false,
      verified:false,
      message:'',
      loading:false
    }
    //StatusBar.setHidden(true);
    this.refPass = React.createRef();
    
  }
  state = {
    access_token: undefined,
    expires_in: undefined,
    refreshing: false,
  }

  async getUser({ access_token }) {
    this.setState({ refreshing: true })
   // const baseApi = 'https://api.linkedin.com/v1/people/'
   //https://api.linkedin.com/v2/me?projection=(id,firstName,lastName)
   const baseApi ='https://api.linkedin.com/v2/me?projection='
   //const baseApi ='https://api.linkedin.com/v1/me?projection=(id,firstName,lastName)'
    const qs = { format: 'json' }
    const params = [
      'firstName',
      'lastName',
      'id',
      'profilePicture',
      'vanityName',
    ]

      const response = await fetch(`${baseApi}(${params.join(',')})`,{
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
    console.log(access_token);
    const payload = await response.json()
    console.log(payload);
    this.setState({ ...payload, refreshing: false })
    // this.props.store.authIt(true)
  }
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      // console.error('AsyncStorage error: ' + error.message);
    }
  }
  _onSuccess=(responseJson)=>{
    this.setState({loading:false,message:responseJson.message});
    if(responseJson.success && responseJson.details[0].otp_verified){
      this._first();
      this.setState({success:true,message:responseJson.message})
      this.props.userstore.enter(decodeURI(responseJson.details[0].fullname))
      this.props.userstore.enterjwt(responseJson.jwt);
      this.props.store.authIt(responseJson.success);
      this.props.userstore.enterpid(responseJson.details[0]._id)
      this.props.userstore.enterdp(responseJson.details[0].dp)
      this.props.userstore.entereaglemode(responseJson.details[0].eagle_mode)
      this.props.userstore.enterbio(responseJson.details[0].bio)
      responseJson.details[0].skill_set.map((items)=>{
      this.props.userstore.enterskills(decodeURI(items.skill_name),items.skill_rating);
    })
      responseJson.details[0].interests.map((items)=>
      {
        this.props.userstore.enterinterests(decodeURI(items.text))
      }
        )
      this.saveItem('id_token',responseJson.jwt);
      // console.log(this.props.userstore.skills);
  }
  else if(responseJson.message == 'otp was not verified'){
    this.setState({message:responseJson.message})
    this.props.userstore.enterphone(this.state.phone)
    this.props.navigation.navigate('OTP');
  }
  }
  _onSubmit= async () => {
     var details ={
        phone:encodeURI(this.state.phone),
        password:encodeURI(this.state.pass),
        forcePassword: "COMPANY_PERMITTED",
        expo_token: this.props.store.expotoken
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // return await fetch(this.props.userstore.login, {
    return await fetch(this.props.userstore.baseURL + 'auth/login', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>{console.log(responseJson);this._onSuccess(responseJson)})
          
          
  }
  _first = async () =>{
    AsyncStorage.getItem("alreadyLaunched").then(value => {
            if(value == null){
                console.log(value);
                 this.saveItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
                 this.props.store.firsttime(true);
            }
            else{
                 this.props.store.firsttime(false);
                 console.log(value)
            }})
  }
  nav(){
    this.props.navigation.navigate('Home')
  }
  heading=()=>{
    return(
        <View style={{flexDirection: 'row'}}>
        <Text style={{color: "#62c4ac", fontWeight: 'bold'}}>
          Login With{'  '}
        </Text>
        <Image 
        resizeMode='contain' 
        style={{height:20 , width:70}}
        source = {require('../../assets/linkedin.png')} />
      </View>
       
    )
  }
	render(){
    var name = this.state.phone
    const { authIt , user} = this.props.store;
		return(
      <ImageBackground source={require('../../assets/Background.png')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.loading}
          onRequestClose={() => {
            
          }}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:"rgba(0,0,0,0.2)"}}>
            <View style = {{}}>
              <ActivityIndicator size="large" color="#62c4ac" />
            </View>
          </View>
        </Modal>
        <Text  style = {{marginTop:hp('10%'),color:'#62c4ac',
    alignSelf:'center'}}>Resume right where you left off..</Text>
        <View style={styles.formContainer}>
            
            <Text style={{color:'#f94a4a'}}>{this.state.message}</Text>
            <TextInput 
            placeholder="Phone Number"
            keyboardType='numeric'
            placeholderTextColor='#62c4ac'
            onChangeText={(phone)=>{this.setState({phone})}}
            value={this.state.phone}
            onSubmitEditing={()=>{this.refPass.current.focus()}}
            style={styles.form}
            >
            </TextInput>
            <TextInput 
            ref={this.refPass}
            placeholder="Password"
            autoCapitalize='none'
            placeholderTextColor='#62c4ac'
            secureTextEntry={true}
            onChangeText={(pass)=>{this.setState({pass})}}
            value={this.state.pass}
            style={styles.form}
            >
            </TextInput>
            <View style={{
    justifyContent:'flex-end',
    alignItems:'center',marginTop:50}}>
            <LinkedInModal
              clientID="8162pukcmabpnx"
              clientSecret="fOMzlfFvfd9UD9zb"
              redirectUri="http://localhost:19002/signin-linkedin"
              onSuccess={data => this.getUser(data)}
              permissions={['r_basicprofile', 'r_emailaddress']}
           onClose={this.nav()}
          // linkText="Login With "
          renderButton={this.heading}
              />
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <Text style = {{marginBottom:20,color:'#62c4ac'  }}>Forgot your password? <Text style={{fontWeight:'bold',color:'#62c4ac'}}onPress={()=> this.props.navigation.navigate('ForgotPass')}>Click here !</Text></Text>
             {/*} <TouchableOpacity
              style={styles.button}
              onPress={(name)=>{this.setState({loading:true});this._onSubmit();this.props.store.user(name);}}
              >
                <Text textAlign='center' style={styles.text} > LINKEDIN </Text>
        </TouchableOpacity>
              <View style={styles.button}>*/}
              
              {/*</View>*/}
              <TouchableOpacity
              style={styles.button}
              onPress={(name)=>{this.setState({loading:true});this._onSubmit();this.props.store.user(name);}}
              >
                <Text textAlign='center' style={styles.text} > LOGIN </Text>
              </TouchableOpacity>
            </View>
          </View>
          </ImageBackground>
			);
	}
}
const styles = StyleSheet.create({
  linkedInContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
   container:{
     flex:1,
   },
   formContainer:{
  	flex:3,
    justifyContent:'center',
    alignItems:'center',
    
  },
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  form:{
  	backgroundColor:'white',
  	color:'#62c4ac',
  	marginBottom:20,
    margin:10,
    padding:10,
    width:wp('80%'),
    elevation: 5
  },
  button: {
  	alignItems:'flex-end',
    marginBottom: 30,
    backgroundColor: '#62c4ac',
    paddingLeft: 80,
    paddingRight:80,
    padding:10,

  },
  text:{
    alignItems:'center',
  	color:'white',
	},
})
// <View style={{flexDirection: 'row',}}>
//         <Text style={{color: "#62c4ac", fontWeight: 'bold',top: -hp('11.8%')}}>
//           Login With{'  '}
//         </Text>
//         <Image 
//         resizeMode='contain' 
//         style={{height:20 , width:70,top: -hp('12%')}}
//         source = {require('../../assets/linkedin.png')} />
//       </View>