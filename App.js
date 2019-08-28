import * as React from 'react';
import { Text, View, StyleSheet,AppState } from 'react-native';
import { Constants } from 'expo';
import Main from './components/Main'
import store from './store'
import userstore from './userStore'
import {Provider} from 'mobx-react/native'
import rootstore from './rootStore'
import {LinearGradient} from 'expo'
import date from 'date-and-time'
import { Font ,Amplitude} from 'expo';
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
// You can import from local files

// or any pure javascript modules available in npm

export default class App extends React.Component {
  state={
    nowt: '',
    thent: '',
    appState: AppState.currentState,
    fontLoaded: false
  }
  async componentWillMount(){
    Amplitude.initialize('39691c0b6f6baa95d6d983ad3bc940f4')
    Amplitude.logEvent('Home');
    AppState.addEventListener('change', this._handleAppStateChange);
    await Font.loadAsync({
      'open-sans-condensed': require('./assets/Fonts/OpenSansCondensed-Bold.ttf'),
      'Roboto': require('./assets/Fonts/Roboto-Regular.ttf'),
      'sans-serif-light': require('./assets/Fonts/OpenSans-Light.ttf')

    });

    this.setState({ fontLoaded: true });
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background' ){
      console.log('App has come to the Background!')
      const now = new Date();
      this.setState({ nowt: date.format(now, 'YYYY/MM/DD HH:mm:ss') });
      var ms = moment(this.state.nowt, "DD/MM/YYYY HH:mm:ss:ms").diff(moment(this.state.thent, "DD/MM/YYYY HH:mm:ss:ms"));
      var d = moment.duration(ms);
      var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss:ms");
      console.log(s);
    }
    if(nextAppState === 'active' ){
      const then = new Date();
    this.setState({thent : date.format(then, 'YYYY/MM/DD HH:mm:ss')});
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <Provider style={styles.container} rootstore={rootstore} store={rootstore.store} userstore={rootstore.userstore} >
            <Main />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});



/*import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import Main from './components/Main'
import store from './store'
import userstore from './userStore'
import {Provider} from 'mobx-react/native'
import rootstore from './rootStore'
import {LinearGradient} from 'expo'

// You can import from local files

// or any pure javascript modules available in npm

export default class App extends React.Component {
  render() {
    return (
      <Provider style={styles.container} rootstore={rootstore} store={rootstore.store} userstore={rootstore.userstore} >
            <Main />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});*/