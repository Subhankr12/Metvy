import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput, Image,ImageBackground,ActivityIndicator,Modal} from 'react-native';
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
export default class Setup extends Component{
  constructor(props){
    super(props);
    this.state={
      bio:this.props.userstore.bio,
      image:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      analyze:[],
      loading:true,
    }
  }
  _onSubmit= async () => {
      var details ={
        bio:this.state.bio,
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // return await fetch(this.props.userstore.bios, {
    return await fetch(this.props.userstore.baseURL + 'profile/bio', {
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
      this.setState({analyze:responseJson.key.split(',')})
      this.props.userstore.enterbio(this.state.bio);
  }
  else {
    this.setState({message:responseJson.message})
  }
  }
  componentWillMount= async()=>{
   // let profile = await fetch(this.props.userstore.profile,{
    let profile = await fetch(this.props.userstore.baseURL + 'profile/',{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=>  responseJson)
    this.setState({bio:decodeURI(profile.bio),image:profile.dp,loading:false})
  }
    render(){
      var bio = this.state.bio;
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
            <TouchableOpacity
              onPress={this.onChooseImagePress}
            >
                <Image
                  style={styles.profile}
                  source={{uri:this.state.image}}
                />
            </TouchableOpacity>
            <Text style={styles.info}>{this.props.userstore.name}{'\n'}Delhi</Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={{color:'grey',marginBottom:hp('1%')}}>Go ahead and tell us about what you're looking for </Text>
            <TextInput 
            placeholder="Requirement"
            onChangeText={(bio)=>{this.setState({bio})}}
            value={this.state.bio}
            maxLength = {180}
            placeholderTextColor='rgba(20,210,102,0.3)'
            style={styles.form}
            onSubmitEditing={()=>{this.setState({loading:true});this._onSubmit()}}
           />
           <Text style={{marginTop:hp('2%'),color:'#62c4ac',fontSize:20}}>ANALYZE</Text>
           <View style={styles.suggestions}>
           {
            this.state.analyze.map((items,i)=>{
              return(
                <View key={i}>
             { i%2 == 0?
              <TouchableOpacity style={styles.chipseven}>
                <Text style={{textAlign:'center',color:'#c4c6c6'}}>{items}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.chipsodd}>
                <Text style={{textAlign:'center',color:'#a9abab'}}>{items}</Text>
              </TouchableOpacity>}
              </View>
                )
            })
           }
           </View>
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.button}
              onPress={()=>{this.props.navigation.navigate('splash')}}
              >
                <Text textAlign='center' style={styles.text}> NEXT </Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={{margin:20}}
              onPress={()=>{this.props.navigation.navigate('Home')}}
              >
                <Text textAlign='center' style={{color:'grey'}}> SKIP </Text>
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
    margin:20,
  },
  centerContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    //top:hp('48%'),
    //marginBottom:100
  },
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    
  },
  button: {
  	alignItems:'center',
    //marginBottom: 30,
    backgroundColor: '#62c4ac',
    //paddingLeft: 80,
    //paddingRight:80,
    //marginLeft: wp('15%'),
    width: wp('60%'),
    height: hp('7%'),
    padding:10,
  },
  profile:{
    justifyContent:'flex-start',
    borderRadius:50,
    width:100,
    height:100,
    //margin:20,
    marginTop:hp('15%'),
    marginBottom: hp('2%'),
    //left:wp('5%'),
    //marginLeft:20,
  },
  info:{
    //justifyContent:'flex-end',
    //alignItems:'center',
    //margin:20,
    top:hp('18%'),
    //marginRight:20,
    fontSize:20,
    marginLeft: wp('5%'),
    color:'#62c4ac'
  },
  form:{
  	backgroundColor:'white',
  	color:'#62c4ac',
  //	marginBottom:20,
  //  margin:10,
    padding:12,
    width:wp('80%'),
    height: hp('7%'),
    elevation: 5
  },
  text:{
    alignItems:'center',
  	color:'white',
	},
  chipseven:{
    padding:10,
    paddingRight:15,
    paddingLeft:15,
    margin:10,
    backgroundColor:'#eff3f3'
  },
  chipsodd:{
    padding:10,
    paddingRight:15,
    paddingLeft:15,
    margin:10,
    backgroundColor:'#e6eae9'
  },
  suggestions:{
    flex:0.5,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    marginTop:20
  },
})