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
export default class NewPass extends Component{
  constructor(props){
    super(props);
    this.state={
      pass:''
    }
  }
  render(){
    return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
         <Text  style = {{fontSize:40,marginTop:40,marginBottom:100,paddingTop:Constants.statusBarHeight,color:'#62c4ac'}}>There you go!</Text>
            <Text  style = {{marginTop:40,marginBottom:10,textAlign:'center',color:'grey'}}>Make sure your new password is{'\n'} different than your old one</Text>
            <Text  style = {{marginBottom:10,textAlign:'center',color:'#62c4ac' }}>Enter new password here</Text>
            <TextInput 
            ref={this.refPass}
            placeholderTextColor='#62c4ac'
            secureTextEntry={true}
            onChangeText={(pass)=>{this.setState({pass})}}
            value={this.state.pass}
            style={styles.form}
            >
            </TextInput>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              onPress={()=>{this.props.navigation.navigate('Login')}}
              style={styles.button}
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