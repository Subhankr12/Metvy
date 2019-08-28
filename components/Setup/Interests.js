import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput, Image,ScrollView,ImageBackground,TouchableHighlight,KeyboardAvoidingView, FlatList} from 'react-native';
import{inject,observer} from 'mobx-react/native'
import escapeStringRegexp from 'escape-string-regexp'
import {Constants} from 'expo'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
@inject('userstore')
@observer
class Interests extends Component{
  constructor(props){
    super(props);
    this.state={
      value:'',
      interests:[],
      index: 0,
    }
  }
  //onTextChanged(e,index){
  //let newArray = this.state.interests;
  //newArray[index++] = e;
  //this.setState({ /*suggestions: newArray*/ value:e ,index: index});
 // this.props.userstore.enterinterests(index,this.state.value);
  //}
  _getInterests=async ()=>{
    let profile = await fetch('http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile',{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> responseJson)

    this.setState({length : profile.interests.length})
  }
  _onSubmitInterests= ()=>{
    this.state.interests.map((items,i)=>{
      console.log(items);
      this._onSubmit(items);
    })

    if(this.props.navigation.getParam('nav') == 'EditProfile'){
      this.props.navigation.navigate('MainProfile');
    }
    else
    this.props.navigation.navigate('Home',{nav:'setup'})
  }
  _onSubmit= async (key) => {
      var details ={
        interest:encodeURI(key)
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

    //return await fetch(this.props.userstore.interest, {
      return await fetch(this.props.userstore.baseURL + 'profile/interests', {
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
  _onDeleteInterest= async (id) => {
     var details ={
        _id:encodeURI(id),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // return await fetch(this.props.userstore.interest, {
    return await fetch(this.props.userstore.baseURL + 'profile/interests', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>{console.log(responseJson);return responseJson})
              .then(()=>{this._getInterests()})
          
          
  }
  _onSuccess=(responseJson)=>{
    if(responseJson.success){
      
  }
  }
  onTextChanged(e){
    const value = e
    this.setState({
      //index: items.length,
      value:value,
      
    })
  }
  
GetItem() {
  this.props.userstore.enterinterests(this.state.value)
  var temp = this.state.interests
  temp.push(this.state.value);
  this.setState({
    interests:temp,
    value:''
  })
}
  componentWillMount(){
    this._getInterests();
  }
  render(){
    return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
      <View style={{flex:1}}>
        <View style={styles.input}>
        <TextInput placeholder ="Add your Interests" type = 'text' style={styles.textinput} onChangeText ={(e)=>this.setState({value: e})} autoCapitalize='words'//{(e,index)=>this.onTextChanged(e,index)}
        value={this.state.value}
        clearButtonMode='always'
        onSubmitEditing={()=>this.GetItem()}
         />
        </View>
        <ScrollView style={{flex:1.5}} >
        {   
            this.props.userstore.interests.map((key,i)=>{
              return(
                <View key={i} style={styles.skills}>
                <TouchableOpacity onPress={()=>{}} onLongPress={()=>{if(i>this.state.length){this.props.userstore.interests.splice(i);}}}>
                  <Text style={styles.skilltext}>
                    {key.text}
                  </Text>
                </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>

        {/*<KeyboardAvoidingView style={styles.suggestions} behavior="padding" enabled> 
        {   
            this.renderSuggestions()
          }
        </KeyboardAvoidingView>*/}
        <TouchableOpacity style={{alignItems:'center',
          marginBottom: 30,
          backgroundColor: '#62c4ac',
          paddingLeft: 80,
          paddingRight:80,
          padding:10,
          margin:30
        }} 
          onPress={()=>{this._onSubmitInterests();}}>
          <Text style={{justifyContent:'center',alignItems:"center",textAlign:'center',color:'white'}}>
            NEXT
          </Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
    )
  }
}
export default Interests;

const styles = StyleSheet.create({
  suggestions:{
    flex:0.5,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    marginTop:20
  },
  input:{
    flex:0.2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
    paddingTop:Constants.statusBarHeight
  },
  textinput:{
    backgroundColor:'white',
      color:'#62c4ac',
      margin:20,
      padding:10,
    //  width:300,
    height: hp('6%'), // 70% of height device screen
    width: wp('80%')  , // 80% of width device screen
    
      elevation:5
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
  skills:{
    flexDirection:'row',
    justifyContent:'center',
  },
  skilltext:{
   // fontSize:30,
    color:'#62c4ac',
    fontSize: hp('5%') // End result looks like the provided UI mockup
    ,fontFamily: 'sans-serif-light'
  },
})