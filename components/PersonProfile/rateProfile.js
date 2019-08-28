
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Button,
    ImageBackground,
    TextInput,
    Modal,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import ProgressCircle from 'react-native-progress-circle'
import { ImagePicker, Constants } from 'expo';
import userstore from '../../userStore'
import store from '../../store'
import { HeaderBackButton, NavigationAction,Header } from 'react-navigation'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-ratings';
// import { TextInput } from 'react-native-gesture-handler/GestureHandler';

@inject('userstore', 'store')
@observer

export default class rateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dp: '',
            skills: [],
            ratings: '',
            skill:'',
            loading:true
        }
    }
    _onSubmit= async () => {
      var details ={
        skill_name:this.state.skill,
        rated_id:this.props.navigation.getParam('id'),
        rate:this.state.ratings,
        comment:this.state.value
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // return await fetch(this.props.userstore.ratings, {
    return await fetch(this.props.userstore.baseURL + 'profile/ratings', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':this.props.userstore.jwt
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>{console.log(responseJson);this._onSuccess(responseJson)})
          
  }
  _onSuccess=(responseJson)=>{
    this.setState({loading:false})
    if(responseJson.success){
        this.props.navigation.navigate('Home')
    }
  }
    componentWillMount = async () => {
        url = 'http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/view/'
        pid = this.props.navigation.getParam('id')
        compUrl = url + pid;
        let profile = await fetch(compUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.props.userstore.jwt
            },
        }).then((response) => response.json())
            .then(responseJson => {this.setState({
            dp: responseJson.dp,
            skills: responseJson.skill_set,
            fullname: decodeURI(responseJson.fullname),
        })})
            this.setState({loading:false})
        
    }
    render() {
        return (
            <ImageBackground source={require('../../assets/Background.png')} style={{ height: '100%', width: '100%' }}>
                <ScrollView style={{ backgroundColor: 'transparent', tintColor: 'transparent' }}>
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
                    <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                        <Image style={styles.profile} source={{ uri: this.state.dp }} />
                        <Text style={styles.name}>{this.state.fullname}</Text>
                        <Text style={styles.skills}>{this.state.skill}</Text>
                    </View>
                    <ScrollView horizontal={true}>
                    <View style={styles.suggestions}>
                      {
                        this.state.skills.map((key)=>{
                          return(
                            <View key={key} style={styles.skills}>
                              <TouchableOpacity onPress={()=>{this.setState({skill:decodeURI(key.skill_name)})}}>
                              <View style={styles.chipsodd}>
                              <Text style={{textAlign:'center',color:'#62c4ac'}}>{decodeURI(key.skill_name)}</Text>
                            </View>
                            </TouchableOpacity>
                            </View>
                          )
                        })
                      }
                  </View>
                  </ScrollView>
                    <Rating
                        type='custom'
                        ratingColor='#62c4ac'
                        ratingBackgroundColor='white'
                        ratingCount={5}
                        imageSize={50}
                        onFinishRating={(e)=>{this.setState({ratings:e})}}
                        style={{ paddingVertical: 15 }}
                        showRating={true}
                        fractions={1}
                    />
                    <KeyboardAvoidingView style = {styles.container} keyboardVerticalOffset = {Header.HEIGHT + Constants.statusBarHeight} behavior="padding" enabled>
                    <TextInput multiline={true} placeholder="Type a comment" type='text' style={styles.textinput} onChangeText={(e) => this.setState({ value: e })} 
                        value={this.state.value}
                    />
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        marginBottom: 30,
                        backgroundColor: '#62c4ac',
                        paddingLeft: 80,
                        paddingRight: 80,
                        padding: 10,
                        margin: 30
                    }}
                        onPress={() => {this.setState({loading:true});this._onSubmit()  }}>
                        <Text style={{ justifyContent: 'center', alignItems: "center", textAlign: 'center', color: 'white' }}>
                            NEXT
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    textinput: {
        //justifyContent: 'center',
        textAlignVertical: 'top',
        backgroundColor: 'white',
        color: 'green',
        margin: 20,
        padding: 10,
        // width:300,
        height: hp('25%'), // 70% of height device screen
        width: wp('85%'), // 80% of width device screen
        alignSelf: 'center',
        elevation: 5
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: 'bold'
    },
    skills: {
        marginTop: 10,
        fontSize: 23,
        color: "#62c4ac",
        fontWeight: 'bold'
    },

    profile: {
        justifyContent: 'flex-start',
        borderRadius: 80,
        width: 100,
        height: 100,
        margin: 20,
        marginTop: 140,
        marginRight: 30,
        borderColor: '#62c4ac',
        borderWidth: 5
    },
    chipsodd: {
        padding: 10,
        paddingRight: 15,
        paddingLeft: 15,
        margin: 10,
        borderColor: '#62c4ac',
        borderRadius: 30,
        borderWidth: 3,
    },
    suggestions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});

 // <ScrollView style={{ flex: 1.5 }} >
 //                        <View style={styles.suggestions}>
 //                            {this.renderSkills()}
 //                        </View>
 //                    </ScrollView>
