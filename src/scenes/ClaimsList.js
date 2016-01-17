import React from 'react-native';
import { Card, Button } from 'react-native-material-design';
import MOCK_CLAIMS from '../claims.data';

var {
  Component,
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
  DrawerLayoutAndroid
} = React;

export default class ClaimsList extends Component {
  state = {
    dataSource: new ListView.DataSource({ 
      rowHasChanged: (row1, row2) => row1 !== row2
    }),
    loaded: false,
  };

  fillList() {
    this.setState({ 
      dataSource: this.state.dataSource.cloneWithRows(MOCK_DATA),
      loaded: true, 
    });
  }

  renderClaim(claim) {
    return (
      <Card style={styles.container}>
        <Card.Body>
          <Text>Откуда: {claim.sourceAddress}</Text>
          <Text>Куда: {claim.destinationAddress}</Text>
          <Text>Что доставлять: 
          {claim.subject}</Text>
        </Card.Body>
      </Card>
    );
  }

  render () {
    return (
      <View>
        <Button 
          value="Загрузить заявки"
          onPress={this.fillList.bind(this)} 
        />
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderClaim}
          style={styles.listView} 
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
   //flex: 1,
   //flexDirection: 'row',
   //justifyContent: 'center',
   //alignItems: 'center',
   //backgroundColor: '#F5FCFF'
  }
});