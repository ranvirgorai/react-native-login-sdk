import { AsyncStorage } from 'react-native';
let API_KEY = "", BASE_URL = "", TOKEN = "", headers = {};

function init(API_KEY, BASE_URL = "http://localhost:1234/api/v2") {
    API_KEY = API_KEY;
    BASE_URL = BASE_URL;
}

async function login(data) {
    if (!BASE_URL) {
        return error("Module not initised", "Base url not provided");
    }
    if ((!data.mobile || data.email || data.userId) && !data.password) {
        return error("Invalid Craditionals", "username or password is not provided");
    }
    const response = await fetch(BASE_URL + "/auth/login", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            "x-auth-token": TOKEN
        })
    })
    let json = await response.json();
    Object.keys(json).map(function (key, index) {
        await AsyncStorage.setItem(key, json[key])
    });
    if (json) {
        TOKEN = json.token;
        return true;
    } else {
        return error("Login failed", "No response from server");
    }
};


async function register(data) {
    if (!BASE_URL) {
        return error("Module not initised", "Base url not provided");
    }
    if ((!data.mobile || data.email || data.userId) && !data.password) {
        return error("Invalid Craditionals", "username or password is not provided");
    }
    try {
        const response = await fetch(BASE_URL + "/auth/register", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                "x-auth-token": TOKEN || ""
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
    TOKEN = await AsyncStorage.getItem("token");
    if (TOKEN)
        return true;
    else
        return error("Login failed", "No response from server");

}

function success() {

}

function error(err, reson) {
    let errObj = { error: err, reason: reson }
    console.error(errObj);
    throw new Error(errObj);
}


export { init, isLogin, login, register };