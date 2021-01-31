import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBthvc---cKafxk5yQ7XiE5UPhrFj_VjfM",
    authDomain: "piprojekt-734f5.firebaseapp.com",
    projectId: "piprojekt-734f5",
    storageBucket: "piprojekt-734f5.appspot.com",
    messagingSenderId: "433144229109",
    appId: "1:433144229109:web:2fa58600574c1d50c6a9bc"
  };

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
export {
    firebase,db
}  