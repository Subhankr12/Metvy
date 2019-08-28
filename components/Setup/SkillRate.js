import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput, Image,ScrollView,ImageBackground,TouchableHighlight,KeyboardAvoidingView} from 'react-native';
import{inject,observer} from 'mobx-react/native'
import Star from './Star'
import {Constants} from 'expo'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('userstore')
@observer
export default class SkillRate extends Component{
  constructor(props){
    super(props);
    this.state={
      skills:this.props.userstore.skills,
      text:''
    }
  }
  _onSubmitSkills= ()=>{
    Object.keys(this.props.userstore.skills).map((key)=>{
      this._onSubmit(key);
      // console.log(key)
    })
    if(this.props.navigation.getParam('nav') == 'EditProfile'){
      this.props.navigation.navigate('MainProfile')
      this.setState({text:'FINISH'})
    }
    else{
      this.props.navigation.navigate('Interests')
      this.setState({text:'NEXT'})
    }
  }
  _onSubmit= async (key) => {
      var details ={
        skill:encodeURI(key),
        rating:encodeURI(this.props.userstore.skills[key])
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // return await fetch(this.props.userstore.skill, {
    return await fetch(this.props.userstore.baseURL + 'profile/skill', {
              method: 'POST',
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
    if(responseJson.success){
      // console.log(responseJson)
  }
  }

  render(){
    return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
      <View style={{flex:1,paddingTop:Constants.statusBarHeight}}>
        <View style={styles.input}>
        <TextInput editable={false} placeholder ="Add a skill" type = 'text' style={styles.textinput} />
        </View>
        <ScrollView>
          {
            Object.keys(this.props.userstore.skills).map((key)=>{
              return(
                <View key={key} style={styles.skills}>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Rate',{skill:key,index:this.props.userstore.skills[key]})}}>
                <Text style={{textAlign:'center',fontSize:30,color:'#62c4ac'}}>{key}</Text>            
                </TouchableOpacity>
                </View>
                <View style={{flex:0.3}}>
                <Star style={{alignItems:'center',justifyContent:'center'}} rate={this.props.userstore.skills[key]} />
                </View>
                </View>
              )
            })
          }
        </ScrollView>
        <TouchableOpacity style={{alignItems:'center',
          marginBottom: hp('5%'),
          backgroundColor: '#62c4ac',
          paddingLeft: 80,
          paddingRight:80,
          padding:10,
          margin:30
        }} 
          onPress={()=>{this._onSubmitSkills()}}>
          <Text style={{justifyContent:'center',alignItems:"center",textAlign:'center',color:'white'}}>
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  suggestions:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  input:{
    flex:0.5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
  },
  textinput:{
    backgroundColor:'white',
      color:'#62c4ac',
      margin:10,
      padding:10,
      width:300,
      elevation:5
  },
  chipseven:{
    padding:10,
    paddingRight:15,
    paddingLeft:15,
    margin:10,
    backgroundColor:'#CACCCE'
  },
  chipsodd:{
    padding:10,
    paddingRight:15,
    paddingLeft:15,
    margin:10,
    backgroundColor:'#86888A'
  },
  skills:{
    //backgroundColor:'red',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  skilltext:{
    marginTop:3,
    fontSize:30,
    color:'#62c4ac'
  }
})