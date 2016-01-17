import alt from '../utils/alt';
import base64 from 'base-64';
import { AsyncStorage } from 'react-native';
import AuthActions from '../actions/AuthActions';
import { API_URI, CLIENT_ID, CLIENT_SECRET } from '../utils/constants';

const AUTH_DATA_KEY = '@Storage:auth_data';

class AuthStore {
  constructor() {
    this._loadToken();

    this.bindListeners({
      handleSignIn: AuthActions.SIGN_IN,
      handleSignOut: AuthActions.SIGN_OUT
    });
  }

  _loadToken = () => {
      AsyncStorage.getItem(AUTH_DATA_KEY).then((value) => {
          //TODO: 
          this.token = value.token;
          this.username = value.username;
      });
  };

  _setData = (token, username) => {
      const data = { token, username };
      this.token = token;
      this.username = username;
      AsyncStorage.setItem(AUTH_DATA_KEY, data);
  };

  handleSignIn(param) {
    const {username, password} = param;

    const data = "grant_type=password&username=" + username + "&password=" + password;
    const btoa_str = base64.encode(CLIENT_ID + ":" + CLIENT_SECRET);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa_str
    }

    fetch(API_URI + '/token', {
      method: 'post',
      headers: new Headers(headers),
      mode: 'cors',
      body: data
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);

        if (!responseJSON.error) {
          this._setData(responseJSON.access_token, username);
          console.warn(responseJSON.access_token);
        } else {
          console.warn(responseJSON.error, responseJSON.error_description);
        }
      })
      .catch((error) => {
        console.warn(error);
      })

    console.log('handleSignIn()');
  }

  handleSignOut() {
    console.log('handleSignOut()');
    //TODO
  }
}

export default alt.createStore(AuthStore, 'AuthStore');