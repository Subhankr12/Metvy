import * as React from 'react';
import { Text, View, Button, StyleSheet, FlatList,Image,TouchableOpacity ,ScrollView,TextInput,ImageBackground,ActivityIndicator} from 'react-native';
import {Ionicons,Entypo} from '@expo/vector-icons'
import {Constants} from 'expo'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
  import moment from "moment";
import {observer , inject} from 'mobx-react/native';

@inject('userstore')
@observer
export default class MeetUp extends React.Component {
  state = {
    data:[
      {
        name:'1',
        venue:'hotel a',
        date:'11/11/11',
        time:'10:10',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'2',
        venue:'hotel b',
        date:'11/11/11',
        time:'10:10',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {name:'3',
      venue:'hotel c',
      date:'11/11/11',
        time:'10:10',
      pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'1',
        venue:'hotel a',
        date:'11/11/11',
        time:'10:10',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'2',
        venue:'hotel b',
        date:'11/11/11',
        time:'10:10',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {name:'3',
      venue:'hotel c',
       date:'11/11/11',
        time:'10:10',
      pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'1',
        venue:'hotel a',
         date:'11/11/11',
        time:'10:10',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'2',
        venue:'hotel b',
         date:'11/11/11',
        time:'10:10',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {name:'3',
      venue:'hotel c',
       date:'11/11/11',
        time:'10:10',
      pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      }
    ],
    searchInput:'',
    output: [],
    link1:false,
    link2:true,
    otherUser:'',
    loading:true,
    date:'',
    time:''
  };
  componentDidMount(){
    if(this.state.link2 === 'true')
    {
    try {
     // fetch(this.props.userstore.getMeetupScheduled,{
      fetch(this.props.userstore.baseURL + 'dashboard/getMeetupScheduled',{
        method:'GET',
        headers:{
                  Accept: 'application/x-www-form-urlencoded',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'x-access-token' : this.props.userstore.jwt
                },
       // body:formBody
      }).then(response=>response.json())
      .then(responseJson=>this.setState({output: responseJson,loading:false}))
    }
      //console.log('success');
      //return(
        //<Text>success</Text>
      //)
    //}
    catch (error) {
      console.log('error');
    }
  }
  else{
    console.log('link2')
    //fetch(this.props.userstore.getMeetupRequest,{
      fetch(this.props.userstore.baseURL + 'dashboard/getMeetupRequest',{
        method:'GET',
        headers:{
                  Accept: 'application/x-www-form-urlencoded',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'x-access-token' : this.props.userstore.jwt
                },
      //  body:formBody
      }).then(response=>response.json())
      .then(responseJson=>this.setState({output: responseJson, loading:false}))
      .then(r=>console.log(r))
    }
  }

  declineRequest(id){
    var details ={
        other_id : encodeURI(id),
      }

    var formBody = [];
    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
   // fetch(this.props.userstore.deleteMeetupRequest,{
    fetch(this.props.userstore.baseURL + 'dashboard/deleteMeetupRequest',{
        method:'DELETE',
        headers:{
                  Accept: 'application/x-www-form-urlencoded',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'x-access-token' : this.props.userstore.jwt
                },
                body: formBody
      }).then(response=>response.json())
      .then(responseJson=>console.log(responseJson))
      this.meetRequests();

    }
  declineScheduled(){
    //fetch(this.props.userstore.deleteMeetupScheduled,{
      fetch(this.props.userstore.baseURL + 'dashboard/deleteMeetupScheduled',{
      method:'DELETE',
      headers:{
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : this.props.userstore.jwt
              },
              body: JSON.stringify({other_id: this.state.otherUser})
    //  body:formBody
    }).then(response=>response.json())
    .then(responseJson=>this.setState({output: responseJson}))
  }
  acceptMeetup(id,res_id,time){
    var details ={
        other_id : encodeURI(id),
        restaurant: encodeURI(res_id),
        meetup_time: encodeURI(time)
      }

    var formBody = [];
    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

  //  fetch(this.props.userstore.respondMeetupRequest,{
    fetch(this.props.userstore.baseURL + 'dashboard/respondMeetupRequest',{
      method:'POST',
      headers:{
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : this.props.userstore.jwt
              },
        body:formBody
    }).then(response=>response.json())
    .then(responseJson => console.log(responseJson))
    this.meetRequests();
  }
  scheduledMeets(){
    //fetch(this.props.userstore.getMeetupScheduled,{
      fetch(this.props.userstore.baseURL + 'dashboard/getMeetupScheduled',{
        method:'GET',
        headers:{
                  Accept: 'application/x-www-form-urlencoded',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'x-access-token' : this.props.userstore.jwt
                },
       // body:formBody
      }).then(response=>response.json())
      .then(responseJson=>this.setState({output: responseJson,loading:false}))
  }
  meetRequests(){
   // fetch(this.props.userstore.getMeetupRequest,{
    fetch(this.props.userstore.baseURL + 'dashboard/getMeetupRequest',{
        method:'GET',
        headers:{
                  Accept: 'application/x-www-form-urlencoded',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'x-access-token' : this.props.userstore.jwt
                },
      //  body:formBody
      }).then(response=>response.json())
      .then(responseJson=>this.setState({output: responseJson,loading:false}))
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
        style={{flex:3,textAlign:'center',color:'#777777',justifyContent:'center',alignItems:'center' , fontSize: hp('3%')}}
      >
      Meetups
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
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',marginTop:hp('5%')}}>
        <TouchableOpacity onPress={()=>{this.scheduledMeets();this.setState({link1:true,link2:false,loading:true})}}>
        <Text style={this.state.link1?styles.activeTab:styles.inactiveTab}>
        Scheduled
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.meetRequests();this.setState({link1:false,link2:true,loading:true})}}>
        <Text style={this.state.link2?styles.activeTab:styles.inactiveTab}>
        Requests
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
          data={this.state.output}//data.filter(item => item.name.includes(this.state.searchInput))}
          renderItem={
            ({ item }) => (
            this.state.link2?
            <View>
              {console.log(item)}
              <View style = {styles.listContainer}>
               <View style={{ borderRadius:80,width:70,height:70 ,backgroundColor:'rgba(0,0,0,0.1)' ,elevation:5,bottom: hp('2.2%')}}>
               <Image
                        style={styles.profile}
                        source={{uri:item.user1.dp}}
                      />
                      </View>
                <View style={styles.nameContainer}>{/*style={{flex:1,flexDirection:'column',marginLeft:10,paddingTop:20}}>*/}
                <Text style = {styles.name}>{decodeURI(item.user1.fullname)}</Text>
                <Text style = {styles.venue}>{decodeURI(item.restaurant.name)}</Text>
                {/*<Text style = {styles.venue}>{this.props.navigation.getParam('date')} {this.props.navigation.getParam('time')}</Text>*/}
                <Text style={styles.mblTxt}>{moment(new Date(decodeURI(item.meetup_time) * 1000)).format('MM/DD/YYYY')}</Text>
                <Text style={{fontWeight: '200',color: '#777',fontSize: 13,right: -wp('53%'),top: -hp('9%')}}>{moment(new Date(decodeURI(item.meetup_time) * 1000)).format('hh:mm a')}</Text>
                </View>
               {/*} <View style={{flex:1,flexDirection:'column'}}>
                <TouchableOpacity>
                <Text style={{margin:10}}>
                  {item.date}
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={{margin:10}}>
                  {item.time}
                </Text>
                </TouchableOpacity>
            </View>*/}
            </View>

            <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={()=>{this.acceptMeetup(item.user1._id,item.restaurant._id,item.meetup_time)}}>
                <Text style={{color:'#62c4ac'}}>
                  ACCEPT
                </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.declineRequest(item.user1._id)}}>
                <Text style={{color:'#f94a4a'}}>
                  DECLINE
                </Text>
                </TouchableOpacity>
            </View>
            </View>
            :
            <View style = {styles.listContainer}>
              {console.log(item)}
              <View style={{ borderRadius:80,width:70,height:70 ,backgroundColor:'rgba(0,0,0,0.1)' ,elevation:5,bottom: hp('2.2%')}}>
                <Image
                  style={styles.profile}
                  source={{uri:item.user2.dp}} />
              </View>
              <View style={styles.nameContainer}>{/*style={{flex:1,flexDirection:'column',marginLeft:10,paddingTop:10}}>*/}
                <Text style = {styles.name} >{decodeURI(item.user2.fullname)}</Text>
                <Text style = {styles.venue} >{decodeURI(item.restaurant.name)}</Text>
                <Text style={styles.mblTxt}>{moment(new Date(decodeURI(item.meetup_time) * 1000)).format('MM/DD/YYYY')}</Text>
                <Text style={{fontWeight: '200',color: '#777',fontSize: 13,right: -wp('53%'),top: -hp('9%')}}>{moment(new Date(decodeURI(item.meetup_time) * 1000)).format('hh:mm a')}</Text>
              </View>
            </View> 
          )}
          keyExtractor={(item, index) => item.key}
        />
      }
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 280,
  },
  container: {
    flex: 1,
    paddingTop:Constants.statusBarHeight
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
    //alignSelf: 'flex-end'
    right: -wp('50%'),
    top: -hp('9%')
  },
  listContainer:{
  /*  flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingTop:15,
    paddingLeft:50,
    paddingRight:50,
    paddingBottom:30,
    marginTop:20*/
    //flexDirection: 'row',
    justifyContent: 'space-between',
   // width: 280,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingTop:5,
    paddingLeft:wp('5%'),
    //paddingRight:50,
    paddingBottom:wp('3%'),
    marginTop:5
  },
  name: {
   // fontSize: 30,
   fontSize: hp('3%'),
    padding:10,
    textAlign: 'left',
  },
  venue:{
    paddingBottom:20,
    paddingLeft:10,
    paddingRight:10,
    textAlign:'left'
  },
   profile:{
    justifyContent:'flex-start',
    borderRadius:80,
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
    //fontSize:20,
    fontSize: hp('3%'),
    margin:10,
    padding:10,
    textAlign:'center'
  },
  activeTab:{
    color:'#62c4ac',
    fontSize: hp('3%'),
    //fontSize:20,
    margin:10,
    padding:10,
    textAlign:'center'
  },
});
