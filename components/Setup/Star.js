import React, {Component} from 'react';
import {View,Text,ImageBackground,StyleSheet} from 'react-native';

export default class Star extends Component{
	render(){
		return(
			<ImageBackground
			style = {{height:40,width:40}}
			source ={require('../../assets/star.png')}
			>
			<Text style={{top:'30%',color:'white',textAlign:'center',justifyContent:'center',alignItems:'center'}}>{this.props.rate}</Text>
			</ImageBackground>
			)
	}
}