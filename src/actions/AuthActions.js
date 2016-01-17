import alt from '../utils/alt';

class AuthActions {
  signIn(username, password) {
    return {username, password};
  }

  signOut() {

  }
}

export default alt.createActions(AuthActions);