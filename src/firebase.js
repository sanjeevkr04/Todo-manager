import firebase from 'firebase'
import {actionTypes} from './reducer'
import instance, {signIn} from './requests';

const firebaseConfig = {
    apiKey: "AIzaSyAByLHRs-_HcgdfNLAKfTbfIOqce0ZfUDw",
    authDomain: "todomanagr.firebaseapp.com",
    projectId: "todomanagr",
    storageBucket: "todomanagr.appspot.com",
    messagingSenderId: "1067163608652",
    appId: "1:1067163608652:web:556885dc3625593db1b6e9"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
firebase.auth().useDeviceLanguage();

const provider = new firebase.auth.GoogleAuthProvider();

export const signOut = () => {
    firebase.auth().signOut()
    .then(() => {
        localStorage.clear()
        instance.defaults.headers.common['x-access-token'] = null;
        console.log("Signed out sucessfully");
    }).catch(error => {
        console.log(error);
    })
}

export const checkAuthStateChanged = (dispatch, setProgress) => {
    firebase.auth().onAuthStateChanged(async (user) => {
        try {
            setProgress(true);
            if(user && !localStorage.getItem('access-token')){
                const token = await firebase.auth().currentUser.getIdToken()
                await signIn(token) 
            }
            dispatch({
              type: actionTypes.SET_USER,
              user: user,
              init: true,
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.SET_USER,
                user: null,
                init: true,
              })
        }finally{
            setProgress(false)
        }
      })
}

export const signInWithGoogle = async () => {
    try {
        const result = await firebase.auth().signInWithPopup(provider)
        console.log("Signed in sucessfully as " + result.user.uid);
    } catch (error) {
        console.log(error);
    }
}

export const addGoogleAccount = async () => {
    try {
        const user = firebase.auth()?.currentUser;
        const result = await user.linkWithPopup(provider);
        const [data] = result.user.providerData;
        await user.updateProfile({
            displayName: data.displayName,
            photoURL: data.photoURL,
        })
        console.log("Signed in sucessfully");
    } catch (error) {
        console.log(error);
    }
}

export const anonymousAuthentication = () => {
    firebase.auth().signInAnonymously()
    .then(result => {
        console.log("Signed in as Guest");
    }).catch(error => {
        console.log(error);
    })
}