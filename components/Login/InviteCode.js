import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput,ImageBackground,Modal,ActivityIndicator} from 'react-native';
import {observer , inject} from 'mobx-react/native'
import{Constants} from 'expo'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('store')
@observer
export default class InviteCode extends Component{
  constructor(props){
    super(props);
    this.state={
      invite:'',
      success:false,
      loading:false,
      message:''
    }
  }
  _onSuccess=(responseJson)=>{
    this.setState({loading:false});
    if(responseJson.success){
      // console.log(responseJson.success)
      this.props.navigation.navigate('Register')
    }
    else{
      this.setState({message : responseJson.message})
    }
  }
  _onSubmit= async () =>{
    var url = 'http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/auth/invitecode/'
    var invite = this.state.invite
    var resultUrl = url + invite
    // console.log(resultUrl)
    return await fetch(resultUrl).then((response) => response.json()).then((responseJson)=>{console.log(responseJson);this._onSuccess(responseJson)})
  }
  render(){
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
        <Text  style = {{fontSize:hp('8%'),marginTop:55,marginBottom:100,paddingTop:Constants.statusBarHeight,color:'#62c4ac'}}>Woohoo!</Text>
            <Text  style = {{marginBottom:10,textAlign:'center',color:'grey'}}>Congratulations on being a part of us {'\n'} We are excited to have you on board </Text>
            <Text  style = {{marginBottom:20,textAlign:'center',color:'grey'}}>You're just one step away from having{'\n'} the superpower of<Text style={{fontWeight:'bold',color:'#62c4ac'}}> easy networking</Text> </Text>
            <Text  style = {{marginTop:20,marginBottom:10,textAlign:'center',color:'#62c4ac'}}>Enter your invite code here</Text>
            <Text style={{color:'#f94a4a'}}>{this.state.message}</Text>
            <TextInput 
            ref={this.refPass}
            placeholderTextColor='#62c4ac'
            placeholder="Invite Code"
            onChangeText={(invite)=>{this.setState({invite})}}
            autoCapitalize='none'
            value={this.state.invite}
            style={styles.form}
            >
            </TextInput>
            <Text onPress={()=>{this.props.navigation.navigate('MailingList')}}  style = {{marginTop:40,marginBottom:100,textAlign:'center',color:'#62c4ac',fontWeight:'bold'}}>What's an invite code?I Don't have it</Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.button}
              onPress={()=>{this.setState({loading:true});this._onSubmit()}}
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
  form:{
    backgroundColor:'white',
    color:'#62c4ac',
    marginBottom:20,
    margin:10,
    padding:10,
    width:300,
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