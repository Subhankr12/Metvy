import React,{Component} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapView, Permissions, Location,Constants } from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {observer,inject} from 'mobx-react/native'

@inject('userstore')
@observer
export default class HeaderNav extends Component{
  render(){
    return(
      <View style = {styles.header}>

        <Ionicons name="md-menu" size={32} color="green" style={{padding:10}} />
        <Text style={{flex:1,textAlign:'center',justifyContent:'center',alignItems:'center',marginTop:20}}>Metvy</Text>
        <TouchableOpacity
        onPress={()=>{this.props.navigation.navigate('MainProfile')}}
        title="Info"
        color="black"
      >
      <Image
                  style={styles.img}
                  source={{uri:this.props.userstore.image}}
                />
      </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header:{
    flex:0.1,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    padding:20,
    paddingTop:Constants.statusBarHeight,
  },
  img:{
     borderRadius:80,
    width:30,
    height:30,
    margin:10,
    marginTop:10,
  }
})