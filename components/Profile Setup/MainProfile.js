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
      dp:'',
      requests:0,
      connections:0,
      rating:0,
      ratings:[],
      skills:[],
      loading:true,
    }
  }
  renderInterests(){
    return(
          this.props.userstore.interests.map((items,i)=>{
            return(
              <View key={i}>
              { i>0?
                <View style={styles.chipsodd}>
                  <Text style={{textAlign:'center',color:'#62c4ac',fontFamily: 'sans-serif-light'}}>{decodeURI(items.text)}</Text>
                </View>
                :
                <View />
              }
              </View>
            )
          })
         
    )
  }
  componentWillMount=async ()=>{
  //  let profile = await fetch(this.props.userstore.profile,{
    let profile = await fetch(this.props.userstore.baseURL + 'profile/',{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> { return responseJson})

     url = 'http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/ratings/'
    pid = this.props.userstore.pid
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
      skills:profile.skill_set,
      title:decodeURI(profile.title),
      bio:decodeURI(profile.bio),
      rating:profile.rating,
      connections:profile.connections,
      requests:profile.requests,
      ratings:ratings,
      loading:false
    })
    this.props.userstore.enterbio(this.state.bio);
    this.props.userstore.enterrequests(this.state.requests);
    this.props.userstore.enterconnections(this.state.connections);
    this.props.userstore.enterratings(this.state.rating);
    this.props.userstore.enterlabel(this.state.title)
    // this.state.skills.map((items)=>{
    //   this.props.userstore.enterskills(items.skill_name,items.skill_rating);
    // })
    }
   createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 5;) {
      let children = []
      let counter =0;
      //Inner loop to create children
      for (let j = i; j < 5; j++) {
        children.push( <ProgressCircle
            percent={j*10}
            radius={50}
            borderWidth={4}
            color="#62c4ac"
            shadowColor="#e5e5e5"
            bgColor=""
        >
            <Text style={{ fontSize: 18,color:'white' }}>{j*10}</Text>
        </ProgressCircle>)
        counter++;
        if(counter == 3){
          break;
        }
      }
      i=i+3;
      //Create the parent and add the children
      table.push(<View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>{children}</View>)
    }
    return table
  }
  // renderSkills=()=>{
  //   return(
  //         <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
  //         {
  //                  this.state.skills.map((items,i)=>{
  //             return(
  //               <View>
  //               <ProgressCircle
  //           percent={items.skill_rating*20}
  //           radius={50}
  //           borderWidth={4}
  //           shadowColor="#e5e5e5"
  //           color="#62c4ac"
  //           bgColor="#f4fbf9"
  //       >
  //           <Text style={{ fontSize: 18,color:'#62c4ac' }}>{items.skill_rating*20}</Text>
  //       </ProgressCircle>
  //       <Text style={{textAlign:'center',color:'grey'}}>{decodeURI(items.skill_name)}</Text>
  //               </View>
                
  //             )
  //           })
  //                   }
  //                   </View>
        
  //     )
  // }
  renderSkills = () =>{
    return(
      <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
        {
          Object.keys(this.props.userstore.skills).map((key)=>{
                      return(
                        <View>
                          <ProgressCircle
                      percent={this.props.userstore.skills[key]*20}
                      radius={50}
                      borderWidth={4}
                      shadowColor="#e5e5e5"
                      color="#62c4ac"
                      bgColor="#f4fbf9"
                          >
                          <Text style={{ fontSize: hp('2.4%'),color:'#62c4ac' }}>{this.props.userstore.skills[key]}</Text>
                        </ProgressCircle>
                        <Text style={{textAlign:'center',color:'grey',fontFamily: 'sans-serif-light'}}>{decodeURI(key).split(" ").join("\n")}</Text>
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
        <View style={styles.header}>
        <TouchableOpacity
        onPress={() => {this.props.navigation.goBack(null)}}
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
          <View style={[styles.topContainer]}>
          
                <Image
                  style={styles.profile}
                  source={{uri:this.props.userstore.dp}}
                />
                <View style={styles.info}>
            <Text style={{fontSize: hp('2.5%'),color:'#62c4ac',fontWeight: 'bold',}}>{this.props.userstore.name}</Text>
            <Text style={{fontSize: hp('2.5%'),color:'#62c4ac'}}>{this.props.userstore.label}{'\n'}</Text>
            </View>
            
          </View>
          <View style={styles.connections}>
            <Text style={{textAlign:'center',color:'#62c4ac'}}>{this.state.requests}{'\n'}<Text style={{color:'grey',fontWeight: 'bold'}}> Requests</Text></Text>
            <Text style={{textAlign:'center',color:'#62c4ac'}}>{this.state.connections}{'\n'}<Text style={{color:'grey',fontWeight: 'bold'}}> Connections</Text></Text>
            <Text style={{textAlign:'center',color:'#62c4ac'}}>{this.state.rating}{'\n'}<Text style={{color:'grey',fontWeight: 'bold'}}> Rating</Text></Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={{color:'#62c4ac'}}>REQUIREMENT</Text>
            <Text style={{flex:1,color:'grey' ,fontFamily: 'sans-serif-light'}}>{this.props.userstore.bio}</Text>
            <Text style={{marginTop:hp('5%'),color:'#62c4ac'}}>SKILLS</Text>
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
              <Text style={{color:'#62c4ac',}}>INTERESTS</Text>
              <ScrollView style={{flex:1.5}} >
          <View style={styles.suggestions}>
            {this.renderInterests()}
          </View>
        </ScrollView>
            </View>
           <TouchableOpacity
              style={styles.buttonTrans}
              onPress={()=>{this.props.navigation.navigate('EditProfile')
              }}
              >
                <Text textAlign='center' style={styles.textTrans} > EDIT PROFILE </Text>
              </TouchableOpacity>
        </ScrollView>
        </ImageBackground>
      )
    }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    // paddingTop:Constants.statusBarHeight
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
    textAlign:'justify',
    fontFamily: 'sans-serif-light'
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
    justifyContent:'space-evenly',
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
    margin:wp('5%'),
    // marginTop:hp('20%'),
    marginRight:wp('10%'),
   // fontSize:20,
    borderColor:'#62c4ac',
    borderWidth:5,
    overflow:'hidden'
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