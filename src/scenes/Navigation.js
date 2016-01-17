import React, { Component, PropTypes, View, Text, Image } from 'react-native';

import { Icon, Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design';

export default class Navigation extends Component {

    static contextTypes = {
        drawer: PropTypes.object.isRequired,
        navigator: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            route: null
        }
    }

    changeScene = (path, name) => {
        const { drawer, navigator } = this.context;

        this.setState({
            route: path
        });
        navigator.to(path, name);
        drawer.closeDrawer();
    };

    render() {
        const { route } = this.state;

        return (
            <Drawer theme='light'>
                <Drawer.Section
                    items={[{
                        icon: 'face',
                        value: 'Войти',
                        active: route === 'signin',
                        onPress: () => this.changeScene('signin'),
                        onLongPress: () => this.changeScene('signin')
                    }, {
                        icon: 'list',
                        value: 'Список заявок',
                        active: route === 'claimsList',
                        onPress: () => this.changeScene('claimsList'),
                        onLongPress: () => this.changeScene('claimsList')
                    }, {
                        icon: 'help',
                        value: 'Помощь',
                        active: route === 'help',
                        onPress: () => this.changeScene('help'),
                        onLongPress: () => this.changeScene('help')
                    }]}
                />
            </Drawer>
        );
    }
}

const styles = {
    header: {
        paddingTop: 16
    },
    text: {
        marginTop: 20
    }
};