import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {KeyboardAvoidingView ,StyleSheet , Text , View, Image,Button,TouchableOpacity} from 'react-native'
import {Constants} from 'expo'
import {observer,inject} from 'mobx-react/native'
import SocketIOClient from 'socket.io-client';
import { Header } from 'react-navigation';
import {Entypo} from '@expo/vector-icons'

@inject('userstore')
@observer
export default class ChatView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    messages: [],
  }
  this.socket = SocketIOClient('http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/')
  this.socket.on('new_message' ,(data)=>{
    console.log(data);
      this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, data),
    }))
  })
  }
  
  
  //socket.onopen()
  static navigationOptions = ({navigation, screenProps})=>({
    headerTitle: (
      <View style={{flex:1,flexDirection:'row'}}>
      <Image style={styles.profile} source={{uri:navigation.getParam('pic')}} />
      <Text
        style={{flex:1 , marginLeft:10}}
      >
      {navigation.getParam('title')}
      </Text>
      </View>
    ),
    headerRight:(
      <View style={{flex:1,flexDirection:'row',margin:10}}>
      <TouchableOpacity
        onPress={()=>{navigation.navigate('MeetFixer',{id:navigation.getParam('id'),title:navigation.getParam('title'),pic:navigation.getParam('pic')})}}
        style={{marginRight:5}}
      >
      <Image
                  style={[styles.img,{width:28,height:28}]}
                  source={require('../../assets/meetfixer.png')}
                />
      </TouchableOpacity>
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
    )
  });
  componentWillMount=async()=> {
    let texts = await fetch(this.props.userstore.baseURL +"profile/getMessagesById/" + this.props.navigation.getParam('id'),{
      method: 'GET',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
    }).then((response)=>response.json())
    .then(responseJson=> responseJson)
    texts = texts.reverse();
    this.setState({
      messages: texts
    })
  }
 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    //console.log(this.state.messages)
  }
  _sendMessage(messages){
    // console.log(messages[0].text)
    this.socket.emit('new_message', {message :messages[0].text ,sender:this.props.userstore.pid,reciever:this.props.navigation.getParam('id')})
    
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
    
  }
  render() {
    return (
      <KeyboardAvoidingView style = {styles.container} keyboardVerticalOffset = {Header.HEIGHT + Constants.statusBarHeight} behavior="padding" enabled>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this._sendMessage(messages)}
        user={{
          id: this.props.userstore.pid,
        }}
        renderBubble={this.renderBubble}
      />
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e5e5e5',
    padding: 20,
  },
   profile:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    width:30,
    height:30,
  },
})
