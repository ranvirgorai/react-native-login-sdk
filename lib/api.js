import { AsyncStorage } from 'react-native';
var headers = {};
let craditionals = {};
async function init(API_KEY, BASE_URL = "http://192.168.1.25:1234/api/v2") {
    craditionals.API_KEY = API_KEY;
    craditionals.BASE_URL = BASE_URL;
    craditionals.TOKEN = await AsyncStorage.getItem("token") || "";
}


async function login(data) {
    if (!craditionals.BASE_URL) {
        return error("Module not initlised", "Base url not provided");
    }
    if ((!data.mobile || data.email || data.userId) && !data.password) {
        return error("Invalid Craditionals", "username or password is not provided");
    }
    const response = await fetch(craditionals.BASE_URL + "/auth/login", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    let allJson = await response.json();
    let json = allJson.result;
    // Object.keys(json).map(async function (key, index) {
    //     await AsyncStorage.setItem(key, json[key]+"");
    // });
    if (json) {
        craditionals.TOKEN = json.token;
        craditionals.user = json
        await AsyncStorage.setItem('token', json.token);
        await AsyncStorage.setItem('user', JSON.stringify(json));
        return json;
    } else {
        return error("Login failed", "No response from server");
    }
};

async function logout(data) {
    if (!craditionals.BASE_URL) {
        return error("Module not initlised", "Base url not provided");
    }
    const response = await fetch(craditionals.BASE_URL + "/auth/logout", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            "x-auth-token": craditionals.TOKEN
        })
    })
    if (!response) {
        craditionals.TOKEN = null;
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        return true;
    } else {
        return error("Login failed", "No response from server");
    }
};


async function register(data) {
    if (!craditionals.BASE_URL) {
        return error("Module not initised", "Base url not provided");
    }
    if ((!data.mobile || data.email || data.userId) && !data.password) {
        return error("Invalid Craditionals", "username or password is not provided");
    }
    try {
        const response = await fetch(craditionals.BASE_URL + "/auth/register", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                "x-auth-token": craditionals.TOKEN || ""
            })
        })
        let json = await response.json();
        if (json) {
            login(data);
        } else {
            return error("Login failed", "No response from server");
        }
    }
    catch (err) {
        return error("Login failed", "No response from server");
    }
};

async function isLogin(data) {
    try {
        craditionals.TOKEN = await AsyncStorage.getItem("token");
        if (craditionals.TOKEN)
            return true;
        else
            return error("Not Logined", "No token found");
    } catch (e) {
        return error(e, "No token found");
    }
}
async function getUser() {
    try {
        let user = await AsyncStorage.getItem("user");
        if (user) {
            craditionals.user = await JSON.parse(user);
            return craditionals.use;
        }
        else
            return error("Not Logined", "No token found");
    } catch (e) {
        return error(e, "No token found");
    }
}

function success() {

}

function error(err, reson) {
    let errObj = { error: err, reason: reson }
    console.error(errObj);
    throw new Error(errObj);
}


export { init, isLogin, login, register ,getUser};