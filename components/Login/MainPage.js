import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput ,Image,ImageBackground} from 'react-native';
import {observer , inject} from 'mobx-react/native'
import {usernameChange} from '../../store' 
import store from '../../store'
import userstore from '../../userStore'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('store','userstore')
@observer
export default class MainPage extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return(
      <ImageBackground source={require('../../assets/BackgroundFront.png')} style={{height:'100%',width:'100%'}}>
      <View style={styles.aniContainer}>
            <View style={styles.ani}>
              <Image resizeMode='contain' style={{top:'8%',height:hp('100%'),width:wp('100%')}} source={require('../../assets/metvyscreen.png')} />
            </View>
            </View>
      <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.buttonTrans}
              onPress={()=>{this.props.navigation.navigate('InviteCode')}}
              >
                <Text textAlign='center' style={styles.textTrans} > JOIN </Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.button}
              onPress={()=>{this.props.navigation.navigate('Login');}}
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
  container:{
     flex:1,
   },
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  button: {
    alignItems:'flex-end',
    marginBottom: 50,
    backgroundColor: '#62c4ac',
    paddingLeft: wp('30%'),
    paddingRight: wp('30%'),
    padding:wp('3.0%'),
  },
  aniContainer:{
    flex:1,
    backgroundColor:'black',
    flexDirection:'row'
  },
  ani:{
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  wave: {
        width:550,
        height:550,
        aspectRatio: 1,
        overflow: 'hidden',
    },
  text:{
    alignItems:'center',
    color:'white',
  },
  textTrans:{
    alignItems:'center',
    color:'#62c4ac',
  },
  buttonTrans:{
    borderWidth: 1.5,
    alignItems:'flex-end',
    marginBottom: 60,
    borderColor: '#62c4ac',
    paddingLeft: wp('30%'),
    paddingRight: wp('30%'),
    padding:wp('2.5%'),
  },
   aniContainer:{
    flex:1.3,
    backgroundColor:'black',
    flexDirection:'row'
  },
  ani:{
    justifyContent:'center',
    alignItems:'center'
  },
})