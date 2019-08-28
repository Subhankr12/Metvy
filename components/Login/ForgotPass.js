import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput,ImageBackground,Modal,ActivityIndicator} from 'react-native';
import {observer , inject} from 'mobx-react/native'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('store')
@observer
export default class ForgotPass extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      message:'',
      loading:false
    }
  }
  _onSubmit= async () => {
      var details ={
        email:encodeURI(this.state.email),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // return await fetch(this.props.userstore.forgotpassword, {
    return await fetch(this.props.userstore.baseURL + 'auth/forgotpassword', {
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
    this.setState({loading:false});
    if(responseJson.success){
      this.setState({message:"Email for new password has been sent"})
  }
  else {
    this.setState({message:responseJson.message})
  }
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
            <Text  style = {{marginTop:hp('20%'),textAlign:'center',color:'grey'}}>{`Enter you email address. \nWe will send you a temporary pass`}</Text>
            <Text style={{color:'#f94a4a'}}>{this.state.message}</Text>
            <TextInput 
            ref={this.refPass}
            placeholder="Email"
            placeholderTextColor='#62c4ac'
            onChangeText={(email)=>{this.setState({email})}}
            value={this.state.email}
            style={styles.form}
            >
            </TextInput>
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
    width:wp('80%'),
    elevation: 5
  },
  button: {
    alignItems:'flex-end',
    marginBottom: 30,
    backgroundColor: '#62c4ac',
    paddingLeft: wp('30%'),
    paddingRight:wp('30%'),
    padding:wp('3%'),
  },
  text:{
    alignItems:'center',
    color:'white',
  },
})