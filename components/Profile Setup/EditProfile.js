import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback,Button,TextInput, Image,ScrollView,ImageBackground} from 'react-native';
import {observer , inject} from 'mobx-react/native';
import ProgressCircle from 'react-native-progress-circle'
import {ImagePicker, Constants} from 'expo';
import userstore from '../../userStore'
import store from '../../store'
import {HeaderBackButton} from 'react-navigation'
import {Entypo,Ionicons} from '@expo/vector-icons'
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
@inject('userstore','store')
@observer
export default class EditProfile extends Component{
  constructor(props){
    super(props);
    this.state={
      skills:[],
      interests:[]
    }
  }
  renderInterests(){
    return(
          this.state.interests.map((items,i)=>{
            return(
             <TouchableOpacity onPress={()=>{console.log('pressed')}} onLongPress={()=>{this.props.userstore.interests.splice(i+1,1);this._onSubmitInterest(items._id);}}> 
              <View key={i}>
                <View style={styles.chipsodd}>
                  <Text style={{textAlign:'center',color:'#62c4ac'}}>{decodeURI(items.text)}</Text>
                </View>
              </View>
            </TouchableOpacity>
            )
          })
         
    )
  }
  _getSkills=async ()=>{
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
  }
  _getInterests=async ()=>{
    
    //let profile = await fetch(this.props.userstore.profile,{
      let profile = await fetch(this.props.userstore.baseURL + 'profile/',{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> responseJson)

    this.setState({interests:profile.interests})
  }
  componentWillMount=async ()=>{

    //let profile = await fetch(this.props.userstore.profile,{
      let profile = await fetch(this.props.userstore.baseURL + 'profile/',{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> responseJson)

    this.setState({skills:profile.skill_set,interests:profile.interests})


  }
  //  createTable = () => {
  //   let table = []

  //   // Outer loop to create parent
  //   for (let i = 0; i < 5;) {
  //     let children = []
  //     let counter =0;
  //     //Inner loop to create children
  //     for (let j = i; j < 5; j++) {
  //       children.push( <ProgressCircle
  //           percent={j*10}
  //           radius={50}
  //           borderWidth={4}
  //           color="green"
  //           shadowColor="#999"
  //           bgColor="#ecf0f1"
  //       >
  //           <Text style={{ fontSize: 18 }}>{j*10}</Text>
  //       </ProgressCircle>)
  //       counter++;
  //       if(counter == 3){
  //         break;
  //       }
  //     }
  //     i=i+3;
  //     //Create the parent and add the children
  //     table.push(<View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>{children}</View>)
  //   }
  //   return table
  // }
  // createTemp= ()=>{
  //   let table = []

  //   // Outer loop to create parent
  //   for (let i = 0; i < 7;) {
  //     let children = []
  //     let counter =0;
  //     //Inner loop to create children
  //     for (let j = i; j < 7; j++) {
  //       children.push( <ProgressCircle
  //           percent={j*10}
  //           radius={50}
  //           borderWidth={4}
  //           color="green"
  //           shadowColor="#999"
  //           bgColor="#ecf0f1"
  //       >
  //           <Text style={{ fontSize: 18 }}>{j*10}</Text>
  //       </ProgressCircle>
  //       )
  //       if(j==6){
  //         children.push(<ProgressCircle
  //           percent={100}
  //           radius={50}
  //           borderWidth={4}
  //           color="green"
  //           shadowColor="#999"
  //           bgColor="#ecf0f1"
  //       >
  //           <Text style={{ fontSize: 18 }}>+</Text>
  //       </ProgressCircle>)
  //       }
  //       counter++;
  //       if(counter == 3){
  //         break;
  //       }
  //     }
  //     i=i+3;
  //     //Create the parent and add the children
  //     table.push(<View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly' , margin:15}}>{children}</View>)
  //   }
  //   return table
  // }
  _onSubmit= async (id) => {
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

    //return await fetch(this.props.userstore.skill, {
      return await fetch(this.props.userstore.baseURL + 'profile/skill', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>(responseJson))
              .then(()=>{this._getSkills()})
          
          
  }
  _onSubmitInterest= async (id) => {
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

    //return await fetch(this.props.userstore.interest, {
      return await fetch(this.props.userstore.baseURL + 'profile/interests', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>(responseJson))
              .then(()=>{this._getInterests()})
          
          
  }
  renderSkills=()=>{
    return(
          <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
          {
                   this.state.skills.map((i)=>{
              return(
                <TouchableOpacity onPress={()=>{console.log('pressed')}} onLongPress={()=>{delete this.props.userstore.skills[decodeURI(i.skill_name)];this._onSubmit(i._id);}}>
                <View>
                <ProgressCircle
            percent={i.skill_rating*20}
            radius={50}
            borderWidth={4}
            shadowColor="#e5e5e5"
            color="#62c4ac"
            bgColor="#f4fbf9"
        >
            <Text style={{ fontSize: 18,color:'#62c4ac' }}>{i.skill_rating}</Text>
        </ProgressCircle>
        <Text style={{textAlign:'center',color:'grey',fontFamily: 'sans-serif-light'}}>{decodeURI(i.skill_name).split(" ").join("\n")}</Text>
                </View>
                </TouchableOpacity>
              )
            })
                    }
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SkillSelector',{nav:'EditProfile'})}}>
                    <ProgressCircle
            percent={100}
            radius={50}
            borderWidth={4}
            shadowColor="#e5e5e5"
            color="#62c4ac"
            bgColor="#f4fbf9"
        >
            <Text style={{ fontSize: 18,color:'#62c4ac' }}>+</Text>
        </ProgressCircle>
        </TouchableOpacity>
                    </View>
        
      )
  }
  marks =[1,2,3,4,5]
    render(){
      return(  
        <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
        <ScrollView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('MainProfile')}
        >
        <Ionicons name="md-arrow-back" size={28} style={{paddingLeft:20}}  />
        </TouchableOpacity>
        <Text
        style={{flex:1,textAlign:'center',justifyContent:'center',alignItems:'center' , fontSize: hp('3%')}}
      >
      Profile
      </Text>
          <TouchableOpacity>
           <Entypo 
        name='dots-three-vertical'
        title="Info"
        color="#000000"
        size={hp('3%')}
        style={{paddingRight:wp('1%'),paddingTop: hp('1%')}}
      />
      </TouchableOpacity>
        </View>
          <View style={styles.topContainer}>
                <ImageBackground
                  imageStyle={{borderRadius:50}}
                  style={styles.profile}
                  source={{uri:this.props.userstore.dp}}
                >
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center',alignSelf:'stretch', backgroundColor:'rgba(0,0,0,0.6)',borderRadius:50,borderColor:'green',borderStyle: 'solid',borderWidth: 5}}>
               <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('ProfilePic')}}
                >
                <Text style = {{color:'white'}}>EDIT</Text>
                </TouchableOpacity>
                </View>
                </ImageBackground>
                <View style={styles.info}>
            <Text style={{fontSize: hp('2.5%'),color:'#62c4ac',fontWeight: 'bold',}}>{this.props.userstore.name}</Text>
            <Text style={{fontSize: hp('2.5%'),color:'#62c4ac'}}>{this.props.userstore.label}{'\n'}</Text>
            </View>
            {/*<Text style={styles.info}>{this.props.userstore.name}{'\n'}{this.props.userstore.label}{'\n'}{this.props.userstore.location}</Text>*/}
          </View>
          <View style={styles.connections}>
            <Text style={{textAlign:'center',color:'#62c4ac'}}>{this.props.userstore.requests}{'\n'}<Text style={{color:'grey',fontWeight: 'bold'}}> Requests</Text></Text>
            <Text style={{textAlign:'center',color:'#62c4ac'}}>{this.props.userstore.connections}{'\n'}<Text style={{color:'grey',fontWeight: 'bold'}}> Connections</Text></Text>
            <Text style={{textAlign:'center',color:'#62c4ac'}}>{this.props.userstore.rating}{'\n'}<Text style={{color:'grey',fontWeight: 'bold'}}> Rating</Text></Text>
          </View>
          <View style={{flex:1}}>
          <TouchableOpacity
              style={styles.buttonTrans}
              onPress={()=>{this.props.navigation.navigate('ProfileInfo')}}
              >
                <Text textAlign='center' style={styles.textTrans} > EDIT TITLE </Text>
              </TouchableOpacity>
          </View>
          <View style={styles.centerContainer}>
            <Text style={{color:'#62c4ac'}}>REQUIREMENT</Text>
            <Text style={{flex:1,color:'grey'}}>{this.props.userstore.bio}</Text>
            </View>
            <View style={{flex:1}}>
          <TouchableOpacity
              style={styles.buttonTrans}
              onPress={()=>{this.props.navigation.navigate('Bio')}}
              >
                <Text textAlign='center' style={styles.textTrans} > EDIT REQUIREMENT</Text>
              </TouchableOpacity>
          </View>
            <Text style={{marginTop:30,color:'#62c4ac',marginLeft:20}}>SKILLS</Text>
          <View style={styles.skillsContainer}>
            {this.renderSkills()}
          </View>
          <View style={{flex:1}}>
          <TouchableWithoutFeedback
              style={styles.buttonTrans}
              onPress={()=>{}}
              >
                <Text textAlign='center' style={styles.textTrans} > LONG PRESS TO DELETE A SKILL </Text>
              </TouchableWithoutFeedback>
          </View>
          <View style={styles.centerContainer}>
              <Text style={{marginTop:30,color:'#62c4ac'}}>INTERESTS</Text>
              <ScrollView style={{flex:1.5}} >
          <View style={styles.suggestions}>
            {this.renderInterests()}
          </View>
        </ScrollView>
            </View>
          <View style={{flex:1}}>
          <TouchableOpacity
              style={styles.buttonTrans}
              onPress={()=>{this.props.navigation.navigate('Interests',{nav:'EditProfile'})}}
              >
                <Text textAlign='center' style={styles.textTrans} > ADD INTERESTS</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
        </ImageBackground>
      )
    }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  suggestions:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
  },
  chipsodd:{
    padding:10,
    paddingRight:15,
    paddingLeft:15,
    margin:10,
    borderColor:'#62c4ac',
    borderRadius:30,
    borderWidth:3
  },
  topContainer:{
  flex:1,
  flexDirection:'row',
  // backgroundColor:'red',
  // marginTop:hp('-15%')
  marginTop:20
},
  centerContainer:{
  flex:1,
  marginBottom:wp('10%'),
  //marginLeft:20,
  margin:wp('5%'),
},
  skillsContainer:{
  flex:1,
  marginBottom:hp('5%'),
},
connections:{
  flex:1,
  flexDirection:'row',
  justifyContent:'space-evenly',
  marginBottom:hp('5%'),
},
  
  header:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:Constants.statusBarHeight+10,
  },
  // buttonContainer:{
  //   flex:1,
  //   justifyContent:'flex-end',
  //   alignItems:'center',
    
  // },
  // button: {
  // 	alignItems:'flex-end',
  //   marginBottom: 30,
  //   backgroundColor: '#62c4ac',
  //   paddingLeft: 80,
  //   paddingRight:80,
  //   padding:10,
  // },
  profile:{
    justifyContent:'flex-start',
    borderRadius:50,
    width:100,
    height:100,
    margin:20,
    // marginTop:140,
    marginRight:30,
    fontSize:20,
    color:'#62c4ac'
  },
info:{
  justifyContent:'flex-end',
  alignItems:'center',
  //margin:20,
  margin:wp('5%'),
  //marginTop:140,
  // marginTop:hp('23%'),
  marginRight:wp('20%'),
  top: -hp('5%'),
 // marginRight:20,
  //fontSize:20,
  flexDirection: 'column'
},
  textTrans:{
    textAlign:'center',
    alignItems:'center',
  	color:'#62c4ac',
	},
  buttonTrans:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    borderWidth: 1.5,
    marginBottom: 60,
    borderColor: '#62c4ac',
    margin:25,
    padding:10,
  },
  buttonTrans:{
  flex:1,
  flexDirection:'row',
  justifyContent:'center',
  borderWidth: 1.5,
  marginBottom: 60,
  borderColor: '#62c4ac',
  margin:wp('10%'),
  padding:10,
  height: hp('6%'),
  width: wp('80%')
},
  // form:{
  // 	backgroundColor:'white',
  // 	color:'green',
  // 	marginBottom:20,
  //   margin:10,
  //   padding:10,
  //   width:300,
  //   elevation: 5
  // },
  // text:{
  //   alignItems:'center',
  // 	color:'white',
	// },
})