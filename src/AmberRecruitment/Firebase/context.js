import firebase from "firebase";

const config = {
    apiKey: "AIzaSyBQC4y3n_ooduNrzEZepf5-mAG61GMhT6o",
    authDomain: "amber-recruitment.firebaseapp.com",
    databaseURL: "https://amber-recruitment.firebaseio.com",
    projectId: "amber-recruitment",
    storageBucket: "amber-recruitment.appspot.com",
    messagingSenderId: "1095496441215",
    appId: "1:1095496441215:web:87b231efee596734474e4a"
};
// Initialize Firebase
const fire = firebase.initializeApp(config);
//const auth = fire.auth();

//const firebase = firebase.auth();
//const db = firebase.firestore();

export default fire;

//module.exports = {fire, auth}






