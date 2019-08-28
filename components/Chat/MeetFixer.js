import React from 'react'
import {KeyboardAvoidingView,TouchableOpacity ,Modal,StyleSheet , Text , View, Image,Button,TouchableWithoutFeedback,ImageBackground} from 'react-native'
import {Constants} from 'expo'
import { Header } from 'react-navigation';
import DateTimePicker from "react-native-modal-datetime-picker";
import ScrollPicker from 'react-native-picker-scrollview';
import {inject,observer} from 'mobx-react/native'
import moment from 'moment';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

@inject('userstore')
@observer
export default class ChatView extends React.Component {
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
  });
  constructor(props){
    super(props);
  this.state = {
    date:'',
    time:'',
    unix_time: 0,
    datepicker:false,
    timepicker:false,
    output: [],
    mm:'',
    yy:'',
    dd:'',
    h:0,
    min: 0,
    s: 0,
    selDate:new Date(). getDate(),
    selMonth:new Date(). getMonth() + 1,
    selYear:new Date(). getFullYear(),
    myDate :''// new Date()
    ,overallDate:'',
    overallTime:''
  };
  this.handleChange = this.handleChange.bind(this);
}

handleChange(date) {
//let showDate = moment(date).format('DD-MM-YYYY');
//let showDate =moment(date, 'DD-MM-YYYY');
  this.setState({
    myDate: date
  }   
)
}
   _handledate(date){
     
        if(date === 'invalid date'){
          this.setState({date: 'Invalid Date'})
         }
     else{var d= date
     var from = date; 
      var numbers = from.match(/\d+/g); 
      var dt = new Date(numbers[2], numbers[1]-1,numbers[0]);
   
    // console.log(d);
     this.setState({
       date:dt.toString().slice(4,15),
       overallDate: date
     })}
   /*  var  dateTime = new Date(d).getTime()/1000;
    console.log(dateTime);
   this.setState({
     unix_time: dateTime
   })*/
     if(this.state.time === '')
     this.state.timepicker= true
     this._canceldate()
   }

  _canceldate(){
    this.setState({
      datepicker:false
    })
  }
   _handletime(time){
     var date = new Date(time);
     this.setState({time:'at '+ date.toString().slice(16,21)});
       if(this.state.date !== '' && this.state.time !== '')
       {
         this.setState({
           overallTime: date.toString().slice(16,21)})
       }
       if(this.state.date === '')
       this.state.datepicker= true
     this._canceltime()
   }
  _canceltime(){
    this.setState({
      timepicker:false
    })
  }
  
setTime(){
  var overall= this.state.overallDate+' '+this.state.overallTime;
  //console.log(overall);
 var from = overall; 
 var numbers = from.match(/\d+/g); 
 var d = new Date(numbers[2], numbers[1]-1,numbers[0],numbers[3],numbers[4]);
//  console.log(d);
   this.setState({unix_time: Math.floor(new Date(d).getTime()/1000)},()=>{this.scheduleMeetup()});
  // console.log(this.state.unix_time)
  
}
  scheduleMeetup=async()=>{
      // console.log(this.props.navigation.getParam('id'))
      // console.log(this.props.navigation.getParam('zomato_id'))
      // console.log(this.props.navigation.getParam('venue'))
      // console.log(this.props.navigation.getParam('longitude'))
      // console.log(this.props.navigation.getParam('latitude'))
      // console.log(this.props.navigation.getParam('near'))
      // console.log(this.props.navigation.getParam('rating'))
      // console.log(this.state.unix_time)
      var details ={
        other_id : encodeURI(this.props.navigation.getParam('id')),
        zomato_id: encodeURI(this.props.navigation.getParam('zomato_id')),
        name: encodeURI(this.props.navigation.getParam('venue')),
        longitude: encodeURI(this.props.navigation.getParam('longitude')),
        latitude: encodeURI(this.props.navigation.getParam('latitude')),
        address: encodeURI(this.props.navigation.getParam('near')),
        rating: encodeURI(this.props.navigation.getParam('rating')),
        meetup_time: encodeURI(this.state.unix_time)
      }

    var formBody = [];
    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
 // let data =  await fetch(this.props.userstore.sendMeetupRequest, {
  let data =  await fetch(this.props.userstore.baseURL + 'dashboard/sendMeetupRequest', {
            method: 'POST',
            headers: {
              Accept: 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
              'x-access-token' : this.props.userstore.jwt
            },
            body: formBody
          }).then((response)=>response.json())
            .then((responseJson)=>console.log(responseJson))
            .then(this.props.navigation.goBack())
  }
  
  someOtherFunc(){
    this.sp.scrollToIndex(2);   
    let selectedValue = this.sp.getSelected(); 
}
functionCombined() {
  this.setTime();
}
  render(){
    
    return(
      <ImageBackground source={require('../../assets/Background.png')} style={{height:'100%',width:'100%'}}>
      <View style={styles.container}>
      <Modal
                      animationType={'fade'}
                      transparent={true}
                      onRequestClose={() => {this.setState({datepicker:false})}}
                      visible={this.state.datepicker}>
            <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                          
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
                this.handleChange(moment(this.state.selDate+'-'+this.state.selMonth+'-'+this.state.selYear,'DD-MM-YYYY').format())
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
              ]}
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
                this.handleChange(moment(this.state.selDate+'-'+this.state.selMonth+'-'+this.state.selYear,'DD-MM-YYYY').format())
                )
            }}
            />

              <ScrollPicker
              ref={(sp) => {this.sp = sp}}
            //  selectedValue={this.state.selYear}
              dataSource={[
                '2019',
                '2020',
                '2021'
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
                this.handleChange(moment(this.state.selDate+'-'+this.state.selMonth+'-'+this.state.selYear,'DD-MM-YYYY').format())
                )
            }}
            />
            </View>
            <TouchableOpacity onPress={()=>this._handledate(this.state.selDate+'-'+this.state.selMonth+'-'+this.state.selYear)} style={{top: -hp('5%'),width: wp('80%'),height: hp('5%'),backgroundColor: '#62c4ac'}}><Text style={{alignSelf: 'center', padding: 5}}>ok</Text></TouchableOpacity>
            </View>
            </Modal>
        <View style={{flex:10,flexDirection:'row',margin:50 ,marginTop:20}}>
        <Image
        resizeMode ="contain"
        style={{width:50,height:50}}
        source={require('../../assets/calendar1.png')}
        />
        <Text style={{flex:1,fontSize:15,color:'#62c4ac',justifyContent:'center',alignItems:'center',margin:10,top:5}} onPress={(item)=>{this.setState({datepicker:true})}} >Pick a Date</Text>
        </View>
        <View style={{flex:10,flexDirection:'row',margin:50,marginTop:20}}>
        <Image
        resizeMode ="contain"
        style={{width:50,height:50}}
        source={require('../../assets/clock1.png')}
        />
        <Text style={{flex:1,fontSize:15,color:'#62c4ac',justifyContent:'center',alignItems:'center',margin:10,top:5}} onPress={(item)=>{this.setState({timepicker:true})}}>Pick a Time</Text>
        </View>
        <View style={{flex:10,flexDirection:'row',margin:50,marginTop:20}}>
        <Image
        resizeMode ="contain"
        style={{width:50,height:50,color:'#62c4ac'}}
        source={require('../../assets/venue1.png')}
        />
        <Text style={{flex:1,fontSize:15,color:'#62c4ac',justifyContent:'center',alignItems:'center',margin:10,top:5}} onPress={()=>{this.props.navigation.navigate('Venue',{id:this.props.navigation.getParam('id')})}}>Pick a Venue</Text>
        </View>
        <View style={{flex:1,marginBottom:55}}>
        <Text style={{textAlign:'center' , fontSize:20 ,color:'#62c4ac'}}>{this.state.date}</Text>
        <Text style={{textAlign:'center' , fontSize:20}}>{this.state.time}</Text>
        <Text style={{textAlign:'center' , fontSize:20,color:'#62c4ac'}}>{this.props.navigation.getParam('venue')}</Text>
        </View>
        <View>
        <TouchableOpacity style={{alignItems:'center',
          marginBottom: 30,
          backgroundColor: '#62c4ac',
          paddingLeft: 80,
          paddingRight:80,
          padding:10,
          margin:30
        }} 
          onPress={()=>{this.functionCombined()}}>{/*{this.setTime();this.scheduleMeetup()}}>*/}
          <Text style={{justifyContent:'center',alignItems:"center",textAlign:'center',color:'white'}}>
            SCHEDULE MEETUP
          </Text>
        </TouchableOpacity>
        </View>
      {/*}  <DateTimePicker style={{backgroundColor:'green'}} isVisible={this.state.datepicker} onConfirm={(date)=>{this._handledate(date)}} onCancel={()=>{this.setState({datepicker:false})}}/>*/}
        <DateTimePicker is24Hour={false} mode='time' isVisible={this.state.timepicker} onConfirm={(time)=>{this._handletime(time)}} onCancel={()=>{this.setState({timepicker:false})}} />
      
      </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 20,
  },
   profile:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:80,
    width:30,
    height:30,
  },
  popup: {
    flexDirection:'row',
    backgroundColor: '#62c4ac',
    // alignItems:"center",
    // justifyContent:'center',
    // marginTop: 80,
    width: '90%',
    height: '30%',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  popupOverlay: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#00000057",
    flex: 1,
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
  // box:{
  //   backgroundColor:'white',
  //   padding:40
  // }
})
// <Modal
//                       animationType={'fade'}
//                       transparent={true}
//                       onRequestClose={() => {}}
//                       visible={this.state.datepicker}>
//             <View style={styles.popupOverlay}>
//                         <View style={styles.popup}>
//                           <View style={styles.popupContent}>
//               <ScrollPicker
//               ref={(sp) => {this.sp = sp}}
//               dataSource={[
//                 '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'
//               ]}
//               selectedIndex={0}
//               itemHeight={50}
//               wrapperHeight={100}
//               wrapperColor="#fafafa"
//               highlightColor="#d8d8d8"
//               renderItem={(data, index, isSelected) => {
//                 return(
//                   <View>
//                     <Text >{data}</Text>
//                   </View>
//                 )
//               }}
//               onValueChange={
//               (date)=>{
//                 this.setState({overallDate: date})
//               }}
//             />
//             <ScrollPicker
//               ref={(sp) => {this.sp = sp}}
//               dataSource={[
//                /*'January',
//                'February',
//                'March',
//                'April',
//                'May',
//                'June',
//                'July',
//                'August',
//                'September',
//                'October',
//                'November',
//                'December'*/
//                '1','2','3','4','5','6','7','8','9','10','11','12'
//               ]}
//               selectedIndex={0}
//               itemHeight={50}
//               wrapperHeight={100}
//               wrapperColor="#fafafa"
//               highlightColor="#d8d8d8"
//               renderItem={(data, index, isSelected) => {
//                 return(
//                   <View>
//                     <Text >{data}</Text>
//                   </View>
//                 )
//               }}
//               onValueChange={
//               (date)=>{
//                 this.setState({overallDate: this.state.overallDate+ '-' +date})
//               }}
//             />

//               <ScrollPicker
//               ref={(sp) => {this.sp = sp}}
//               dataSource={[
//                 '2019',
//                 '2020',
//                 '2021'
//               ]}
//               selectedIndex={0}
//               itemHeight={50}
//               wrapperHeight={100}
//               wrapperColor="#fafafa"
//               highlightColor="#d8d8d8"
//               renderItem={(data, index, isSelected) => {
//                 return(
//                   <View>
//                     <Text >{data}</Text>
//                   </View>
//                 )
//               }}
//               onValueChange={
//               (date)=>{
//                 this.setState({overallDate: this.state.overallDate+ '-' +date})
//               }}
//             />

//             </View>
//             <View style={styles.popupButtons}>
//                             <TouchableOpacity onPress={() => {this.setModalVisible(false) }} style={styles.btnClose}>
//                               <Text>Close</Text>
//                             </TouchableOpacity>
//                           </View>
//             </View>
//             </View>
//             {this._handledate(this.state.overallDate)}
//             </Modal>