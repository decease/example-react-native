import React from 'react-native';
import AppStore from '../stores/AppStore';

var {
  Component,
  View,
  Text,
  StyleSheet
} = React;

export default class NotLoginLabel extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
          Это другая страница! SignIn!
        </Text>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    
  }
});