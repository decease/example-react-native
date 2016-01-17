import React from 'react-native';
import { Card } from 'react-native-material-design';

var {
  Component,
  View,
  Text
} = React;

export default class Welcome extends Component {
  render () {
    return (
      <View>
        <Card>
          <Card.Body>
            <Text>Для того, чтобы начать пользоваться приложением, вам необходимо войти.</Text>
          </Card.Body>
        </Card>
      </View>
    );
  }
}