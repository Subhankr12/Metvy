import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput,ImageBackground,Modal,ActivityIndicator} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input'
import TimerCountdown from 'react-native-timer-countdown'
import {observer,inject} from 'mobx-react/native'
import store from '../../store'
import{Constants,Amplitude} from 'expo'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('store','userstore')
@observer
export default class OTP extends Component{
	constructor(props){
		super(props);
		this.state={
			phone:this.props.userstore.phone,
      isExpire:true,
      milliseconds:60,
      verified:false,
      message:'',
      countDown:false,
      loading:false,
		}
	}

  _sendOtp=async()=>{
    // console.log('called')
    var details ={
        phone:encodeURI(this.props.userstore.phone),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

    //return await fetch(this.props.userstore.sendotp, {
      return await fetch(this.props.userstore.baseURL + 'auth/sendotp', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formBody
            }).then(response=>response.json())
            .then(responseJson=>(responseJson))
  }
  // componentDidMount(){
  //   this._sendOtp();
  // }
  componentWillMount(){
    // console.log(this.props.userstore.name)
  }
  _resendOtp= async ()=>{
    var details ={
        phone:encodeURI(this.state.phone),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // return await fetch(this.props.userstore.resendotp, {
    return await fetch(this.props.userstore.baseURL + 'auth/resendotp', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>{this._onSuccess(responseJson)})
  }
   _onSuccess=(responseJson)=>{
    this.setState({loading:false})
    // console.log(responseJson);
    if(responseJson.message === "max_retry_count_exceeded"){
      this.setState({message:"No more OTP tries left"})
  }
  else if(responseJson.message === "invalid_mobile_number"){
    this.setState({message:"Invalid Mobile Number"})
  }
  }
  _verify=(responseJson)=>{
    this.setState({loading:false})
    // console.log(responseJson.success)
    if(responseJson.success){
      Amplitude.logEvent('User Registered');
      this.props.navigation.navigate('Login');
  }
  else{
    this.setState({message:"Incorrect OTP"})
  }
  }
  _verifyOtp= async (code)=>{
    var details ={
        phone:encodeURI(this.props.userstore.phone),
        otp:encodeURI(code),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

  //  return await fetch(this.props.userstore.verifyotp, {
    return await fetch(this.props.userstore.baseURL + 'auth/verifyotp', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>{this._verify(responseJson)})
  }
  render(){
    const { authIt } = this.props.store
		return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
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
        <View style={styles.formContainer}>
            <Text  style = {{fontSize:60,marginTop:40,marginBottom:100,paddingTop:Constants.statusBarHeight,color:'#62c4ac'}}>Wait For It</Text>
            <Text textAlign='center' style={{fontSize:20, padding:5, lineHeight:30, textAlign:"center",color:'grey'}}>You'll receive an OTP on {'\n'}<Text style={{color:'#62c4ac'}}> +91 {this.props.userstore.phone}</Text> 
            {'\n'} We'll handle the rest
            </Text>
              <CodeInput
              className = {"border-b"}
              activeColor='rgba(98,196,172,0.5)'
              inactiveColor= 'rgb(98,196,172)'
              codeLength={4}
              onFulfill={(code)=>{this.setState({loading:true});this._verifyOtp(code)}}
              >
              </CodeInput>
              <Text style={{margin:10,color:'#f94a4a'}}>{this.state.message}</Text>
              { this.state.countDown?
                <TimerCountdown
                              initialMilliseconds={1000 * this.state.milliseconds}
                              onExpire={() => {this.setState({
                                  isExpire:true,
                                  milliseconds:0
                              })}}
                              formatMilliseconds={(milliseconds) => {
                                const remainingSec = Math.round(milliseconds / 1000);
                                const seconds = parseInt((remainingSec % 60).toString(), 10);
                                const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
                                const hours = parseInt((remainingSec / 3600).toString(), 10);
                                const s = seconds < 10 ? '0' + seconds : seconds;
                                const m = minutes < 10 ? '0' + minutes : minutes;
                                let h = hours < 10 ? '0' + hours : hours;
                                h = h === '00' ? '' : h + ':';
                                return h + m + ':' + s;
                              }}
                              allowFontScaling={true}
                              style={{ fontSize: 15, marginBottom:70,color:'grey' }} />
                              :
                              <View></View>
              }
              {
                this.state.isExpire ? (
                <Text onPress={()=>{
                this.setState((prevState)=>({
                  milliseconds:60,
                  isExpire:false,
                  count:prevState.count+1,
                  countDown:true
                }))  
                this._resendOtp();
                }}
                style={{color:'#62c4ac'}}
>Send OTP again</Text>
              ) : <Text></Text>}
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.button}
              onPress={()=>{}}
              >
                <Text textAlign='center' style={styles.text}> NEXT </Text>
              </TouchableOpacity>
            </View>
          </View>
          </ImageBackground>
			);
	}
}
const styles = StyleSheet.create({
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