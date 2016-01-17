import React from 'react-native';
import { VERSION } from '../utils/constants';

var {
  Component,
  View,
  Text
} = React;

export default class Welcome extends Component {
  render () {
    return (
      <View>
        <Text>Чтобы начать пользоваться приложением, вам необходимо зарегистрироватьсься</Text>
        <Text>Если у вас есть какие-то вопросы, вы можете задать их...</Text>
        <Text>Some more informations</Text>

        <Text>Версия программы: {VERSION}</Text>
      </View>
    );
  }
}