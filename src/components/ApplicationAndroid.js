import React from 'react-native';
import { Card, Button } from 'react-native-material-design';
import Toolbar from './Toolbar';
import Navigate from '../utils/Navigate';
import Navigation from '../scenes/Navigation';

import SignIn from '../scenes/SignIn';

var routes = require('../routes');

var {
  Component,
  StyleSheet,
  ScrollView,
  DrawerLayoutAndroid,
  Navigator
} = React;

export default class ApplicationAndroid extends Component {
  static childContextTypes = {
    drawer: React.PropTypes.object,
    navigator: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      drawer: null,
      navigator: null
    };
  }

  getChildContext = () => {
    return {
      drawer: this.state.drawer,
      navigator: this.state.navigator
    }
  };

  setDrawer = (drawer) => {
    this.setState({
      drawer
    });
  };

  setNavigator = (navigator) => {
    this.setState({
      navigator: new Navigate(navigator)
    });
  };

  render () {
    const { drawer, navigator } = this.state;
    const navView = React.createElement(Navigation);

    console.log(routes);

    return ( 
      <DrawerLayoutAndroid 
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => {
                    if (drawer && navigator) {
                        return navView;
                    }
                    return null;
                }}
        ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}
        >
          {drawer &&
          <Navigator
            initialRoute={Navigate.getInitialRoute()}
            navigationBar={<Toolbar onIconPress={drawer.openDrawer} />}
            configureScene={() => {
                return Navigator.SceneConfigs.FadeAndroid;
            }}
            ref={(navigator) => { 
              !this.state.navigator ? this.setNavigator(navigator) : null 
            }}
            renderScene={(route) => {
              if (this.state.navigator && route && route.component) {
                return (
                  <ScrollView
                    style={styles.scene}
                    showsVerticalScrollIndicator={false}>
                    <route.component title={route.title} path={route.path} {...route.props} />
                  </ScrollView>
                );
              }
            }}
          />
          }
      </DrawerLayoutAndroid>
      );
  }
}

var styles = StyleSheet.create({
  scene: {
    marginTop: 56,
    paddingBottom: 56
  }
});