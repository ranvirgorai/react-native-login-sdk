import { init, login, isLogin, register,getUser } from './lib/api';
const UNKNOWN_ERROR = 'There was an unknown error.';

export default {
    init: (API_KEY, BASE_URL) => init(API_KEY, BASE_URL),
    login: (data) => login(data),
    register: (data) => register(data),
    isLogin,
    getUser
}

