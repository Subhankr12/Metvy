import {observable ,action} from 'mobx'

export class UserStore{
  @observable baseURL = 'http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/'
 /* @observable coordinates='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/coordinates';
  @observable dashboard='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/show';
  @observable setLocationn='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/setLocation';
  @observable checkRequest='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/checkRequest';
  @observable eagleMode='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/eaglemode';
  @observable recentChats='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/recentChats';
  @observable getMessagesById='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/getMessagesById/';
  @observable Connections='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/connections';
  @observable Requests='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/requests';
  @observable deleteConnectionRequest='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/deleteConnectionRequest';
  @observable respondConnectionRequest='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/respondConnectionRequest';
  @observable sendMeetupRequest='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/sendMeetupRequest';
  @observable getMeetupScheduled='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/getMeetupScheduled';
  @observable getMeetupRequest='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/getMeetupRequest';
  @observable deleteMeetupRequest='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/deleteMeetupRequest';
  @observable deleteMeetupScheduled='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/deleteMeetupScheduled';
  @observable respondMeetupRequest='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/respondMeetupRequest';
  @observable getRestaurantData='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/getRestaurantData';
  @observable sendConnectionRequest='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/dashboard/sendConnectionRequest';
  @observable locationRecommenderSystem='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/locationRecommenderSystem';
  @observable profile='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/';
  @observable forgotpassword='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/auth/forgotpassword';
  @observable login='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/auth/login';
  @observable waitlist='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/auth/waitlist';
  @observable sendopt='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/auth/sendotp';
  @observable resendotp='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/auth/resendotp';
  @observable verifyotp='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/auth/verifyotp';
  @observable register='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/auth/register';
  @observable ratings='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/ratings';
  @observable bios='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/bio';
  @observable skill='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/skill';
  @observable interest='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/interests';
  @observable Dp='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/dp';
  @observable setLinkedIn='http://ec2-18-222-198-211.us-east-2.compute.amazonaws.com:8080/profile/setLinkedIn';*/
  @observable label = '';
  @observable eagle_mode =false;
  @observable phone='';
  @observable linkedin ='';
  @observable jwt = '';
  @observable dob = '';
  @observable email = '';
  @observable pid = '';
  @observable pass = '';
  @observable name='';
  @observable requests=0;
  @observable connections=0;
  @observable rating=0;
  @observable location='';
  @observable bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ipsum arcu, laoreet at nisi rhoncus, malesuada feugiat tellus. Maecenas leo ';
  @observable image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  @observable skills = {};
  @observable skillRate =[];
  @observable radius = 0;
  @observable latitude = 0;
  @observable longitude = 0;
  @observable dp ='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  @observable interests=[{}];
  constructor(rootStore){
    this.rootStore=rootStore
  }
  enter(e){
    this.name = e;
  }
  entereaglemode(e){
    this.eagle_mode = e;
  }
  enteremail(e){
    this.email=e;
  }
  enterdob(e){
    this.dob=e;
  }
  enterpass(e){
    this.pass=e;
  }
  enterphone(e){
    this.phone = e;
  }
  enterbio(e){
    this.bio=e;
  }
  changeimg(e){
    this.image = e;
  }
  enterlabel(e){
    this.label = e;
  }
  enterlocation(e){
    this.location=e;
  }
  enterskills(skill,rate){
      this.skills[skill] = rate;
  }
  enterjwt(e){
    this.jwt = e;
  }
  enterrequests(e){
    this.requests=e;
  }
  enterconnections(e){
    this.connections=e;
  }
  enterratings(e){
    this.rating=e;
  }
  enterpid(e){
    this.pid = e;
  }
  enterlinkedin(e){
    this.linkedin=e;
  }
  enterradius(e){
    this.radius = e;
  }
  enterlatlang(e,f){
    this.latitude =e;
    this.longitude =f;
  }
  enterdp(e){
    this.dp = e;
  }
  enterskillrate(e){
    this.skillRate=e;
  }
  enterinterests(e){
    // console.log(e)
    // var i =0;
    var temp = JSON.parse(JSON.stringify({'text': e}))
    // console.log(temp)
    this.interests.push(temp)
    //console.log(this.interests)
}
}
var userstore = new UserStore();
export default userstore;

