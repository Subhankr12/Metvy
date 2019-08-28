import { createStackNavigator, createAppContainer,HeaderBackButton ,createDrawerNavigator , DrawerNavigator } from 'react-navigation';
import React from 'react';
import {AsyncStorage} from 'react-native';
import OTP from '../components/Login/OTP';
import Registration from '../components/Login/Registration'
import Login from '../components/Login/Login';
import MainPage from '../components/Login/MainPage'
import ForgotPass from '../components/Login/ForgotPass';
import Setup from '../components/Setup/Setup'
import LinkedIn from '../components/Setup/LinkedIn'
import Interests from '../components/Setup/Interests'
import splash from '../components/Setup/splash'
import SkillSelector from '../components/Setup/SkillSelector'
import SkillRate from '../components/Setup/SkillRate'
import Rate from '../components/Setup/Rate'
import HomeScreen from '../components/Home/HomeScreen'
import Updrawer from '../components/Home/UpDrawer'
import MainProfile from '../components/Profile Setup/MainProfile'
import EditProfile from '../components/Profile Setup/EditProfile'
import ProfilePic from '../components/Profile Setup/ProfilePic'
import ProfileInfo from '../components/Profile Setup/ProfileInfo'
import Connections from '../components/Chat/Connections'
import PersonProfile from '../components/PersonProfile/PersonProfile'
import Bio from '../components/Profile Setup/Bio'
import ChatView from '../components/Chat/ChatView'
import ChatScreen from '../components/Chat/ChatScreen'
import MeetFixer from '../components/Chat/MeetFixer'
import InviteCode from '../components/Login/InviteCode'
import NewPass from '../components/Login/NewPass'
import MailingList from '../components/Login/MailingList'
import MeetUp from '../components/Chat/MeetUp'
import Venue from '../components/Chat/Venue'
import rateProfile from '../components/PersonProfile/rateProfile'
import demo from '../components/Chat/demo'
//import Autocomplete from '../components/Setup/Autocomplete'
import { observer, inject } from 'mobx-react/native';
import {Entypo} from '@expo/vector-icons'


const MainStack = createStackNavigator({
  /*demo:{
    screen:demo,
  },
  MeetFixer:{
    screen:MeetFixer,
  },
  Venue:{
    screen:Venue,
    navigationOptions:{
      header:null
    }
  },
   
  MeetUp:{
    screen:MeetUp,
    navigationOptions:{
      header:null,
    }
  },
  Register: {
    screen: Registration,
    navigationOptions:{
      header:null
    }
  },
  */
   Home:{
    screen:HomeScreen,
    navigationOptions:{
      header:null
    },
  },
  Updrawer:{
    screen:Updrawer,
    navigationOptions:{
      header:null
    },
  },
   LinkedIn:{
    screen:LinkedIn,
    navigationOptions:{
      header:null,
    }
    },
  PersonProfile:{
    screen:PersonProfile,
    navigationOptions:{
      header:null
    }
  },
  EditProfile:{
    screen: EditProfile,
    navigationOptions:{
      header:null,
    }
  },
  Setup: {
    screen: Setup,
    navigationOptions: {
      header: null,
    },
  },
  MeetFixer:{
    screen:MeetFixer,
  },
  Venue:{
    screen:Venue,
    navigationOptions:{
      header:null
    }
  },
   
  MeetUp:{
    screen:MeetUp,
    navigationOptions:{
      header:null,
    }
  },
   MainProfile:{
    screen:MainProfile,
    navigationOptions:{
      header:null,
    },
  },
  SkillSelector:{
    screen:SkillSelector,
    navigationOptions:{
      header:null,
    },
  },
    
  rateProfile:{
    screen:rateProfile,
    navigationOptions:{
      header:null
    }
  },
  
 
  Bio:{
    screen:Bio,
    navigationOptions:{
      header:null
    }
  },
  ProfileInfo:{
    screen:ProfileInfo,
    navigationOptions:{
      header:null
    }
  },
  ProfilePic:{
    screen:ProfilePic,
    navigationOptions:{
      header:null
    }
  },
  Interests:{
      screen: Interests,
      navigationOptions:{
        header:null
      }
    },  
   
 Rate:{
  screen:Rate,
  navigationOptions:{
    header:null
  },
 },
  
  splash:{
    screen:splash,
    navigationOptions: {
      header: null,
    },
  },
  SkillRate:{
    screen:SkillRate,
    navigationOptions:{
      header:null
    },
  },
  
  ChatScreen:{
    screen:ChatScreen,
    navigationOptions:{
      header:null,
    },
  },
  ChatView:{
    screen:ChatView,
  },
  
  Connections:{
    screen:Connections,
    navigationOptions:{
      header:null,
    },
  }

});
export const MainStackContainer = createAppContainer(MainStack);
const MainStackWithIntro = createStackNavigator({
   LinkedIn:{
    screen:LinkedIn,
    navigationOptions:{
      header:null,
    }
    },
   Setup: {
    screen: Setup,
    navigationOptions: {
      header: null,
  },
},
   Home:{
    screen:HomeScreen,
    navigationOptions:{
      header:null
    },
  },
  Updrawer:{
    screen:Updrawer,
    navigationOptions:{
      header:null
    },
  },
  PersonProfile:{
    screen:PersonProfile,
    navigationOptions:{
      header:null
    }
  },
  rateProfile:{
    screen:rateProfile,
    navigationOptions:{
      header:null
    }
  },
  MeetFixer:{
    screen:MeetFixer,
  },
  Venue:{
    screen:Venue,
    navigationOptions:{
      header:null
    }
  },
   
  MeetUp:{
    screen:MeetUp,
    navigationOptions:{
      header:null,
    }
  },
   MainProfile:{
    screen:MainProfile,
    navigationOptions:{
      header:null,
    },
  },
  SkillSelector:{
    screen:SkillSelector,
    navigationOptions:{
      header:null,
    },
  },
    
  Interests:{
      screen: Interests,
      navigationOptions:{
        header:null
      }
    }, 
  EditProfile:{
    screen: EditProfile,
    navigationOptions:{
      header:null,
    }
  },
 
  Bio:{
    screen:Bio,
    navigationOptions:{
      header:null
    }
  },
  ProfileInfo:{
    screen:ProfileInfo,
    navigationOptions:{
      header:null
    }
  },
  ProfilePic:{
    screen:ProfilePic,
    navigationOptions:{
      header:null
    }
  }, 
 Rate:{
  screen:Rate,
  navigationOptions:{
    header:null
  },
 },
  
  splash:{
    screen:splash,
    navigationOptions: {
      header: null,
    },
  },
  SkillRate:{
    screen:SkillRate,
    navigationOptions:{
      header:null
    },
  },
  
  ChatScreen:{
    screen:ChatScreen,
    navigationOptions:{
      header:null,
    },
  },
  ChatView:{
    screen:ChatView,
  },
  
  Connections:{
    screen:Connections,
    navigationOptions:{
      header:null,
    },
  }
});
export const MainStackWithIntroContainer = createAppContainer(MainStackWithIntro);
const LoginStack = createStackNavigator({
  MainPage:{
    screen: MainPage,
    navigationOptions:{
      header:null,
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  ForgotPass: {
    screen: ForgotPass,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: Registration,
    navigationOptions:{
      header:null
    }
  },
  OTP: {
    screen: OTP,
    navigationOptions: {
      header: null,
    },
  },
  InviteCode:{
    screen:InviteCode,
    navigationOptions:{
      header:null
    },
   },
   NewPass:{
    screen:NewPass,
    navigationOptions:{
      header:null
    },
   },
   MailingList:{
    screen:MailingList,
    navigationOptions:{
      header:null
    },
   },
});
export const LoginStackContainer = createAppContainer(LoginStack);
