import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView,FlatList, View, TouchableOpacity, Button,TextInput,ImageBackground,TouchableWithoutFeedback,Modal,ActivityIndicator,KeyboardAvoidingView} from 'react-native';
import {observer , inject} from 'mobx-react/native'
import {Constants} from 'expo';
import {Ionicons} from '@expo/vector-icons'
import {entername} from '../../userStore' 
import userstore from '../../userStore' 
import store from '../../store'
import { Header } from 'react-navigation';
import DateTimePicker from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
  import ScrollPicker from 'react-native-picker-scrollview';
  import moment from 'moment';

@inject('userstore','store')
@observer
export default class Registration extends Component{
	constructor(props){
		super(props);
		this.state={
      fullname:'',
      phone:'',
      email:'',
      dob:'Date of Birth',
			pass:'',
      message:'',
      loading:false,
      nameValidate:true,
      phoneValidate:true,
      emailValidate:true,
      passValidate:true,
      date:'',
      datepicker:false,
      gender:'Gender',
      modalVisible:false,
      modalVisibleDob:false,
      selDate:new Date(). getDate(),
    selMonth:new Date(). getMonth() + 1,
    selYear:new Date(). getFullYear(),
    myDate :''// new Date()
    ,overallDate:'',
    overallTime:''
		}
    this.refPass = React.createRef();
    this.refdob = React.createRef();
    this.refemail = React.createRef();
    this.refphone = React.createRef();
    this.handleChange = this.handleChange.bind(this);
	}
  /*_handledate(date){

  let today = new Date(date);

  today=today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-" +today.getDate();

    // console.log(today)
    this.setState({
      dob:today
    })
  // console.log(this.state.dob)
    this._canceldate()
  }*/
  handleChange(date) {
    this.setState({
       myDate: date
     }   
   )
   }
      _handledate(date){
        date=moment(date,'YYYY-MM-DD').format()
        if(isNaN(new Date(date).getTime())){
          this.setState({dob: 'Invalid Date'})
         // var today= 'Invalid Date'
         }
         else{
        var from = date; 
         var numbers = from.match(/\d+/g); 
         var today = new Date(numbers[0], numbers[1]-1,numbers[2]);
         today=today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-" +today.getDate();
         
      //  alert(date);
        this.setState({
          dob:today
        })
      }
      this._canceldate()
      }
   
     _canceldate(){
       this.setState({
         datepicker:false,
         modalVisibleDob: false
       })
     }
    
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setDobModalVisible(visible) {
    this.setState({modalVisibleDob: visible});
  }
  _onSubmit= async () => {
      var details ={
       /* fullname: encodeURI(this.props.userstore.name),
        dob: encodeURI(this.props.userstore.dob),
        email:encodeURI(this.props.userstore.email),
        phone:encodeURI(this.props.userstore.phone),
        password:encodeURI(this.props.userstore.pass),
        Gender:encodeURI(this.props.userstore.gender)*/
        phone: encodeURI(this.props.userstore.phone),
	      password: encodeURI(this.props.userstore.pass),
	      dob: encodeURI(this.props.userstore.dob),
	      email: encodeURI(this.props.userstore.email),
	      fullname: encodeURI(this.props.userstore.name)
      }

      var formBody = [];
      for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   // return await fetch(this.props.userstore.register, {
    return await fetch(this.props.userstore.baseURL + 'auth/register', {
              method: 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formBody
            }).then((response)=>response.json())
              .then((responseJson)=>{this._onSuccess(responseJson)})
          
  }
  _onSuccess=(responseJson)=>{
    this.setState({loading:false})
    if(responseJson.success){
      this.setState({message:"User Registered"})
      this.props.navigation.navigate('OTP')
  }
  else {
    this.setState({message:responseJson.message})
  }
  }
  validate(text,type){
    alph= /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/
    ph = /^\d{3}\d{3}\d{4}$/
    email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(type == 'name'){
      if(alph.test(text) && text != ''){
        this.setState({
          nameValidate:true
        })
      }
      else{
        this.setState({
          nameValidate:false
        })
      }
    }
    else if(type == 'phone'){
      if(ph.test(text) && text !=''){
        this.setState({
          phoneValidate:true
        })
      }
      else{
        this.setState({
          phoneValidate:false
        })
      }
    }
    else if(type == 'email'){
      if(email.test(text) && text !=''){
        this.setState({
          emailValidate:true
        })
      }
      else{
        this.setState({
          emailValidate:false
        })
      }
    }
    else if(type == 'pass'){
      if(text !=''){
        this.setState({
          passValidate:true
        })
      }
      else{
        this.setState({
          passValidate:false
        })
      }
    }
  }
  someOtherFunc(){
    this.sp.scrollToIndex(2);   
    let selectedValue = this.sp.getSelected(); 
}
	render(){
    var maxDate= new Date()
    var name = this.state.fullname
    var email = this.state.email
    var dob = this.state.dob
    var pass = this.state.pass
    var phone = this.state.phone
    const { entername } = this.props.userstore;
    const { user } = this.props.store;
		return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
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
            <View style={{flex:0.1,flexDirection:'row',padding:20 ,backgroundColor:'#62c4ac'}}>
              <View style={{flex:1,left:'30%'}}>
              <Text style={{flex:1,justifyContent:'center',alignItems:'center',textAlign:'center',color:'white',fontSize:20}}>Select Gender</Text>
              </View>
              <TouchableOpacity onPress={()=>{this.setModalVisible(false)
                }}>
                <Ionicons name="md-close" size={32} color="white" style={{justifyContent:'flex-end'}} />
              </TouchableOpacity>
              </View>
              <ScrollView style={{flex:1,paddingTop:Constants.statusBarHeight}}>
              <FlatList
              data={["male","female"]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{this.setState({gender:item}); this.setModalVisible(false)}}>
                <View style = {styles.listContainer}>
                <Text style={{fontSize:20}}>{item}</Text>
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
      <ScrollView style={styles.container} >
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
      <Modal
                      animationType={'fade'}
                      transparent={true}
                      onRequestClose={() => {this.setDobModalVisible(!this.state.modalVisibleDob)}}
                      visible={this.state.modalVisibleDob}>
            <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                        <ScrollPicker
              ref={(sp) => {this.sp = sp}}
            //  selectedValue={this.state.selYear}
              dataSource={[
                '1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010'
              ]}
              selectedIndex={0}
              itemHeight={50}
              wrapperHeight={150}
              wrapperColor="#fafafa"
              highlightColor="#d8d8d8"
              renderItem={(data, index, isSelected) => {
                return(
                  <View>
                    <Text >{data}</Text>
                  </View>
                )
              }}
              onValueChange={(data, selectedIndex) => {
                this.setState({selYear: data},
                  this.handleChange(moment(this.state.selYear+'-'+this.state.selMonth+'-'+this.state.selDate,'YYYY-MM-DD').format())
                )
            }}
            />
            <ScrollPicker
              ref={(sp) => {this.sp = sp}}
            //  selectedValue={this.state.selMonth}
              dataSource={[
               /*'January',
               'February',
               'March',
               'April',
               'May',
               'June',
               'July',
               'August',
               'September',
               'October',
               'November',
               'December'*/
               '1','2','3','4','5','6','7','8','9','10','11','12'
              ]}datepicker
              selectedIndex={0}
              itemHeight={50}
              wrapperHeight={150}
              style={{borderRadius:20}}
              wrapperColor="#fafafa"
              highlightColor="#d8d8d8"
              renderItem={(data, index, isSelected) => {
                return(
                  <View>
                    <Text >{data}</Text>
                  </View>
                )
              }}
              onValueChange={(data, selectedIndex) => {
                this.setState({selMonth: data},
                  this.handleChange(moment(this.state.selYear+'-'+this.state.selMonth+'-'+this.state.selDate,'YYYY-MM-DD').format())
                )
            }}
            />
             <ScrollPicker
              ref={(sp) => {this.sp = sp}}
              dataSource={[
                '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'
              ]}
             // selectedValue={this.state.selDate}
              selectedIndex={0}
              itemHeight={50}
              wrapperHeight={150}
              wrapperColor="#fafafa"
              highlightColor="#d8d8d8"
              renderItem={(data, index, isSelected) => {
                return(
                  <View>
                    <Text >{data}</Text>
                  </View>
                )
              }}
              onValueChange={(data, selectedIndex) => {
                //this.updateState(data.getDate())
                this.setState({selDate: data},
                  this.handleChange(moment(this.state.selYear+'-'+this.state.selMonth+'-'+this.state.selDate,'YYYY-MM-DD').format())
                )
            }}
            />
            </View>
            <TouchableOpacity onPress={()=>this._handledate(this.state.selYear+'-'+this.state.selMonth+'-'+this.state.selDate)} style={{top: -hp('5%'),width: wp('80%'),height: hp('5%'),backgroundColor: '#62c4ac'}}><Text style={{alignSelf: 'center', padding: 5}}>ok</Text></TouchableOpacity>
            </View>
            </Modal>
        <KeyboardAvoidingView style={styles.formContainer} keyboardVerticalOffset = {Header.HEIGHT + Constants.statusBarHeight} behavior="padding" enabled>
        <Text  style = {{marginTop:140,marginBottom:60,color:'grey'}}>Tell us a little bit about yourself</Text>
        <Text style={{color:'#f94a4a'}}>{this.state.message}</Text>
            <TextInput 
            placeholder="Full Name"
            placeholderTextColor='#62c4ac'
            onChangeText={(fullname)=>{this.validate(fullname,"name");this.setState({fullname})}}
            value={this.state.fullname}
            onSubmitEditing={()=>{this.validate(this.state.fullname,"name")}}
            style={this.state.nameValidate != ''?styles.form:styles.formIncorrect}
            >
            </TextInput>
            <TouchableOpacity 
            ref={this.refdob}
            onPress={()=>{/*this.setState({datepicker:true})*/this.setDobModalVisible(true)}}
            value={this.state.dob}
            onSubmitEditing={()=>{this.refemail.current.focus()}}
            style={styles.form}
            >
            <Text style={{color:'#62c4ac' ,paddingTop:4,paddingBottom:4, textAlign:'left'}}>{dob}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{this.setModalVisible(true)}}
            style={styles.form}
            >
            <Text style={{color:'#62c4ac' ,paddingTop:4,paddingBottom:4, textAlign:'left'}}>{this.state.gender}</Text>
            </TouchableOpacity>
            
            <DateTimePicker maximumDate={maxDate} style={{backgroundColor:'green'}} isVisible={this.state.datepicker} onConfirm={(date)=>{this._handledate(date)}} onCancel={()=>{this.setState({datepicker:false})}}/>
            <TextInput 
            placeholder="Email"
            ref={this.refemail}
            placeholderTextColor='#62c4ac'
            keyboardType="email-address"
            onChangeText={(email)=>{this.validate(email,"email");this.setState({email})}}
            value={this.state.email}
            onSubmitEditing={()=>{this.refphone.current.focus()}}
            style={this.state.emailValidate?styles.form:styles.formIncorrect}
            >
            </TextInput>
            <TextInput 
            ref={this.refphone}
            placeholder="Phone Number"
            keyboardType="numeric"
            placeholderTextColor='#62c4ac'
            onChangeText={(phone)=>{this.validate(phone,"phone");this.setState({phone})}}
            onSubmitEditing={()=>{this.refPass.current.focus()}}
            value={this.state.phone}
            style={this.state.phoneValidate?styles.form:styles.formIncorrect}
            >
            </TextInput>
            <TextInput 
            ref={this.refPass}
            placeholder="Password"
            placeholderTextColor='#62c4ac'
            secureTextEntry={true}
            onChangeText={(pass)=>{this.validate(pass,"pass");this.setState({pass})}}
            value={this.state.pass}
            style={this.state.passValidate?styles.form:styles.formIncorrect}
            >
            </TextInput>
            </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                if(this.state.nameValidate && this.state.emailValidate && this.state.phoneValidate && this.state.passValidate){
                this.setState({loading:true})
                this.props.userstore.enter(this.state.fullname);
                this.props.userstore.enterphone(phone);
                this.props.userstore.enteremail(email);
                this.props.userstore.enterpass(pass);
                this.props.userstore.enterdob(this.state.dob);
                this._onSubmit();
              }
              else{
                this.setState({
                  message:'Enter the fields correctly'
                })
              }
              }}
              >
                <Text textAlign='center' style={styles.text} > NEXT </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
          </ImageBackground>
			);
	}
}
const styles = StyleSheet.create({
   container:{
     flex:1,
     
   },
   formContainer:{
  	flex:3,
    justifyContent:'center',
    alignItems:'center',
    
  },
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  form:{
  	backgroundColor:'white',
  	color:'#62c4ac',
  	marginBottom:20,
    margin:10,
    padding:10,
    width:wp('80%'),
    shadowOffset:{  width: 20,  height: 20,  },
    shadowColor: 'green',
    shadowOpacity: 1.0,
    elevation: 5
  },
  formIncorrect:{
    backgroundColor:'white',
    color:'#62c4ac',
    borderWidth:1,
    marginBottom:20,
    margin:10,
    padding:10,
    borderColor:'#f94a4a',
    width:wp('80%'),
    shadowOffset:{  width: 20,  height: 20,  },
    shadowColor: 'green',
    shadowOpacity: 1.0,
    elevation: 5
  },
  button: {
  	alignItems:'flex-end',
    marginBottom: 30,
    backgroundColor: '#62c4ac',
    paddingLeft: 80,
    paddingRight:80,
    padding:10,

  },
  text:{
    alignItems:'center',
  	color:'white',
	},
  modal:{
    flexDirection:'column',
    width: '60%',
    height: '45%',
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
    borderRadius:80,
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
    marginTop:20
  },
  popup: {
    flexDirection:'row',
    backgroundColor: '#62c4ac',
    // alignItems:"center",
    // justifyContent:'center',
    // marginTop: 80,
    width: '90%',
    height: '30%',
    //marginHorizontal: 20,
    borderRadius: 20,
  },
  popupOverlay: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#00000057",
    flex: 1
  },
  popupContent: {
    // flexDirection:'row',
    // //alignItems: 'center',
    // height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
  
})