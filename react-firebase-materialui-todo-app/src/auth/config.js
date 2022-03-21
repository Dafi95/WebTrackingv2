import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCj3OIHoRESm66u1yA4uku4iSSOYoJ7zpY",
    authDomain: "webtrackingv2.firebaseapp.com",
    databaseURL: "https://webtrackingv2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "webtrackingv2",
    storageBucket: "webtrackingv2.appspot.com",
    messagingSenderId: "140929248279",
    appId: "1:140929248279:web:7611ee893b705e602f8052",
    measurementId: "G-CDTE6SK5L6"
};

const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(config)
    : firebase.app();
const auth = firebaseApp.auth();
export default auth;
