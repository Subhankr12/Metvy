import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput, Image,ImageBackground, ActivityIndicator,Modal} from 'react-native';
import {observer , inject} from 'mobx-react/native';
import {ImagePicker} from 'expo';
import userstore from '../../userStore'
import store from '../../store'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('userstore','store')
@observer
export default class ProfileInfor extends Component{
  constructor(props){
    super(props);
    this.state={
      label:this.props.userstore.label,
      loading:false
    }
  }
  _onSubmit= async () => {
      var details ={
        title:encodeURI(this.state.label),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

  //  return await fetch(this.props.userstore.profile, {
    return await fetch(this.props.userstore.baseURL + 'profile/', {
              method: 'PATCH',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>{this._onSuccess(responseJson)})
          
  }
  _onSuccess=(responseJson)=>{
    this.setState({loading:false})
    if(responseJson.success){
      this.props.userstore.enterlabel(decodeURI(this.state.label));
      this.props.navigation.goBack()
  }
  else {
    this.setState({message:responseJson.message})
  }
  }
    render(){
      var label = this.state.label;
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
          <View style={styles.topContainer}>
            <Text style={styles.info}>{this.props.userstore.name}</Text>
          </View>
          <Text style={{color:'#f94a4a'}}>{this.state.message}</Text>
          <View style={styles.centerContainer}>
            <TextInput 
            placeholder="Job Title"
            onChangeText={(label)=>{this.setState({label})}}
            value={this.state.label}
            multiline
            placeholderTextColor='rgba(20,210,102,0.3)'
            style={styles.form}
           />
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.button}
              onPress={()=>{this.setState({loading:true});this._onSubmit()}}
              >
                <Text textAlign='center' style={styles.text}> SAVE CHANGES </Text>
              </TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
      )
    }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  topContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
  },
  centerContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   // marginBottom:100,
    height: hp('20%')
  },
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    
  },
  button: {
    alignItems:'center',
    marginBottom: 30,
    backgroundColor: '#62c4ac',
    paddingLeft: wp('20%'),
    paddingRight:wp('20%'),
    padding:wp('3%'),
  },
  info:{
    textAlign:'center',
    //margin:20,
    //marginTop:hp('30%'),
    //marginRight:wp('40%'),
    top: hp('35%'),
    fontSize:hp('3%'),
    color:'#62c4ac'
  },
  form:{
    backgroundColor:'white',
    color:'green',
    marginBottom:20,
    margin:10,
    padding:10,
    width:wp('80%'),
    elevation: 5
  },
  text:{
    alignItems:'center',
  	color:'white',
	},
})