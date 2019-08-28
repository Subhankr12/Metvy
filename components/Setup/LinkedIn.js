import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput,ImageBackground,Image,ActivityIndicator,Modal} from 'react-native';
import {observer , inject} from 'mobx-react/native'
import{Constants} from 'expo'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('userstore')
@observer
export default class LinkedIn extends Component{
	constructor(props){
		super(props);
		this.state={
			linkedin:'',
      loading:false
		}
	}
  _onSuccess=(responseJson)=>{
    // console.log(responseJson)
    this.setState({loading:false});
    if(responseJson.success){
      this.props.userstore.enterlinkedin(this.state.linkedin)
  }
  this.props.navigation.navigate('Setup')
  }
  _onSubmit= async () => {
     var details ={
        linkedIn:encodeURI(this.state.linkedin),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // return await fetch(this.props.userstore.setLinkedIn,{
    return await fetch(this.props.userstore.baseURL + 'profile/setLinkedIn',{
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token":this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>this._onSuccess(responseJson))
          
          
  }
	render(){
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
        <View style={styles.formContainer}>
         <Text  style = {{fontSize:40,marginTop:20,marginBottom:20,paddingTop:Constants.statusBarHeight,color:'#62c4ac'}}>Customization!</Text>
         <Image 
        resizeMode='contain' 
        style={{height:150 , width:150}}
        source = {require('../../assets/linkedin.png')} />
        <Text  style = {{marginTop:-10,marginBottom:10,textAlign:'center',color:'grey'}}>Help us get to help you more{'\n'} by connecting your LinkedIn account .{'\n\n'}<Text style={{fontStyle:'italic'}}>If not click next</Text></Text>
            <Text  style = {{marginTop:20,marginBottom:10,textAlign:'center',color:'#62c4ac'}}>Enter your LinkedIn URL</Text>
            <TextInput 
            placeholder="LinkedIn"
            placeholderTextColor='#62c4ac'
            onChangeText={(linkedin)=>{this.setState({linkedin})}}
            value={this.state.linkedin}
            style={styles.form}
            >
            </TextInput>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              onPress={()=>{this.setState({loading:true});this._onSubmit();}}
              style={styles.button}
              >
                <Text textAlign='center' style={styles.text}> NEXT </Text>
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
   formContainer:{
  	flex:3,
    justifyContent:'center',
    alignItems:'center',
    
  },
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    
  },
  form:{
  	backgroundColor:'white',
  	color:'#62c4ac',
  	marginBottom:20,
    margin:10,
    padding:10,
    width:300,
    elevation: 5
  },
  button: {
  	alignItems:'flex-end',
    marginBottom: 30,
    backgroundColor: '#62c4ac',
    paddingLeft: 80,
    paddingRight:80,
    padding:10,
  },
  text:{
    alignItems:'center',
  	color:'white',
	},
})