import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput, Image,ImageBackground} from 'react-native';
import {Constants} from 'expo';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
export default class splash extends Component{
  componentWillMount(){
    setTimeout(() => {
    this.props.navigation.navigate('SkillSelector'); //this.props.navigation.navigate('Login')
}, 5000); 
  }
    render(){
      return(
        <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
        <View style={styles.container}>
          <Text style={{marginTop:hp('5%'),paddingTop:Constants.statusBarHeight,color:'grey',fontSize: hp('2.5%')}}>Tell Us About What You're Good At</Text>
          <View style={styles.midContainer}>
          <Text style={styles.textEven}>Startups</Text>
          <Text style={styles.textOdd}>Digital Marketing</Text>
          <Text style={styles.textEven}>Advertising</Text>
          <Text style={styles.textOdd}>Entrepreneurship</Text>
          </View>
          <Image
          resizeMode='contain'
          style={{height:200,width:200,top: hp('7%')}}
          //source = {require('../../assets/stopwatch.png')}/>
          source={require('../../assets/Is-my-flight-on-time.gif')}/>
        </View>
        </ImageBackground>
      )
    }
}
const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  midContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    top: hp('9%')
  },
  textEven:{
    fontSize:hp('5%'),
    color:'grey',
    
  },
  textOdd:{
    //fontSize:35,
    fontSize:hp('5%'),
    color:'#A9A9A9',
    
  }
})