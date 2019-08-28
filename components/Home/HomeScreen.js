import * as React from 'react';
import {AsyncStorage, View, Text, Button, StyleSheet,ScrollView, TouchableOpacity,FlatList, Image , TouchableWithoutFeedback,Animated,Dimensions ,ImageBackground,Modal,TouchableHighlight,ActivityIndicator} from 'react-native';
import { MapView, Permissions, Location,Constants , LinearGradient} from 'expo';
import {Ionicons,
MaterialCommunityIcons,Feather,AntDesign} from '@expo/vector-icons'
import BottomDrawer from 'rn-bottom-drawer';
import Bottomdrawer from './BottomDrawer'
import Updrawer from './UpDrawer'
import {inject,observer} from 'mobx-react/native'
import userstore from '../../userStore'
import HeaderNav from './HeaderNav'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import {ClusterMap } from 'react-native-cluster-map'
import { Marker,Callout } from "react-native-maps";
import { Divider } from 'react-native-elements';
import CustomCluster from './CustomCluster'
import CustomPin from './CustomPin'
import ClusteredMapView from 'react-native-maps-super-cluster';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import SocketIOClient from 'socket.io-client';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
import { NavigationActions, StackActions } from 'react-navigation';
const { width, height } = Dimensions.get('window');
@inject('store','userstore')
@observer
export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    eagleOn:false,
    location: null,
    modalVisible:false,
    down:true,
    image:'',
    startUp:false,
    drawerOpen:false,
    meetups:2,
    lat:0,
    longdelta:0.0421,
    radius:0,
    markers:[
    ],
    isListingSelected: false,
    title:'',
    bio:'',
    dp:'',
    requests:0,
    connections:0,
    rating:0,
    ratings:[],
    skills:[],
    fullname:'',
    glanceVisible:false,
    alreadysent:false,
    alreadyreceived:false,
    alreadyconnection:false,
    loadingModal:true,
    unread:false,
    screenWidth: "", 
    screenHeight: "",
    clusterData:[],
    clusterPoint:0
  }
  this.socket = SocketIOClient('http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/')
  this.socket.on('new_message' ,(data)=>{
    this.setState({unread:true})
  })
  }
  
  updateLocation=async () => {
      if(this.state.location != null){
        var details ={
        latitude:encodeURI(this.state.location.coords.latitude),
        longitude:encodeURI(this.state.location.coords.longitude),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

 //   return await fetch(this.props.userstore.coordinates, {
  return await fetch(this.props.userstore.baseURL + 'profile/coordinates', {
              method: 'PATCH',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>responseJson)
    }

}

showPeople=async (radius) => {
  this.props.userstore.enterlatlang(this.state.location.coords.latitude,this.state.location.coords.longitude)
      if(this.state.location != null){
        var details ={
        latitude:encodeURI(this.state.location.coords.latitude),
        longitude:encodeURI(this.state.location.coords.longitude),
        radius:encodeURI(radius)
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

  //  let data =  await fetch(this.props.userstore.dashboard, {
    let data =  await fetch(this.props.userstore.baseURL + 'dashboard/show', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>this.setState({markers:responseJson}))
       // console.log(data)
       // this.setState({markers:data})
    }
    
}
setLocation=async()=>{
  var details ={
        latitude:encodeURI(this.state.location.coords.latitude),
        longitude:encodeURI(this.state.location.coords.longitude),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
  //  return await fetch(this.props.userstore.setLocation,{
    return await fetch(this.props.userstore.baseURL + 'profile/setLocation',{
      method:'PATCH',
      headers:{
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : this.props.userstore.jwt
              },
      body:formBody
    }).then(response=>response.json())
    .then(responseJson=>responseJson)
}
  componentWillMount(){
    this._getLocationAsync();
    // this.setLocation();
    
    // var details ={
    //     latitude:encodeURI(this.state.location.coords.latitude),
    //     longitude:encodeURI(this.state.location.coords.longitude),
    //     radius:encodeURI(radius)
    //   }

    //   var formBody = [];
    //   for (var property in details) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(details[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    //   }
    //   formBody = formBody.join("&");
    // fetch('https://nameless-refuge-91292.herokuapp.com//profile/setLocation',{
    //   method:'PATCH',
    //   headers:{
    //             Accept: 'application/x-www-form-urlencoded',
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'x-access-token' : this.props.userstore.jwt
    //           },
    //   body:formBody
    // }).then(response=>response.json())
    // .then(responseJson=>console.log(responseJson))
    
  }
  // async componentDidMount() {
    
  //    console.log(this.props.userstore.jwt)
  //   this._getLocationAsync();
  //   this.setState({eagleOn:this.props.userstore.eagle_mode,screenWidth:Math.round(Dimensions.get('window').width), screenHeight:Math.round(Dimensions.get('window').height)})
  //   this.props.navigation.setParams({
  //     image: this.props.userstore.dp
  //   })

  //   this.timer = setInterval(()=> this.updateLocation(), 10000)
    
  //   //     var details ={
  //   //     latitude:encodeURI(this.props.userstore.latitude),
  //   //     longitude:encodeURI(this.props.userstore.longitude),
  //   //     radius:encodeURI(4)
  //   //   }

  //   //   var formBody = [];
  //   //   for (var property in details) {
  //   //   var encodedKey = encodeURIComponent(property);
  //   //   var encodedValue = encodeURIComponent(details[property]);
  //   //   formBody.push(encodedKey + "=" + encodedValue);
  //   //   }
  //   //   formBody = formBody.join("&");

  //   // let data =  await fetch('https://nameless-refuge-91292.herokuapp.com/dashboard/show', {
  //   //           method: 'POST',
  //   //           headers: {
  //   //             Accept: 'application/x-www-form-urlencoded',
  //   //             'Content-Type': 'application/x-www-form-urlencoded',
  //   //             'x-access-token' : this.props.userstore.jwt
  //   //           },
  //   //           body: formBody
  //   //         }).then((response)=>response.json())
  //   //           .then((responseJson)=>responseJson)
  //   //   this.setState({markers:data})
    
    
  // }

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
  //  await fetch(this.props.userstore.checkRequest,{
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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setGlance(visible) {
    this.setState({glanceVisible: visible});
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION); // Notice: getAsync vs askAsync
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      // console.log(location)
      this.setState({ location })
    } else {
      alert('Dont have permission');
    }
    //console.log(this.props.userstore.eagle_mode)
    this.setState({eagleOn:this.props.userstore.eagle_mode})
    var details ={
        latitude:encodeURI(this.state.location.coords.latitude),
        longitude:encodeURI(this.state.location.coords.longitude),
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
  //  await fetch(this.props.userstore.setLocation,{
    await fetch(this.props.userstore.baseURL + 'profile/setLocation',{
      method:'PATCH',
      headers:{
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : this.props.userstore.jwt
              },
      body:formBody
    }).then(response=>response.json())
    .then(responseJson=>responseJson)
  };
  // static navigationOptions = ({navigation, screenProps})=>({
  //   headerLeft:(
  //     <Ionicons name="md-menu" size={32} color="#3AB1A7" style={{padding:10}} />
  //     ),
  //   headerTitle: (
  //     <Text
  //       style={{flex:1,textAlign:'center',justifyContent:'center',alignItems:'center',fontSize:15,color:'#3AB1A7'}}
  //     >
  //     Metvy
  //     </Text>
  //   ),
  //   headerRight:
  //     <TouchableOpacity
  //       onPress={()=>navigation.navigate('MainProfile')}
  //       title="Info"
  //       color="black"
  //     >
  //     <Image
  //                 style={styles.img}
  //                 source={{uri:screenProps.image}}
  //               />
  //     </TouchableOpacity>,
  // });
  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location:position,
        })
        this.map.mapview.animateToCoordinate(
          {
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          1000
        )
      },
    )
  }
  renderShowLocationButton = () => {
    
      return (
         <TouchableOpacity
          style={styles.myLocationButton}
          onPress={() => {
            this.getCurrentPosition()
          }}
        >
          <Image style={{height:25,width:25}} source={require('../../assets/gps.png')} />
        </TouchableOpacity>
      )
    
  }
  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      this.props.store.authIt(false);
    } catch (error) {
      // console.log('AsyncStorage error: ' + error.message);
    }
  }
  renderContent = () => {
    return (
      <Bottomdrawer navigation = {this.props.navigation} />
    )
  }
  renderAgain = () => {
    return (
      <Updrawer />
    )
  }
  renderDrawer = () => {
    return (
      <View style = {styles.drawercontainer}>
      <LinearGradient
      colors={['#3AB1A7' , '#49B274']}
      style={{height:'100%' , paddingTop:5*Constants.statusBarHeight,}}
      >
      <View style={{flex:0.4,flexDirection:'column',alignItems:'center'}}>
        
        <Image style = {styles.img1} source={{uri:this.props.userstore.dp}}
        />
        <View style={{flexDirection: 'row', marginBottom:'20%'}}>
        <Text style={{fontSize:16,color:'white',textAlign:'center'}}>Hello </Text>
        <Text style={{fontSize:16,color:'white',textAlign:'center',fontWeight: 'bold'}}>{this.props.userstore.name}</Text>
        </View>
        <Divider style={styles.divider} />
        </View>
        <View style={{flex:1, flexDirection:'column',marginTop:120,marginBottom:150}}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MainProfile')}}>
        <Text style={styles.links}>Profile</Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ChatScreen')}}>
        <Text style={styles.links}>Messages</Text>
        </TouchableOpacity>
        </View>
        <View style={{flex:1, flexDirection:'column'}}>
        <Divider style={[styles.divider,{left:'15%',alignItems:'center'}]} />
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MainProfile')}}>
        <Text style={styles.links}>Settings</Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=>{this.userLogout()}}>
        <Text style={styles.links}>Logout</Text>
        </TouchableOpacity>
        </View>
        </LinearGradient>
        </View>
    );
  };
   toggle = ()=>{
     if(!this.state.drawerOpen){
     this.drawer.openDrawer();
     this.setState({
       drawerOpen:true
     })
     }
     else{
     this.drawer.closeDrawer();
     this.setState({
       drawerOpen:false
     })
     }
   }
   renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId
    
    // use pointCount to calculate cluster size scaling
    // and apply it to "style" prop below

    // eventually get clustered points by using
    // underlying SuperCluster instance
    // Methods ref: https://github.com/mapbox/supercluster
    const clusteringEngine = this.map.getClusteringEngine(),
          clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)
          //console.log(clusteredPoints)
    let clusterData = [];
    return (
      <MapView.Marker coordinate={coordinate} onPress={(e)=>{this.setModalVisible(true);this.setState({clusterData:clusteredPoints,clusterPoint:pointCount});
      ;this.clusterData=clusteringEngine.getLeaves(clusterId,100)}}>
        <View style={styles.cluster}>
          <Text style={{color:'#62c4ac'}}>
            {pointCount}
          </Text>
        </View>  
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible)}}
        >
        <Modal
                          animationType="fade"
                          transparent={true}
                          visible={this.state.glanceVisible}
                          onRequestClose={()=>{this.setGlance(!this.state.glanceVisible)}}
                          >
                            <TouchableWithoutFeedback onPress= {()=>{this.setGlance(!this.state.glanceVisible)}}>
                              <View style={styles.glancemodalBackground}>
                                <TouchableWithoutFeedback>
                                  <View style={styles.glancemodal}>
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
                                          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PersonProfile',{id:this.state.pid});this.setGlance(false);this.setModalVisible(false)}}>
                                            <Image
                                              style={[styles.profile,{borderRadius:40}]}
                                              source={{uri:this.state.dp}}
                                            />
                                          </TouchableOpacity >
                                          <View style={{flex:1,flexDirection:'column',marginTop:15,margin:5}}>
                                            <Text style={{textAlign:'left' ,color:'white',fontSize:20,fontWeight:'bold',fontFamily: 'sans-serif-light'}}>{decodeURI(this.state.fullname)}</Text>
                                            <Text style={{textAlign:'left',color:'white',fontFamily: 'sans-serif-light'}}>{this.state.title}</Text>
                                            <Text style={{textAlign:'left',color:'white',fontFamily: 'sans-serif-light'}}>Delhi</Text>  
                                          </View>
                                          {
                                            this.state.alreadysent?
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
                                          <View style={styles.glanceconnections}>
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
          <TouchableWithoutFeedback onPress= {()=>{this.setModalVisible(!this.state.modalVisible)}}>
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback>
                <View style={styles.modal}>
                  <View style={{flex:0.2,flexDirection:'row' ,backgroundColor:'#62c4ac'}}>
                    <View style={{flex:1,left:'50%',paddingTop:25}}>
                      <Text style={{flex:1,justifyContent:'center',alignItems:'center',textAlign:'center',color:'white',fontSize:20}}>LOCATION:{this.state.clusterPoint}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{this.setModalVisible(false)}}>
                      <Ionicons name="md-close" size={32} color="white" style={{padding:20,justifyContent:'flex-end'}} />
                    </TouchableOpacity>
                  </View>
                    <ScrollView style={{flex:1}}>
                      <FlatList
                        data={this.state.clusterData}
                        renderItem={({ item }) => (
                        <TouchableOpacity onLongPress={()=>{
                          // console.log(this.state.glanceVisible)
                          this.setGlance(true);
                          this._checkRequest(item.properties.item._id);
                          this.setState({
                          loadingModal:true,
                          // glanceVisible:true,
                          fullname:decodeURI(item.properties.item.fullname),
                          dp:item.properties.item.dp,
                          skills:item.properties.item.skill_set.sort(function(a, b){
                                      return a.skill_rating - b.skill_rating;
                                  }).reverse().filter((item,i)=> i < 5),
                          title:decodeURI(item.properties.item.title),
                          connections:item.properties.item.connections,
                          requests:item.properties.item.requests,
                          rating:item.properties.item.rating,
                          bio:decodeURI(item.properties.item.bio),
                          pid:item.properties.item._id
                          })
                            }}  
                          onPress={()=>{this.props.navigation.navigate('PersonProfile',{id:item.properties.item._id});this.setModalVisible(false)}}>
                          <View style = {styles.listContainer}>
                           <Image
                              style={[styles.profile,{borderRadius:40}]}
                              source={{uri:item.properties.item.dp}}
                            />
                            <View style={{flex:1,flexDirection:'column',marginLeft:10,paddingTop:10}}>
                              <Text style = {styles.name}>{decodeURI(item.properties.item.fullname)}</Text>
                              <Text style = {styles.last}>{decodeURI(item.properties.item.title)}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                        )}
                      />
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
      </MapView.Marker>
    )
  }
  _toggleEagle=()=>{
    fetch(this.props.userstore.baseURL + 'dashboard/eaglemode',{
      method: 'PATCH',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> (responseJson))
    this.setState((prevState)=>({
      eagleOn:!prevState.eagleOn
    }))
  }
   renderMarker = markers => {
    // console.log("-----------------------------------------")
    var latitude = parseFloat(markers.location.latitude)
    var longitude = parseFloat(markers.location.longitude) 
    var location = {latitude:latitude,longitude:longitude}
    // console.log(location)
    
      return <MapView.Marker key={markers.id} 
       coordinate={location}
      onPress={()=>{//console.log('pin');
      this.props.navigation.navigate('PersonProfile',{id:markers._id})}}>
      <CustomPin image={markers.dp}/>
      </MapView.Marker>
    
      
  };
    showDistance= (deltaLongitude,latitude) => {
    radiusEarth= 6400;
    let distance = Math.abs(deltaLongitude / 360 * (Math.cos(latitude) * 2 * (Math.PI) * radiusEarth));
    return distance;
  }
  renderDistance(){
    var distance = this.showDistance(this.state.longdelta,this.state.lat)
    this.showPeople(parseInt(distance,10));
    this.props.userstore.enterradius(distance);
    return(
      
      <View >
      <LinearGradient
      colors={['#3AB1A7' , '#49B274']}
      style={[styles.radius,{flexDirection:'row'}]}
      >
      <Image style={{height:25,width:25}} source={require('../../assets/range.png')}/>
      <Text style={{fontSize:13,color:'white',padding:10}}>Radius:{parseInt(distance,10)} KM</Text>
      </LinearGradient>
      </View>
      
      )
  }
  find_dimesions(layout){
    const {x, y, width, height} = layout;
    // console.log(x);
    // console.log(y);
    // console.log(width);
    // console.log(height);
  }
  render() {
    if(this.props.navigation.getParam('nav') == 'setup'){
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
      this.props.navigation.dispatch(resetAction);}
    return (
      <View style={{flex:1,flexDirection:'column'}}>
      <View style = {styles.header} onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout)}}>
      <Modal
                          animationType="fade"
                          transparent={true}
                          visible={this.state.glanceVisible}
                          onRequestClose={()=>{this.setGlance(!this.state.glanceVisible)}}
                          >
                            <TouchableWithoutFeedback onPress= {()=>{this.setGlance(!this.state.glanceVisible)}}>
                              <View style={styles.glancemodalBackground}>
                                <TouchableWithoutFeedback>
                                  <View style={styles.glancemodal}>
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
                                          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PersonProfile',{id:this.state.pid});this.setGlance(false);this.setModalVisible(false)}}>
                                            <Image
                                              style={styles.profile}
                                              source={{uri:this.state.dp}}
                                            />
                                          </TouchableOpacity >
                                          <View style={{flex:1,flexDirection:'column',marginTop:15,margin:5}}>
                                            <Text style={{textAlign:'left' ,color:'white',fontSize:20,fontWeight:'bold',fontFamily: 'sans-serif-light'}}>{decodeURI(this.state.fullname)}</Text>
                                            <Text style={{textAlign:'left',color:'white',fontFamily: 'sans-serif-light'}}>{this.state.title}</Text>
                                            <Text style={{textAlign:'left',color:'white',fontFamily: 'sans-serif-light'}}>Delhi</Text>  
                                          </View>
                                          {
                                            this.state.alreadysent?
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
                                          <View style={styles.glanceconnections}>
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
        <TouchableOpacity onPress={()=>{this.toggle()
        }}>
        <Ionicons name="md-menu" size={32} color="#3AB1A7" style={{ padding: hp('2%'),top: hp('0.1%') }} />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: 'center', justifyContent: 'center', padding: hp('2%'), color: '#3AB1A7', fontSize: hp('3.5%'), left: '40%',fontWeight: '300' ,fontFamily: 'Roboto' }}>Metvy</Text>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity
        onPress={()=>{this.props.navigation.navigate('MainProfile')}}
        title="Info"
        color="black"
      >
      <Image
                  style={styles.img}
                  source={{uri:this.props.userstore.dp}}
                />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>{this.props.navigation.navigate('MeetUp')}}
        title="Info"
        color="black"
      >
      <View style={{flex:1,flexDirection:'column'}}>
      <ImageBackground
                  resizeMode="contain"
                  style={styles.img}
                  source={require('../../assets/hand.png')}
                />
        {
        this.state.meetups == 0?
        <Text></Text>
        :
        <Text style={{ marginLeft: hp('4.5%'), marginTop: -23, color: '#62c4ac' }}>{this.state.meetups}</Text>
      }
        </View>      
      </TouchableOpacity>
      </View>
      </View>
      <DrawerLayout
         ref={drawer => {
            this.drawer = drawer;
          }}
          drawerWidth={(Dimensions.get('window').width)*0.7}
          drawerPosition={DrawerLayout.positions.Left}
          drawerType='front'
          drawerBackgroundColor='#FFFFFF'
          renderNavigationView={this.renderDrawer}>
          <View style={styles.container}>

        {
          this.state.location ?

            <View style={{ flex: 1 }}>
            {this.renderDistance()}
            <ClusteredMapView
          ref = {(r) =>this.map = r}
          style={{ flex: 1 }}
          data={this.state.markers}
          textStyle={{ color: '#65bc46' }}
          initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
          }}
          containerStyle={{ backgroundColor: 'white', borderColor: '#65bc46' }}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          showsMyLocationButton={true}
          minZoom = {4}
          showsUserLocation={true}
          onRegionChangeComplete={(e)=>{this.setState({longdelta:e.longitudeDelta,lat:e.latitude})}}
        ></ClusteredMapView>
        {this.renderShowLocationButton()}
        
        <TouchableOpacity style={this.state.eagleOn?styles.eagleOff:styles.eagleOn} onPress={()=>{this._toggleEagle()}}>
        {this.state.eagleOn?
        <Image resizeMode='contain' style={{height:25,width:25}}source={require('../../assets/eagleoff.png')}/>
        :
        <Image resizeMode='contain' style={{height:25,width:25}}source={require('../../assets/eagle.png')}/>
        }
        </TouchableOpacity>
        </View>
            :
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#62c4ac" />
            </View>
        }
        <BottomDrawer
        containerHeight={hp('75%')}
        downDisplay={hp('35%')}
        offset={hp('-1%')}
        startUp={this.state.startUp}
        onExpanded={()=>{this.setState({down:false,startUp:true})}}
        onCollapsed={()=>{this.setState({down:true,startUp:false})}}
      >
      {
        this.state.down?
      <Bottomdrawer navigation ={this.props.navigation} />
      :
      <Updrawer navigation ={this.props.navigation} />
      }
        
        </BottomDrawer>
        <ImageBackground
        resizeMode ="contain"
         style={{flex:0.2,flexDirection:'column',justifyContent:'center',alignItems:'center',marginLeft:wp('39%'),marginBottom:wp('3%'),width:wp('22'),height:hp('33%')}}
      source={require('../../assets/globeshape.png')}
      >
      <Image
      resizeMode ="contain"
      style={{width:wp('100%'),height:hp('6%'),marginBottom:hp('-17%')}}
      source={require('../../assets/globe.png')}
      />
      </ImageBackground>
        <ImageBackground
        resizeMode ="contain"
      style={{flex:0.1,width:'100%',height:'120%'}}
      source={require('../../assets/tabshape.png')}
      >
      <View style={{flex:1,width:Dimensions.get('window').width,flexDirection:'row',justifyContent:'space-around'}}>
      <TouchableOpacity onPress={()=>{this.setState({unread:false});this.props.navigation.navigate('ChatScreen')}}>
      {
        this.state.unread?
      <Image
      resizeMode ="contain"
      style={{width:10,height:10,marginBottom:-25,marginTop:20,marginLeft:-3,zIndex:3}}
      source={require('../../assets/unread.png')}/>
      :
      <View />
      }
      <Image
      resizeMode ="contain"
      style={{width:40,height:40,marginRight:'15%',marginTop: hp('1%')}}
      source={require('../../assets/inboxicon.png')}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MainProfile')}}>
      <Image
      resizeMode ="contain"
      style={{width:41,height:41,alignItems:'flex-start',marginLeft:'3%',marginTop:hp('1%')}}
      source={require('../../assets/profileicon.png')}
      />
      </TouchableOpacity>
      </View>
      </ImageBackground>
      </View>
        </DrawerLayout>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex:0,
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    //fontSize: 30,
    fontSize: hp('10%'),
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: '40%'
  },
  img:{
     borderRadius:15,
    // width:30,
    // height:30,
    height: hp('4%'), // 70% of height device screen
    width: wp('8%')  , // 80% of width device screen
    margin:10,
    marginTop:15,
    //padding: hp('2%')
  },
  header:{
    flex:0.1,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    paddingTop:Constants.statusBarHeight,
    position:'absolute',
    top:0,
    left:0,
    zIndex:2
  },
  drawercontainer:{
    flex:1,
    flexDirection:'column',
  },
  // img1:{
  //   borderRadius:50,
  //   width:70,
  //   height:70,
    
  // },
  img1:{
    // justifyContent:'flex-start',
    
    width:70,
    height:70,
    // margin:wp('5%'),
    // marginTop:hp('20%'),
    // marginRight:wp('10%'),
    marginBottom:'10%',
   // fontSize:20,
    // borderColor:'red',
    // borderWidth:5,
    borderRadius:35,
    // overflow:'hidden'
  },
  links:{
    fontSize:14,
    fontFamily: 'Roboto',
    color:'white',
    left:'15%',
    margin:10,
  },
  divider:{
    alignItems:'center',
    justifyContent:'center',
    width:'70%',
    height:2,
    backgroundColor:'white'
  },
  cluster:{
    width: 80,
  height: 80,
  borderRadius: 50,
  borderWidth:5,
  borderColor:'#62c4ac',
  backgroundColor: 'rgba(98, 196, 172,0.2)',
  justifyContent: 'center',
  alignItems: 'center'
  },
  modal:{
    flexDirection:'column',
    width: '90%',
    height: '65%',
    backgroundColor:'white',
  },
  modalBackground:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.5)'
    },
    profile:{
    justifyContent:'flex-start',
    alignItems:'center',
    borderRadius:50,
    width:80,
    height:80,
    borderWidth:5,
    borderColor:'white',
  },
  listContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingTop:10,
    paddingLeft:50,
    paddingRight:50,
    paddingBottom:10,
    marginTop:20,
  },
  myLocationButton: {
    backgroundColor: 'white',
    position: 'absolute',
    //bottom: 10,
    bottom: height*0.018,
    marginBottom: height*0.18,
    right: width*0.05,
    padding: 7,
    // elevation: 3,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth:2,
    borderColor:'#62c4ac',
    //marginBottom:hp('15%')
  },
  eagleOn:{
    backgroundColor: 'white',
    position: 'absolute',
    //bottom: 10,
    bottom: height*0.018,
    marginBottom: height*0.18,
    left: width*0.045,
    padding: 7,
    // elevation: 3,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth:2,
    borderColor:'#62c4ac',
    //marginBottom:hp('15%')
  },
   eagleOff:{
    backgroundColor: 'white',
    position: 'absolute',
    bottom: height*0.018,
    marginBottom: height*0.18,
    //left: 10,
    left: width*0.045,
    padding: 7,
    // elevation: 3,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth:2,
    borderColor:'#cbcbcb',
    //marginBottom:hp('15%')
  },
  radius:{
    flex:1,
    position: 'absolute',
    top: hp('13'),
    left: '32%',
    padding: hp('1'),
    elevation: 3,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderRadius: 50,
    borderWidth:2,
    borderColor:'#cbcbcb',
  },
  glancemodal:{
    flexDirection:'column',
    width: '90%',
    height: '65%',
    backgroundColor:'#ecf0f1',
    borderRadius:20,
  },
  glancemodalBackground:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.8)'
    },
  glanceconnections:{
    flex:0.3,
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
});