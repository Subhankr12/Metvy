import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput, Image,ScrollView,ImageBackground,TouchableHighlight,KeyboardAvoidingView} from 'react-native';
import{inject,observer} from 'mobx-react/native'
import Slider from 'react-native-slider'
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
      value:0,
    }
  }
 
  render(){
    return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
      <View style={{flex:1,padding:Constants.statusBarHeight}}>
        <View style={styles.input}>
        <TextInput editable={false} placeholder ="Add a skill" type = 'text' style={styles.textinput} />
        </View>
        <View style={{flex:1}} >
            <View style={styles.skills}>
                  <Text style={styles.skilltext}>
                    {this.props.navigation.getParam('skill')}
                  </Text>
            </View>
            <View style={{flex:0.5,flexDirection:'row',justifyContent:'space-evenly',top: hp('9%')}}>
            <Text style={{fontSize:20,color:'rgba(0,128,0,0.4)'}}>0</Text>
            <Text style={{fontSize:20,color:'rgba(0,128,0,0.4)'}}>1</Text>
            <Text style={{fontSize:20,color:'rgba(0,128,0,0.4)'}}>2</Text>
            <Text style={{fontSize:20,color:'rgba(0,128,0,0.4)'}}>3</Text>
            <Text style={{fontSize:20,color:'rgba(0,128,0,0.4)'}}>4</Text>
            <Text style={{fontSize:20,color:'rgba(0,128,0,0.4)'}}>5</Text>
            </View>
            <Slider
            style={{margin:30,top: hp('2.0%')}}
            minimumTrackTintColor="#59b29c"
            maximumTrackTintColor="#e5e5e5"
            thumbTintColor="#e5e5e5"
            minimumValue={0}
            maximumValue={5}
            step={0.1}
          value={this.state.value}
          onValueChange={(value) => this.setState({value})} />
        <Text style={styles.value}>{(this.state.value).toString().slice(0,3)}</Text>
        </View>
        <TouchableOpacity
          style={{alignItems:'center',
          marginBottom: 30,
          backgroundColor: '#62c4ac',
          paddingLeft: 80,
          paddingRight:80,
          padding:10,
          margin:30
        }} 
         onPress={()=>{this.props.userstore.enterskills(this.props.navigation.getParam('skill'),(this.state.value).toString().slice(0,3));this.props.navigation.goBack(null)}}>
        <Text style={{justifyContent:'center',alignItems:"center",textAlign:'center',color:'white'}}>NEXT</Text>
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
      color:'green',
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
    flexDirection:'row',
    justifyContent:'center',
    bottom:hp('5%'),
    //marginTop:
  },
  skilltext:{
    fontSize:30,
    color:'#62c4ac',
    textAlign:'center'
  },
  value:{
    textAlign:'center',
    fontSize:40,
    
    color:'#59b29c'
  }
})