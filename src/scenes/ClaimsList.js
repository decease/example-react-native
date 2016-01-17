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

  _fillList() {
    this.setState({ 
      dataSource: this.state.dataSource.cloneWithRows(MOCK_DATA),
      loaded: true, 
    });
  }

  _takeClaim = (claim) => {
    console.log(claim);
  };

  _renderClaim = (claim) => {
    return (
      <Card style={styles.container}>
        <Card.Body>
          <Text>Откуда: {claim.sourceAddress}</Text>
          <Text>Куда: {claim.destinationAddress}</Text>
          <Text>Что доставлять: {claim.subject}</Text>
        </Card.Body>
        <Card.Actions position="right">
          <Button value="Взять заявку" onPress={() => this._takeClaim(claim) } />
        </Card.Actions>
      </Card>
    );
  };

  render () {
    let loadButton = <Text />;

    if (!this.state.loaded) {
      loadButton = (
        <Button
          value="Загрузить заявки"
          onPress={this._fillList.bind(this)} 
        />);
    }

    return (
      <View>
        { loadButton }
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this._renderClaim}
          style={styles.listView} 
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
  }
});