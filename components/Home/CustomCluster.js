import React, {Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native'

export default class MyCluster extends Component{
	constructor(props){
		super(props);
	}
  render(){
  	const { count } = this.props;
return (
    <View style={styles.cluster}>
      <Text style={{color:'#62c4ac'}}>{count}</Text>
    </View>
  )

  }
}
 
const styles = StyleSheet.create({
  cluster:{
  	width: 80,
  height: 80,
  borderRadius: 80,
  borderWidth:5,
  borderColor:'#62c4ac',
  backgroundColor: 'rgba(98, 196, 172,0.2)',
  justifyContent: 'center',
  alignItems: 'center'
  }
})