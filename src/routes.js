export default {

    welcome: {
        title: 'Добро пожаловать',
        initialRoute: true,
        component: require('./scenes/Welcome').default,
    },

    signin: {
        title: 'Вход',
        component: require('./scenes/SignIn').default
    },

    claimsList: {
        title: 'Список заявок',
        component: require('./scenes/ClaimsList').default
    },

    help: {
        title: 'Помощь',
        component: require('./scenes/Help').default
    }
}