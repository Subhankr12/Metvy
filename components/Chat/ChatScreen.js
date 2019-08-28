import * as React from 'react';
import { Text, View, Button, StyleSheet, FlatList,Image,TouchableOpacity ,ScrollView,TextInput,ImageBackground} from 'react-native';
import {Ionicons,Entypo} from '@expo/vector-icons'
import {Constants} from 'expo'
import{observer,inject} from 'mobx-react/native'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('userstore')
@observer
export default class ChatScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    data:[],
    searchInput:'',
    name:''
  };
  }
  
  componentWillMount = async() =>{
    //let data = await fetch(this.props.userstore.recentChats, {
      let data = await fetch(this.props.userstore.baseURL + 'profile/recentChats', {
              method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
            }).then((response)=>response.json())
              .then((responseJson)=>(responseJson))
              data = data.filter(function(el){
                return el.user.id != null || el.id != null;
              })
              this.setState({data:data})
              console.log(data);
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
       <Text style={{flex:1,textAlign:'center',justifyContent:'center',color:'#777777', fontSize: hp('3%')/*,left:'50%'*/,marginLeft:wp('5%')}}>Chat</Text>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Connections')}} style={{right:wp('8%')}}>
           <Image style={{resizeMode: 'contain',height:hp('6%'),width:wp('6%'),paddingLeft:0,paddingRight:20}} source={require('../../assets/connection.png')}/>
           </TouchableOpacity>
           <TouchableOpacity style={{right:wp('4%')}} onPress={()=>{this.props.navigation.navigate('MeetUp')}}>
           <Image style={{resizeMode: 'contain',height:hp('6%'),width:wp('8%'),paddingLeft:0,paddingRight:20}} source={require('../../assets/handtrans.png')} />
      </TouchableOpacity>
      </View>
        </View>
        <View style={styles.input}>
        <TextInput placeholder="Search Chats"type = 'text' style={styles.textinput} onChangeText = {(e)=>this.setState({searchInput:e})}
        value={this.state.value}
         />
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
              let id = this.props.userstore.pid == item.id._id? item.user.id._id :item.id._id
              let name = this.props.userstore.pid == item.id._id? decodeURI(item.user.id.fullname):decodeURI(item.id.fullname)
              let dp = this.props.userstore.pid == item.id._id? item.user.id.dp:item.id.dp
            return(
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ChatView',{id:id,title:name,pic:dp})}}>
            <View style = {styles.listContainer}>
         <View style={{ borderRadius:50,width:70,height:70 ,backgroundColor:'rgba(0,0,0,0.1)' ,elevation:5}}>
         <Image
                  style={styles.profile}
                  source={{uri:dp}}
                />
                </View>
          <View style={{flex:1,flexDirection:'column',marginLeft:wp('2%'),paddingTop:hp('4%')}}>
          <Text style = {styles.name}>{name}</Text>
          <Text style = {styles.last}>{item.text}</Text>
          </View>
      </View>
          </TouchableOpacity>
          )}}
        />
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
    paddingTop:5,
    paddingLeft:wp('5%'),
    //paddingRight:50,
    paddingBottom:wp('3%'),
    marginTop:5
  },
  name: {
    fontSize: hp('3%'),
    padding:10,
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
    borderRadius:40,
    width:70,
    height:70,
    shadowColor: '#000',
    shadowOffset: { width: 70, height: 70 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
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
    marginTop:hp('2%'),
    padding:10
  },
  textinput:{
    backgroundColor:'white',
      color:'#62c4ac',
      margin:10,
      padding:10,
      width:wp('80%'),
      elevation:5
  },
});
