import { AsyncStorage } from 'react-native';
import alt from '../utils/alt';

const THEME = '@Storage:theme';

class AppStore {
    constructor() {
        this._loadTheme();

        this.bindListeners({
            
        });
    }

    _loadTheme = () => {
        AsyncStorage.getItem(THEME).then((value) => {
            this.theme = value || 'paperTeal';
            AppActions.updateTheme(this.theme);
            SplashScreen.hide();
        });
    };
}

export default alt.createStore(AppStore, 'AppStore');
