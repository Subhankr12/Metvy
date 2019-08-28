import React,{Component} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image ,Modal, ScrollView ,FlatList, TouchableWithoutFeedback,ActivityIndicator } from 'react-native';
import {inject,observer} from 'mobx-react/native'
import userstore from '../../userStore'
import {AntDesign,Feather} from '@expo/vector-icons'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { MapView, Permissions, Location,Constants , LinearGradient} from 'expo';




@inject('userstore')
@observer
export default class Updrawer extends Component{
  constructor(props){
    super(props);
    this.state={
      data :[
      ],
      link1:false,
      link2:true,
      link3:false,
      modalVisible:false,
      skills:[],
      title:'',
      bio:'',
      requirements:'',
      location:'',
      dp:'',
      requests:0,
      connections:0,
      rating:0,
      fullname:'',
      pid:'',
      count:0,
      alreadysent:false,
      alreadyreceived:false,
      alreadyconnection:false,
      loading:true,
      loadingModal:true,
      ids:[]
    }
  }
  _checkRequest= async(id) =>{
    var details ={
        other_id:id
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
    .then(responseJson => {this.setState({loadingModal:false,alreadysent:responseJson.request,alreadyconnection:responseJson.connection,alreadyreceived:responseJson.received})})

  }
  renderPeople(){
    return(
    this.state.loading?
    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
          :
    <FlatList
          numColumns={2}
          data={this.state.data}
          renderItem={
            ({ item }) => (
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',paddingBottom:30}}>
              
              <View style={{flex:1 ,alignItems:'center' , paddingRight:10,paddingLeft:10,paddingBottom:60}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PersonProfile',{id:item._id})}}
          onLongPress={()=>{{
            this._checkRequest(item._id);
           this.setState({
            modalVisible:true,
            loadingModal:true,
            fullname:decodeURI(item.fullname),
            dp:item.dp,
            skills:item.skill_set.sort(function(a, b){
                        return a.skill_rating - b.skill_rating;
                    }).reverse().filter((item,i)=> i < 5),
            title:decodeURI(item.title),
            location:'Delhi',
            connections:item.connections,
            requests:item.requests,
            rating:item.rating,
            bio:decodeURI(item.bio),
            pid:item._id

          })}}}>

          <Image
                  style={styles.profile}
                  source={{uri:item.dp}}
                />
          </TouchableOpacity >
          <Text style={styles.info}>{decodeURI(item.fullname)}{'\n'}{this.props.userstore.location}</Text>
        <Text style={{textAlign:'center',color:'white',fontFamily: 'sans-serif-light'}}>{decodeURI(item.bio)}</Text> 
        </View>
        </View>
          )} />
            )
  }
  _getProfiles = async () =>{
    this.state.ids.map(async(items)=>{
    url = 'http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/view/'
    pid = items
    compUrl = url+pid;
    let temp = await fetch(compUrl,{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> {
      let data = this.state.data;
      data.push(responseJson);
      //console.log(data)
      this.setState({data:data})
      return responseJson
    })
    //console.log(temp)
    this.setState({loading:false})
    }
    )

    
    //this.setState({data:data})
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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setSkill(){
    let temp = [1,2,3,4]
    this.setState(prevState => ({
  skills: [...prevState.skills,...temp]
}))
  }
  componentDidMount(){
    // var details ={
    //     latitude:encodeURI(this.props.userstore.latitude),
    //     longitude:encodeURI(this.props.userstore.longitude),
    //     radius:encodeURI(parseInt(this.props.userstore.radius,10))
    //   }

    //   var formBody = [];
    //   for (var property in details) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(details[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    //   }
    //   formBody = formBody.join("&");

    // return fetch('https://nameless-refuge-91292.herokuapp.com/dashboard/show', {
    //           method: 'POST',
    //           headers: {
                
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'x-access-token' : this.props.userstore.jwt
    //           },
    //           body: formBody,
    //         }).then((response)=>response.json())
    //           .then((responseJson)=>console.log(responseJson))
    this.setSkill();
    // console.log(this.state.skills.length)
  }
  componentWillMount= async () =>{
    // var details ={
    //     latitude:encodeURI(this.props.userstore.latitude),
    //     longitude:encodeURI(this.props.userstore.longitude),
    //     radius:encodeURI(parseInt(this.props.userstore.radius,10))
    //   }

    //   var formBody = [];
    //   for (var property in details) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(details[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    //   }
    //   formBody = formBody.join("&");

  //  let data= await fetch(this.props.userstore.locationRecommenderSystem, {
    let data= await fetch(this.props.userstore.baseURL + 'profile/locationRecommenderSystem', {
              method: 'POST',
              headers: {
                
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : this.props.userstore.jwt
              },
            }).then((response)=>response.json())
              .then((responseJson)=>{this.setState({loading:false,data:responseJson.result})})
              
    
    //     var details ={
    //     latitude:encodeURI(this.props.userstore.latitude),
    //     longitude:encodeURI(this.state.userstore.longitude),
    //     radius:encodeURI(this.props.userstore.radius)
    //   }

    //   var formBody = [];
    //   for (var property in details) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(details[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    //   }
    //   formBody = formBody.join("&");
    
    // let url = 'https://nameless-refuge-91292.herokuapp.com/dashboard/show/' + filter
    // let data = await fetch(url, {
    //           method: 'POST',
    //           headers: {
    //             Accept: 'application/x-www-form-urlencoded',
    //             'x-access-token':this.props.userstore.jwt
    //           },
    //         }).then((response)=>response.json())
    //           .then((responseJson)=>responseJson)
    // this.setState({data})
  }

  _filterPeople = async(filter) =>{
     // var details ={
     //    latitude:encodeURI(this.props.userstore.latitude),
     //    longitude:encodeURI(this.props.userstore.longitude),
     //    radius:encodeURI(parseInt(this.props.userstore.radius,10))
     //  }

     //  var formBody = [];
     //  for (var property in details) {
     //  var encodedKey = encodeURIComponent(property);
     //  var encodedValue = encodeURIComponent(details[property]);
     //  formBody.push(encodedKey + "=" + encodedValue);
     //  }
     //  formBody = formBody.join("&");

    let data= await fetch(this.props.userstore.baseURL + 'profile/' + filter, {
              method: 'POST',
              headers: {
                
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : this.props.userstore.jwt
              },
            }).then((response)=>response.json())
              .then((responseJson)=>{console.log(responseJson);this.setState({loading:false,data:responseJson.result})})
              //this.setState({data:data,loading:false})
    
    // this.setState({data})
    // console.log(data)
  }
  render(){
    return(
      <LinearGradient
      colors={['#3AB1A7' , '#49B274']}
      style={{height:'100%',width:'100%'}}
      >
      <View style= {styles.container}>
      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible)}}
          >
          <TouchableWithoutFeedback onPress= {()=>{this.setModalVisible(!this.state.modalVisible)}}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
    <View style={styles.modal}>
          <LinearGradient
      colors={['#3AB1A7' , '#49B274']}
      style={{height:'100%' , width:'100%' , borderRadius:20,padding:25}}
      >       
      {
              this.state.loadingModal?
              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
              :
              <View style ={{flex:1,flexDirection:'column'}}>
              <View style={{flex:0.5,flexDirection:'row',justifyContent:'flex-start'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PersonProfile',{id:this.state.pid});this.setModalVisible(false)}}>
                <Image
                        style={styles.profile}
                        source={{uri:this.state.dp}}
                      />
              </TouchableOpacity >
              <View style={{flex:1,flexDirection:'column',marginTop:15,margin:5}}>
                <Text style={{textAlign:'left' ,color:'white',fontSize:20,fontWeight:'bold',fontFamily: 'sans-serif-light'}}>{decodeURI(this.state.fullname)}</Text>
                <Text style={{textAlign:'left',color:'white',fontWeight:'bold',fontFamily: 'sans-serif-light'}}>{this.state.title}</Text>
                <Text style={{textAlign:'left',color:'white',fontWeight:'bold',fontFamily: 'sans-serif-light'}}>{this.state.location}</Text>  
              </View>
              {
                this.state.alreadysent || this.state.alreadyreceived?
                <TouchableWithoutFeedback>
                  <Feather name="clock" size={32} color="#ffffff" style={{padding:22}} />
                </TouchableWithoutFeedback>
                :
                this.state.alreadyconnection?
                <TouchableWithoutFeedback>
                       <AntDesign name="checkcircleo" size={32} color="#ffffff" style={{padding:22}} />
                </TouchableWithoutFeedback>
                :
                <TouchableOpacity onPress = {()=>{this._sendConnectionRequest(this.state.pid);this.setState({alreadysent:true})}}>
                  <Image style={{height:30,width:30,margin:20}} source={require('../../assets/add.png')} />
                </TouchableOpacity>
              }
              </View>
              <View style={{flex:0.5,padding:10}}>
                <Text style={{color:'white'}}>
                {this.state.bio}
                </Text>
              </View>
              <View style={styles.connections}>
                <Text style={{textAlign:'center' ,color:'white'}}>{this.state.requests}{'\n'} Requests</Text>
                <Text style={{textAlign:'center',color:'white'}}>{this.state.connections}{'\n'} Connections</Text>
                <Text style={{textAlign:'center',color:'white'}}>{this.state.rating}{'\n'} Rating</Text>  
              </View>
              <View>
              {  
                
                this.state.skills.map((items,i)=>{
                 return(
                  <View key={i} style={{margin:5 , flexDirection:'row' , justifyContent:'space-around'}}>
                  <View style={{flex:0.6}}>
                  <Text style={{fontSize:10 , textAlign:'center',alignItems:'center' ,color:'white'}}>{decodeURI(items.skill_name)}</Text>   
                  </View>
                  <View style={{flex:0.3}}> 
                     <ProgressBarAnimated
                        width={100}
                        height={8}
                        value={20*items.skill_rating}
                        backgroundColor='white'
                        borderColor = 'white'
                      />
                    </View>  
                  </View>
                 )
              }
              )
            }
          </View>
          </View>
        }
          </LinearGradient>
            </View>
            </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      <ScrollView>
        <TouchableWithoutFeedback>
        <View>
        <View style = {{flex:1, flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>{
          this.setState({
            link1:true,
            link2:false,
            link3:false,
            loading:true
          })
          this._filterPeople('interestRecommenderSystem')
        }}><Text style={this.state.link1?styles.activeTab:styles.inactiveTab}>INTERESTS</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.setState({
            link1:false,
            link2:true,
            link3:false,
            loading:true
          })
          this._filterPeople('locationRecommenderSystem')
        }}><Text style={this.state.link2?styles.activeTab:styles.inactiveTab}>LOCATION</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.setState({
            link1:false,
            link2:false,
            link3:true,
            loading:true
          })
          this._filterPeople('skillRecommenderSystem')
        }}><Text style={this.state.link3?styles.activeTab:styles.inactiveTab}>SKILLS</Text></TouchableOpacity>
        </View>
        {this.renderPeople()}
        </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    padding:20,
    paddingTop:40
  },
  // part:{
  //   flex:1,
  //   justifyContent:'flex-start',
  //   alignItems:'center'
  // },
  profile:{
    justifyContent:'flex-start',
    alignItems:'center',
    borderRadius:40,
    width:80,
    height:80,
    margin:20,
    marginBottom:-10,
    borderWidth:5,
    borderColor:'white',
  },
  info:{
    fontSize:15,
    color:'white',
    alignItems:'center',
    margin:20,
    textAlign:'center',
    fontWeight:'bold',fontFamily: 'sans-serif-light'
  },
  inactiveTab:{
    color:'#cccccc',
    fontSize:18,
    margin:10,
    padding:10,
    textAlign:'center'
  },
  activeTab:{
    color:'white',
    fontSize:18,
    margin:10,
    padding:10,
    textAlign:'center'
  },
  modal:{
    flexDirection:'column',
    width: '90%',
    height: '65%',
    backgroundColor:'#ecf0f1',
    borderRadius:20,
  },
  modalBackground:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.5)'
    },
  connections:{
    flex:0.3,
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
})