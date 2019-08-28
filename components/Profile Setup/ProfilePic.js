import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput, Image,ScrollView,ImageBackground} from 'react-native';
import {observer , inject} from 'mobx-react/native';
import ProgressCircle from 'react-native-progress-circle'
import {ImagePicker, Constants,Permissions,ImageManipulator} from 'expo';
import userstore from '../../userStore'
import store from '../../store'
import {HeaderBackButton} from 'react-navigation'
import {Entypo,Ionicons} from '@expo/vector-icons'
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import ImgToBase64 from 'react-native-image-base64';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
 
@inject('userstore')

export default class ProfilePic extends Component{
    constructor(props){
      super(props);

      this.state = {
        image :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      }
    }

   onChooseRemove = async () =>{
      var details ={
        dp:encodeURI('https://i.imgur.com/zdWWWKQ.jpg'),
      }
      this.props.userstore.enterdp('https://i.imgur.com/zdWWWKQ.jpg');
      this.setState({image:'https://i.imgur.com/zdWWWKQ.jpg'})
      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
     // await fetch(this.props.userstore.Dp,{
      await fetch(this.props.userstore.baseURL + 'profile/dp',{
        method:'PATCH',
        headers:{
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': this.props.userstore.jwt
        },
        body:formBody
      }).then(response => response.json())
      .then(responseJson =>responseJson)
    }

  onTakeImagePress = async () =>{
    let { status } = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
    if(status==='granted'){
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if(!result.cancelled){
      this.setState({
        image : result.uri
      })
      var finalResult = await ImageManipulator.manipulateAsync(result.uri, [], {compress:0.5,base64:true})
      // console.log(finalResult.base64)
      base64Url = 'data:image/jpeg;base64,'+finalResult.base64;
      const formData = new FormData();
      formData.append('image', finalResult.base64);
      var link =await fetch('https://api.imgur.com/3/image',{
        method:'POST',
        headers:{
          'Authorization':'Client-ID 1db8f765006ca9d'
        },
        body: formData
      }).then(response=>response.json())
      .then(responseJson=>responseJson)
      this.props.userstore.enterdp(link.data.link);
      this.setState({image:link.data.link})
      var details ={
        dp:encodeURI(this.link),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
     // await fetch(this.props.userstore.Dp,{
      await fetch(cc,{
        method:'PATCH',
        headers:{
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': this.props.userstore.jwt
        },
        body:formBody
      }).then(response => response.json())
      .then(responseJson =>(responseJson))
    }
    }
    else{
      alert('dont have permission')
    }
    }
  onChooseImagePress = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if(!result.cancelled){
      this.setState({
        image : result.uri
      })
      var finalResult = await ImageManipulator.manipulateAsync(result.uri, [], {compress:0.5,base64:true})
      // console.log(finalResult.base64)
      base64Url = 'data:image/jpeg;base64,'+finalResult.base64;
      const formData = new FormData();
      formData.append('image', finalResult.base64);
      var link =await fetch('https://api.imgur.com/3/image',{
        method:'POST',
        headers:{
          'Authorization':'Client-ID 1db8f765006ca9d'
        },
        body: formData
      }).then(response=>response.json())
      .then(responseJson=>responseJson)
      this.props.userstore.enterdp(link.data.link);
      this.setState({image:link.data.link})
      var details ={
        dp:encodeURI(link.data.link),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //await fetch(this.props.userstore.Dp,{
        await fetch(this.props.userstore.baseURL + 'profile/dp',{
        method:'PATCH',
        headers:{
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': this.props.userstore.jwt
        },
        body:formBody
      }).then(response => response.json())
      .then(responseJson =>(responseJson))
    }
    
    }
  render(){
    return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
        <Image
                  style={styles.profile}
                  source={{uri:this.props.userstore.dp}}
                />
        </View>
        <View style={styles.midContainer}>
          <TouchableOpacity
          onPress = {this.onChooseRemove}
          >
            <Text style={styles.text}>REMOVE PICTURE</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress = {this.onTakeImagePress}
          >
            <Text style={styles.text}>TAKE A NEW PICTURE</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress = {this.onChooseImagePress}
          >
            <Text style={styles.text}>ADD A PICTURE FROM GALLERY</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={()=>{this.props.navigation.goBack()}}
              >
                <Text textAlign='center' style={styles.textB} > SAVE CHANGES </Text>
              </TouchableOpacity>
              </View>
        </View>
      </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
  },
  topContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  profile:{
    justifyContent:'center',
    borderRadius:65,
    borderWidth:5,
    borderColor:'#62c4ac',
    width:130,
    height:130,
  },
  midContainer:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  text:{
    textAlign:'center',
    margin:wp('5%'),
    //fontSize:20,
    fontSize: hp('2.7%'),
    color:'#62c4ac'
  },
  textB:{
    textAlign:'center',
    alignItems:'center',
    color:'white',
    //fontSize:15
    fontSize: hp('2%'),
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
})