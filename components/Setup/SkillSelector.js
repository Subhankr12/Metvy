import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import Auto from './Autocomplete'
// You can import from local files
import skills from './skills'

// or any pure javascript modules available in npm

export default class SkillSelector extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Auto navigation = {this.props.navigation} items={skills} nav={this.props.navigation.getParam('nav')} counter={5}/>
      </View>
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
