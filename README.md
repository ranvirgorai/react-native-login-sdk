# react-native-login-sdk

## Getting started

`$ npm install react-native-login-sdk --save`


## Usage

### Initialize the react-native-login-sdk.

```javascript

import loginSDK from 'react-native-login-sdk';
loginSDK.init('TOKEN', 'BASE_URL');

```

### Login 

```javascript
let object = {
      mobile:"+91 122454646", or email or User Id
      password:"1234"
    }
    loginSDK.login(object).then((isLogin)=>{
        console.log("is Login",isLogin);
    })
```

### isLogin 

```javascript
    loginSDK.isLogin().then((isLogin)=>{
      console.log("is Login",isLogin);
   })
```

### Register 

```javascript
let object ={
      mobile:"+91 122454646", or email or User Id
      password:"1234"
    }
   loginSDK.register(object).then((isRegistred)=>{
      console.log("is registred",isRegistred);
   })
```