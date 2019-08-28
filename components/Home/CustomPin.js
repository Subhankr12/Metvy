import React, {Component} from 'react';
import {View,ImageBackground,Image,StyleSheet,TouchableOpacity} from 'react-native';

export default class CustomPin extends Component{
	render(){
		return(
			<ImageBackground resizeMode ="contain" style={{flex:1,width:70,height:70}} source={require('../../assets/pin.png')}>
				<Image
					style={{marginLeft:12.5 ,marginTop:4.5,width:45,height:45,borderRadius:23}}
					source ={{uri:this.props.image}}
				/>
			</ImageBackground>
		)
	}
}