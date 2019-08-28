import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,Dimensions, Button,TextInput, Image,ScrollView,ImageBackground,TouchableHighlight,KeyboardAvoidingView,FlatList} from 'react-native';
import{inject,observer} from 'mobx-react/native'
import{Header} from 'react-navigation'
import{Constants} from 'expo'
import escapeStringRegexp from 'escape-string-regexp'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
@inject('userstore')
@observer
class Auto extends Component{
  constructor(props){
    super(props);
    this.state={
      suggestions:[],
      value:'',
      skills:[],
    }
  }
  onTextChanged(e){
    const {items} = this.props;
    const value = e
    let suggestions = [];
    if(value.length > 0){
      const temp = escapeStringRegexp(value)
      const regex = new RegExp(`.*${temp.toLowerCase()}.*`,'g');
      suggestions = items.sort().filter(v => regex.test(v.toLowerCase())).slice(0,20);
    }
    this.setState({
      suggestions:suggestions,
      value:value
    })
  }
  counter(){
    if(this.state.skills.length === this.props.counter){
      this.props.userstore.enterskills(this.state.skills);
      this.props.navigation.navigate('SkillRate')
    }
  }
  
  renderSuggestions(){
    const {suggestions} = this.state;
    if (suggestions.length === 0){
      return null
    }
    return(
          suggestions.map((items,i)=>{
            return(
              <View key={i}>
             { i%2 == 0?
              <TouchableOpacity onPress={()=>{this.selectSkill(items)}} style={styles.chipseven}>
                <Text style={{textAlign:'center',color:'#c4c6c6'}}>{items}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>{this.selectSkill(items)}} style={styles.chipsodd}>
                <Text style={{textAlign:'center',color:'#a9abab'}}>{items}</Text>
              </TouchableOpacity>}
              </View>
            )
          })
         
    )
  }
  selectSkill(item){
    let temp =this.props.userstore.skills;
    temp[item]=0;
    this.setState({
      skills:temp,
      value:''
    })
    this.props.userstore.enterskills(item,0)
  }
  componentWillMount =async () =>{
    //let skills = await fetch(this.props.userstore.skill,{
      let skills = await fetch(this.props.userstore.baseURL + 'profile/skill',{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> responseJson)

    this.setState({skills:skills})
    // this.state.skills.map((items)=>{
    //   this.props.userstore.enterskills(items.skill_name,items.skill_rating);
    // })
  }
  render(){
    return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
      <View style={{flex:1}}>
        <View style={styles.input}>
        <TextInput placeholder ="Add a skill" type = 'text' style={styles.textinput} onChangeText = {(e)=>this.onTextChanged(e)}
        value={this.state.value}
         />
        </View>
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset = {Header.HEIGHT} style={{flex:1,flexDirection:'column'}} >
        <ScrollView>
          {
            Object.keys(this.props.userstore.skills).map((key)=>{
              return(
                <View key={key} style={styles.skills}>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{
                  if(this.props.userstore.skills[key] == 0){
                    delete this.props.userstore.skills[key]
                  }
                }}>
                <Text style={{textAlign:'center',fontSize:30,color:'#62c4ac',fontFamily: 'sans-serif-light'}}>{key}</Text>            
                </TouchableOpacity>
                </View>
                </View>
              )
            })
          }
        </ScrollView>
        <View style={{paddingTop:10,height:(Dimensions.get('window').height)*0.24}}>
        <ScrollView>
        <View style={styles.suggestions}> 
        {   
            this.renderSuggestions()
          }
          </View>
        </ScrollView>
        </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={{alignItems:'center',
          marginBottom: hp('5%'),
          backgroundColor: '#62c4ac',
          paddingLeft: 80,
          paddingRight:80,
          padding:10,
          margin:30
        }} 
          onPress={()=>{this.props.navigation.navigate('SkillRate',{nav:this.props.nav})}}>
          <Text style={{justifyContent:'center',alignItems:"center",textAlign:'center',color:'white'}}>
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    )
  }
}
export default Auto;

const styles = StyleSheet.create({
  suggestions:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
  },
  input:{
    flex:0.2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
  },
  textinput:{
  /*  backgroundColor:'white',
      color:'green',
      margin:10,
      padding:10,
      width:300,
      elevation:5*/
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
    //flexDirection:'row',
    flex: 1,
    justifyContent: 'center',
    //alignItems:'center',
  },
  skilltext:{
    //fontSize:30,
    fontSize: hp('5%'), // End result looks like the provided UI mockup
    color:'#62c4ac'
  }
})
// <ScrollView>
//           <View style={{flex:3  , paddingBottom:(Dimensions.get('window').height)}}>
//           {
            
//             Object.keys(this.props.userstore.skills).map((key)=>{
//               var arr = key.split(" ")
//               return(
//                 <View key={key} style={styles.skills}>
//                   {arr.map((item)=>{
//                                   return(
//                                     <Text style={{textAlign:'center',fontSize:30,color:'green'}}>{item}</Text>
//                                   )
//                            })
//                 }
//                 </View>
//               )
//             })

//           }
//           </View>
//         </ScrollView>