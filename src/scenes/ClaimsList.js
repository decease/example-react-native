import React from 'react-native';
import { Button } from 'react-native-material-design';
import MOCK_CLAIMS from '../claims.data';

import AuthStore from '../stores/AuthStore';
import { API_URI } from '../utils/constants';

const {
  Component,
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
  PullToRefreshViewAndroid,
  DrawerLayoutAndroid,
  TouchableWithoutFeedback
} = React;

class ClaimItem extends Component {
  static propTypes = {
    claim: React.PropTypes.object.isRequired
  };

  _takeClaimClick = (claim) => {
    console.log(claim);
    if (this.props.onTakeClaim) {
      this.props.onTakeClaim(this.props.claim);
    }
  };

  _onClick = (claim) => {
    console.log(claim);
    if (this.props.onClick) {
      this.props.onClick(this.props.claim);
    }
  };

  render() {
    const { claim } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this._onClick(claim) } >
        <View style={styles.row}>
          <View style={styles.rowBody}>
            <Text>Откуда: {claim.sourceAddress}</Text>
            <Text>Куда: {claim.destinationAddress}</Text>
            <Text>Что доставлять: {claim.subject}</Text>
          </View>
          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <Button
                value="Взять заявку"
                onPress={() => this._takeClaimClick(claim) } 
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class ClaimsList extends Component {
  state = {
    dataSource: new ListView.DataSource({ 
      rowHasChanged: (row1, row2) => row1 !== row2
    }),
    isRefreshing: false
  };

  constructor(props) {
    super(props);
  }

  _onRefresh = () => {
    //TODO: move to Store
    const token = AuthStore.getState().token;

    this.setState({
      isRefreshing: true
    });

    fetch(API_URI + '/claims', {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log('claims list received');
        console.log(responseJSON);

        if (responseJSON.message) {
          console.warn(responseJSON.message);
        } else {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseJSON),
            isRefreshing: false
          });
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  _renderClaim(claim) {
    return (
      <ClaimItem claim={claim} />
    );
  }

  render () {
    return (
      <View>
        <Button onPress={() => this._onRefresh()} value='Refresh' />
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderClaim}
            style={styles.flex}
          />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    paddingRight: -16,
    paddingLeft: -16
  },
  btn: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  rowBody: {
    paddingTop: 16,
    paddingBottom: 16
  },
  flex: {
    flex: 1
  },
  row: { 
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.12)',
    backgroundColor: '#ffffff',
    borderRadius: 2,
    margin: 8,
    paddingLeft: 16,
    paddingRight: 16
  }
});