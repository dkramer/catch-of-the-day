import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDscurlS_tRa-wkNo7CGPkzv9tAvCwd18w",
    authDomain: "catch-of-the-day-dkramer.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-dkramer.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

//this is a default export
export default base;