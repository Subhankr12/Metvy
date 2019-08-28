import * as React from 'react';
import { Text, View, Button, StyleSheet, FlatList,Image,TouchableOpacity ,ScrollView,TextInput,ImageBackground,ActivityIndicator} from 'react-native';
import {Ionicons,Entypo} from '@expo/vector-icons'
import {Constants} from 'expo'
import {inject,observer} from 'mobx-react/native'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
@inject('userstore')
@observer
export default class Venue extends React.Component {
  state = {
    data:[
      {
        name:'Hotel ABC',
        last:'Near Delhi',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'Hotel ABCDE',
        last:'Near Delhi',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {name:'Hotel DEF',
      last:'Near Delhi',
      pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'Hotel ABCaef',
        last:'Near Delhi',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'Hotel ABCsdvsd',
        last:'Near Delhi',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {name:'Hotel ABCaw',
      last:'Near Delhi',
      pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'Hotel ABC12',
        last:'Near Delhi',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {
        name:'Hotel AB4C',
        last:'Near Delhi',
        pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
      {name:'Hotel ABC1',
      last:'Near Delhi',
      pic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      }
    ],
    searchInput:'',
    other_user:'',
    output:[],
    loading:true,
  };
  componentWillMount= async()=> {
    var details ={
        id:encodeURI(this.props.navigation.getParam('id'))
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
  //  let data = await fetch(this.props.userstore.getRestaurantData, {
    let data = await fetch(this.props.userstore.baseURL + 'profile/getRestaurantData', {
          method: 'POST',
          headers: {
            Accept: 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token' : this.props.userstore.jwt
          },
          body:formBody
        }).then((response)=>response.json())
          .then((responseJson)=>{console.log(responseJson);return (responseJson.nearby_restaurants)})
    this.setState({data:data,loading:false})
  }
  render() {
    return (
      <ImageBackground source= {require('../../assets/Background.png')} style={{height:'100%', width:'100%'}}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
        onPress={() => this.props.navigation.goBack(null)}
        >
        <Ionicons name="md-arrow-back" color="#777777"size={28} style={{paddingLeft:20}}  />
        </TouchableOpacity>
       <Text style={{flex:1,textAlign:'center',justifyContent:'center',color:'#777777',fontSize:hp('3%'),left:'50%',marginLeft:10}}>Venue</Text>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Connections')}} style={{paddingRight:15}}>
           <Image style={{width:28,height:28,paddingLeft:0,paddingRight:20,paddingTop:5}} source={require('../../assets/connection.png')}/>
           </TouchableOpacity>
           <TouchableOpacity style={{paddingRight:15}} onPress={()=>{this.props.navigation.navigate('MeetUp')}}>
           <Image style={{width:35,height:35,paddingLeft:0,paddingRight:20,paddingTop:5}} source={require('../../assets/handtrans.png')} />
      </TouchableOpacity>
      </View>
        </View>
        <View style={styles.input}>
        <TextInput placeholder="Search Place"type = 'text' style={styles.textinput} onChangeText = {(e)=>this.setState({searchInput:e})}
        value={this.state.value}
         />
        </View>
        {
          this.state.loading?
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#62c4ac" />
          </View>
          :
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MeetFixer',{
              zomato_id:item.restaurant.id,
              venue:item.restaurant.name,
              near:item.restaurant.location.locality_verbose,
              longitude:item.restaurant.location.longitude,
              latitude:item.restaurant.location.latitude,
              rating:item.restaurant.user_rating.aggregate_rating,
              id:this.props.navigation.getParam('id')
            })}}>
            <View style = {styles.listContainer}>
            {console.log(item)}
          <View style={{flex:1,flexDirection:'column',marginLeft:10,paddingTop:10}}>
          <Text style = {styles.name}>{item.restaurant.name}</Text>
          <Text style = {styles.last}>{item.restaurant.location.locality_verbose}</Text>
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
    marginTop:20,
    margin:35,
    paddingBottom:20,
    backgroundColor:'white',
    elevation:4
  },
  name: {
    fontSize: 30,
    textAlign: 'left',
  },
  last:{
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
      color:'green',
      margin:10,
      padding:10,
      width:300,
      elevation:5
  },
});
