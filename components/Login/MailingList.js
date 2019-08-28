
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput,ImageBackground} from 'react-native';
import {observer , inject} from 'mobx-react/native'
import{Constants} from 'expo'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('store')
@observer
export default class MailingList extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      phone:'',
    }
    this.refname = React.createRef();
    this.refemail = React.createRef();
    this.refphone = React.createRef();
  }
  _onSubmit= async () => {
      var details ={
        fullname: encodeURI(this.state.name),
        email:encodeURI(this.state.email),
        phone:encodeURI(this.state.phone),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

  //  return await fetch(this.props.userstore.waitlist, {
    return await fetch(this.props.userstore.baseURL + 'auth/waitlist', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>responseJson)
          
  }
  render(){
    return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <Text  style = {{fontSize:60,marginTop:40,marginBottom:70,paddingTop:Constants.statusBarHeight,color:'#62c4ac'}}>Oops!</Text>
            <Text  style = {{marginBottom:10,textAlign:'center',color:'grey'}}>We are currently functioning as a closed{'\n'} platform and would soon roll out a{'\n'} completely public version.Stay Tuned!</Text>
            <Text  style = {{marginBottom:20,textAlign:'center',color:'grey'}}>You can join out mailing list for the mean{'\n'} time to get updated about us</Text>
            <TextInput 
            ref={this.refname}
            placeholderTextColor='#62c4ac'
            placeholder="Name"
            onChangeText={(name)=>{this.setState({name})}}
            value={this.state.name}
            style={styles.form}
            onSubmitEditing={()=>{this.refphone.current.focus()}}
            />
            <TextInput 
            ref={this.refphone}
            placeholderTextColor='#62c4ac'
            placeholder="Phone"
            keyboardType="numeric"
            onChangeText={(phone)=>{this.setState({phone})}}
            value={this.state.phone}
            style={styles.form}
            onSubmitEditing={()=>{this.refemail.current.focus()}}
            />
            <TextInput 
            ref={this.refemail}
            placeholderTextColor='#62c4ac'
            placeholder="Email"
            onChangeText={(email)=>{this.setState({email})}}
            value={this.state.email}
            style={styles.form}
            >
            </TextInput>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.button}
              onPress={()=>{this._onSubmit();this.props.navigation.navigate('MainPage')}}
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