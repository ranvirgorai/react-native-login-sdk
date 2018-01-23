import { AsyncStorage } from 'react-native';
import { init, login, isLogin, register } from './src/api';

const UNKNOWN_ERROR = 'There was an unknown error.';

export default {
    init: (API_KEY, BASE_URL) => init(API_KEY, BASE_URL),
    login: (data) => login(data),
    isLogin: () => isLogin(),
    register: (data) => register(data)
}
