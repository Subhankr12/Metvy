import * as React from 'react';
import { ActivityIndicator,Text, View, Button, StyleSheet, FlatList,Image,TouchableOpacity ,ScrollView,TextInput,ImageBackground} from 'react-native';
import {Ionicons,Entypo} from '@expo/vector-icons'
import {Constants} from 'expo'
import {observer,inject} from 'mobx-react/native'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('store','userstore')
@observer
export default class Connections extends React.Component {
  state = {
    data:[
    ],
    searchInput:'',
    link1:false,
    link2:true,
    loading:true
  };
  getConnections = async () =>{
    //this.setState({loading:false})
  //  let data = await fetch(this.props.userstore.Connections, {
    let data = await fetch(this.props.userstore.baseURL + 'profile/connections', {
              method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
            }).then((response)=>response.json())
              .then((responseJson)=>responseJson)
    data = data.filter(function(el){
      return el.user1 != null
    })          
    this.setState({data:data,loading:false})
    console.log(data);
    // _id: String,
    // fullname: String,
    // title: String,
    // location: String,
    // dp: String,
    // rating: Number
  }
  getRequests = async () =>{
    //this.setState({loading:false})
    console.log('called')
  //  let data = await fetch(this.props.userstore.Requests, {
    let data = await fetch(this.props.userstore.baseURL + 'profile/requests', {
              method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
            }).then((response)=>response.json())
              .then((responseJson)=>responseJson)
      data = data.filter(function(el){
      return el.user1 != null
    })   
    this.setState({data:data,loading:false})
    console.log(data);
  }

  _deleteRequest =async (pid)=>{
    var details ={
        other_id:encodeURI(pid),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

     //await fetch(this.props.userstore.deleteConnectionRequest, {
      await fetch(this.props.userstore.baseURL + 'dashboard/deleteConnectionRequest', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>{responseJson})
            
            this.getRequests()  

  }
  _acceptRequest =async (pid)=>{
    var details ={
        other_id:encodeURI(pid),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

    // await fetch(this.props.userstore.respondConnectionRequest, {
      await fetch(this.props.userstore.baseURL + 'dashboard/respondConnectionRequest', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>(responseJson))
            
            this.getRequests()  

  }
  componentWillMount = async()=>{
   // let data = await fetch(this.props.userstore.Requests, {
    let data = await fetch(this.props.userstore.baseURL + 'profile/requests', {
              method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
            }).then((response)=>response.json())
              .then((responseJson)=>responseJson)
    data = data.filter(function(el){
      return el.user1 != null
    })   
    this.setState({data:data,loading:false})
 }  
 render() {
    let _this = this;
    return (
      <ImageBackground source= {require('../../assets/Background.png')} style={{height:'100%', width:'100%'}}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
        onPress={() => this.props.navigation.goBack(null)}
        >
        <Ionicons color="#777777"name="md-arrow-back" size={28} style={{paddingLeft:20}}  />
        </TouchableOpacity>
        <Text
        style={{flex:3,textAlign:'center',color:'#777777',justifyContent:'center',alignItems:'center' , fontSize:hp('3%')}}
      >
      Connections
      </Text>
      
          <TouchableOpacity style={{paddingRight:15}}>
            <Entypo 
        name='dots-three-vertical'
        title="Info"
        color="#777777"
        size={22}
        style={{paddingRight:10}}
      />
           </TouchableOpacity>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',marginTop:20}}>
        <TouchableOpacity onPress={()=>{this.setState({loading:true});this.getConnections();this.setState({link1:true,link2:false})}}>
        <Text style={this.state.link1?styles.activeTab:styles.inactiveTab}>
          All
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.setState({loading:true});this.getRequests();this.setState({link1:false,link2:true})}}>
        <Text style={this.state.link2?styles.activeTab:styles.inactiveTab}>
          Pending
        </Text>
        </TouchableOpacity>
        </View>
        {
          this.state.loading?
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#62c4ac" />
          </View>
          :
        <FlatList
          data={this.state.data}
          renderItem={
            ({ item }) => (
            this.state.link2?
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PersonProfile',{id:this.props.userstore.pid == item.user1._id? item.user2._id : item.user1._id})}}>
              <View style = {styles.listContainer}>
               <View style={{ borderRadius:50,width:70,height:70 ,backgroundColor:'rgba(0,0,0,0.1)' ,elevation:5}}>
               <Image
                        style={styles.profile}
                        source={{uri:this.props.userstore.pid == item.user1._id? item.user2.dp : item.user1.dp}}
                      />
                      </View>
                <View style={{flex:1,marginLeft:10,flexDirection: 'column',top:hp('2%')}}>
                <Text style = {styles.name}>{decodeURI(this.props.userstore.pid == item.user1._id? item.user2.fullname : item.user1.fullname)}</Text>
                <Text style = {styles.last}>{decodeURI(this.props.userstore.pid == item.user1._id? item.user2.title : item.user1.title)}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{this._acceptRequest(this.props.userstore.pid == item.user1._id? item.user2._id : item.user1._id);}}>
                <Text style={{color:'#62c4ac'}}>
                  ACCEPT
                </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this._deleteRequest(this.props.userstore.pid == item.user1._id? item.user2._id : item.user1._id);}}>
                <Text style={{color:'#f94a4a'}}>
                  DECLINE
                </Text>
                </TouchableOpacity>
                </View>
            </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PersonProfile',{id:this.props.userstore.pid == item.user1._id? item.user2._id : item.user1._id})}}>
            <View style = {styles.listContainer}>
              <View style={{ borderRadius:50,width:70,height:70 ,backgroundColor:'rgba(0,0,0,0.1)' ,elevation:5}}>
                <Image
                  style={styles.profile}
                  source={{uri:this.props.userstore.pid == item.user1._id? item.user2.dp : item.user1.dp}} />
              </View>
              <View style={{flex:1,flexDirection:'row',marginLeft:10,paddingTop:10}}>
                <Text style = {styles.name}>{decodeURI(this.props.userstore.pid == item.user1._id? item.user2.fullname : item.user1.fullname)}</Text>
                <Text style = {styles.last}>{decodeURI(this.props.userstore.pid == item.user1._id? item.user2.title : item.user1.title)}</Text>
              </View>
            </View> 
            </TouchableOpacity>
          )}
        />
      }
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Constants.statusBarHeight
  },
  listContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingTop:15,
    paddingLeft:30,
    paddingRight:50,
    paddingBottom:30,
    marginTop:20
  },
  name: {
    fontSize: 20,
    padding:10,
    textAlign: 'left',
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold'
  },
  last:{
    paddingBottom:20,
    paddingLeft:10,
    paddingRight:10,
    bottom: hp('2%'),
    //padding:10,
    textAlign:'left'
  },
   profile:{
    justifyContent:'flex-start',
    borderRadius:35,
    width:70,
    height:70,
    shadowColor: '#000',
    shadowOffset: { width: 70, height: 70 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
  header:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    //paddingTop:Constants.statusBarHeight,
  },
  input:{
    flex:0.5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
    marginTop:10,
    padding:10
  },
  textinput:{
    backgroundColor:'white',
      color:'#62c4ac',
      margin:10,
      padding:10,
      width:300,
      elevation:5
  },
  inactiveTab:{
    color:'#cccccc',
    fontSize:20,
    margin:10,
    padding:10,
    textAlign:'center'
  },
  activeTab:{
    color:'#62c4ac',
    fontSize:20,
    margin:10,
    padding:10,
    textAlign:'center'
  },
});
//this.state.data.filter(item => item.fullname.includes(this.state.searchInput))
