import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button,TextInput, Image,ScrollView,ImageBackground,Modal,ActivityIndicator} from 'react-native';
import {observer , inject} from 'mobx-react/native';
import ProgressCircle from 'react-native-progress-circle'
import {ImagePicker, Constants} from 'expo';
import userstore from '../../userStore'
import store from '../../store'
import {HeaderBackButton,NavigationAction} from 'react-navigation'
import {Entypo,Ionicons} from '@expo/vector-icons'
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';


@inject('userstore','store')
@observer
export default class MainProfile extends Component{
  constructor(props){
    super(props);
    this.state={
      title:'',
      bio:'',
      requirements:'',
      location:'',
      dp:'',
      requests:0,
      connections:0,
      rating:0,
      ratings:[],
      skills:[],
      interests:[],
      fullname:'',
      alreadysent:false,
      alreadyreceived:false,
      alreadyconnection:false,
      loading:true,
    }
  }
   _sendConnectionRequest = async(pid) =>{
    var details ={
        other_id:pid
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

  //  return await fetch(this.props.userstore.sendConnectionRequest, {
    return await fetch(this.props.userstore.baseURL + 'dashboard/sendConnectionRequest', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>(responseJson))
  }
  componentWillMount=async ()=>{
    url = 'http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/view/'
    pid = this.props.navigation.getParam('id')
    console.log(pid);
    compUrl = url+pid;
    let profile = await fetch(compUrl,{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> responseJson)

    var details ={
        other_id:this.props.navigation.getParam('id')
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
    //await fetch(this.props.userstore.checkRequest,{
      await fetch(this.props.userstore.baseURL + 'dashboard/checkRequest',{
      method:'POST',
      headers:{
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token':this.props.userstore.jwt
      },
      body:formBody
    }).then(response=>response.json())
    .then(responseJson => {console.log(responseJson);this.setState({alreadysent:responseJson.request,alreadyconnection:responseJson.connection,alreadyreceived:responseJson.received})})

    url = 'http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/ratings/'
    pid = this.props.navigation.getParam('id')
    console.log(pid);
    compUrl = url+pid;
    let ratings = await fetch(compUrl,{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> responseJson)
    ratings = ratings.filter(function(el){
                return el.rater != null ;
              })
    this.setState({
      dp:profile.dp,
      skills:profile.skill_set,
      title:decodeURI(profile.title),
      bio:decodeURI(profile.bio),
      rating:profile.rating,
      connections:profile.connections,
      requests:profile.requests,
      ratings:ratings,
      interests:profile.interests,
      fullname:decodeURI(profile.fullname),
      loading:false
    })
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
  //           color="#62c4ac"
  //           shadowColor="#e5e5e5"
  //           bgColor=""
  //       >
  //           <Text style={{ fontSize: 18,color:'white' }}>{j*10}</Text>
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

  //padding theek
  renderSkills=()=>{
    return(
          <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
          {
                   this.state.skills.map((i)=>{
              return(
                <View style={{}}>
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
                
              )
            })
                    }
                    </View>
        
      )
  }
  marks =[1,2,3,4,5]
    render(){
      return(  
        <ImageBackground source= {require('../../assets/Background.png')} style={{height:'100%', width:'100%'}}>
        <ScrollView style={styles.container}>
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
        <View style={styles.header}>
        <TouchableOpacity
        onPress={() => this.props.navigation.goBack(null)}
        >
         <Ionicons name="md-arrow-back" size={28} style={{paddingLeft:20}}  />
        </TouchableOpacity>
        <Text
        style={{flex:1,textAlign:'center',justifyContent:'center',alignItems:'center' , fontSize:hp('3%'),color:'#777777'}}
      >
      Profile
      </Text>
          <TouchableOpacity>
           <Entypo 
        name='dots-three-vertical'
        title="Info"
        color="#000000"
        size={22}
        style={{paddingRight:10}}
      />
      </TouchableOpacity>
        </View>
          <View style={styles.topContainer}>
                <Image
                  style={styles.profile}
                  source={{uri:this.state.dp}}
                />
                 <View style={styles.info}>
            <Text style={{fontSize: hp('2.5%'),color:'#62c4ac',fontWeight: 'bold',}}>{this.state.fullname}</Text>
            <Text style={{fontSize: hp('2.5%'),color:'#62c4ac'}}>{this.props.label}{'\n'}</Text>
            </View>
            {/*<Text style={styles.info}>{this.state.fullname}{'\n'}{this.state.label}{'\n'}</Text>*/}
          </View>
          <View style={styles.connections}>
            <Text style={{textAlign:'center',color:'#62c4ac'}}>{this.state.requests}{'\n'}<Text style={{color:'grey',fontWeight: 'bold'}}> Requests</Text></Text>
            <Text style={{textAlign:'center',color:'#62c4ac'}}>{this.state.connections}{'\n'}<Text style={{color:'grey',fontWeight: 'bold'}}> Connections</Text></Text>
            <Text style={{textAlign:'center',color:'#62c4ac'}}>{this.state.rating}{'\n'}<Text style={{color:'grey',fontWeight: 'bold'}}> Rating</Text></Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={{color:'#62c4ac'}}>REQUIREMENT</Text>
            <Text style={{flex:1,color:'grey',fontFamily: 'sans-serif-light'}}>{this.state.bio}</Text>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
            {
              this.state.alreadysent || this.state.alreadyreceived?
            <View style={{alignItems:'center',
              backgroundColor: '#becfcb',
              borderRadius:10
        }} 
        >
            <Text style={{justifyContent:'center',alignItems:"center",textAlign:'center',color:'white',padding:'3%'}}>
                Request Pending
            </Text>
            </View>
            :
            this.state.alreadyconnection?
              <TouchableOpacity style={{alignItems:'center',
                          backgroundColor: '#62c4ac',
                          borderRadius:10
                    }} 
                    onPress={()=>{this._sendConnectionRequest(this.props.navigation.getParam('id'))}}
                    >
                        <Text style={{justifyContent:'center',alignItems:"center",textAlign:'center',color:'white',padding:'3%'}}>
                            Already Connected
                        </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{alignItems:'center',
                          backgroundColor: '#62c4ac',
                          borderRadius:10
                    }} 
                    onPress={()=>{this._sendConnectionRequest(this.props.navigation.getParam('id'));this.setState({alreadysent:true})}}
                    >
                        <Text style={{justifyContent:'center',alignItems:"center",textAlign:'center',color:'white',padding:'3%'}}>
                            Request Connection
                        </Text>
                        </TouchableOpacity>
          }
            <TouchableOpacity 
            onPress={()=>{this.props.navigation.navigate('ChatView',{id:this.props.navigation.getParam('id'),title:this.state.fullname,pic:this.state.dp})}}
            style={{alignItems:'center',
          backgroundColor: '#62c4ac',
          borderRadius:10
        }} >
            <Text style={{justifyContent:'center',alignItems:"center",textAlign:'center',color:'white',padding:'3%'}}>
              Send Message
            </Text>
            </TouchableOpacity>
            </View>
            <Text style={{marginTop:30,color:'#62c4ac'}}>SKILLS</Text>
            </View>
            <View style={styles.skillsContainer}>
           
            {this.renderSkills()}
            </View>
            <View style={styles.centerContainer}>
           <Text style={{color:'#62c4ac'}}>RATING</Text>
            
             {
              this.state.ratings.map((items,i)=>{
                return(
                   i%2 == 0?

                    <View style= {styles.ratingContainer}>
                                    <Image
                                    style={styles.img}
                                    source={{uri:items.rater.dp}}
                                  />
                              <View style={styles.box}>
                              <Text style={styles.reviewer}>{decodeURI(items.rater.fullname)}</Text>
                              <Text style={styles.review}>{items.rater_comment}</Text>
                              <View style = {styles.reviewFooter}>
                              <Text style={styles.reviewFooter1}>{items.rating_date.slice(0,10)}({decodeURI(items.rater.title)})</Text>
                              <Text style={styles.reviewFooter2}>Rated {items.rating}/5</Text>
                              </View>
                              </View>
                              </View>
                              :
                              <View style= {styles.ratingContainer}>
                              <View style={styles.box}>
                              <Text style={[styles.reviewer,{textAlign:'right',marginRight:30}]}>{decodeURI(items.rater.fullname)}</Text>
                              <Text style={styles.review}>{items.rater_comment}</Text>
                              <View style = {styles.reviewFooter}>
                              <Text style={styles.reviewFooter1}>{items.rating_date.slice(0,10)}({decodeURI(items.rater.title)})</Text>
                              <Text style={styles.reviewFooter2}>Rated {items.rating}</Text>
                              </View>
                              </View>
                              <Image
                                    style={styles.img}
                                    source={{uri:items.rater.dp}}
                                  />
                            </View>

                            
                  )
              })
             }   
            </View>
            <View style= {styles.centerContainer}>
              <Text style={{color:'#62c4ac'}}>INTERESTS</Text>
              <ScrollView style={{flex:1.5}} >
          <View style={styles.suggestions}>
          {
            this.state.interests.map((key)=>{
              return(
                <View key={key} style={styles.skills}>
                  <View style={styles.chipsodd}>
                  <Text style={{textAlign:'center',color:'#62c4ac'}}>{decodeURI(key.text)}</Text>
                </View>
                </View>
              )
            })
          }
          </View>
        </ScrollView>
            </View>
            <View style={{flex:1}}>
          <TouchableOpacity
              style={styles.buttonTrans}
              onPress={()=>{this.props.navigation.navigate('rateProfile',{id:this.props.navigation.getParam('id'),skills:this.state.skills})}}
              >
                <Text textAlign='center' style={styles.textTrans} >RATE PROFILE</Text>
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
  topContainer:{
    flex:1,
    flexDirection:'row',
    marginTop:-40
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
  centerContainer:{
    flex:1,
    marginBottom:50,
    marginLeft:20,
  },
  skillsContainer:{
    flex:1,
    marginBottom:50,
  },
  connections:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginBottom:20,
  },
  reviewFooter:{
    flexDirection:'row',
    paddingRight:10,
    justifyContent:'space-between'
  },
  // skills:{
  //   flex:1,
  //   flexDirection:'row',
  //   justifyContent:'space-evenly',
  // },
  ratingContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginBottom:20,
  },
  img:{
    borderRadius:15,
    width:30,
    height:30,
    margin:10,
    marginTop:10,
  },
  box:{
    flex:1,
  },
  review:{
    alignItems:'center',
    margin:10,
    marginTop:10,
    fontSize:10,
    color:'grey',
    textAlign:'justify'
  },
  reviewer:{
    alignItems:'center',
    margin:10,
    marginTop:10,
    color:'grey',
    textAlign:'justify'
  },
  reviewFooter1:{
    alignItems:'center',
    margin:10,
    marginTop:10,
    fontSize:10,
    color:'#62c4ac'
  },
  reviewFooter2:{
    alignItems:'center',
    margin:10,
    marginTop:10,
    fontSize:10,
    color:'#62c4ac'
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
  //  alignItems:'flex-end',
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
    marginTop:140,
    marginRight:30,
    fontSize:20,
    borderColor:'#62c4ac',
    borderWidth:5
  },
  info:{
   /* justifyContent:'flex-end',
    alignItems:'center',
    margin:20,
    marginTop:140,
    marginRight:20,
    fontSize:20,
    color:'#62c4ac'*/
    justifyContent:'flex-end',
    alignItems:'center',
    //margin:20,
    margin:wp('5%'),
    //marginTop:140,
    marginTop:hp('23%'),
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
  }
  // form:{
  //  backgroundColor:'white',
  //  color:'green',
  //  marginBottom:20,
  //   margin:10,
  //   padding:10,
  //   width:300,
  //   elevation: 5
  // },
  // text:{
  //   alignItems:'center',
  //  color:'white',
  // },
})