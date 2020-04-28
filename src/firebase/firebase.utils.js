import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyCmOF8weI0FGAYCj4HTesOlXGtAV7M-3b8",
        authDomain: "crwn-db-4f628.firebaseapp.com",
        databaseURL: "https://crwn-db-4f628.firebaseio.com",
        projectId: "crwn-db-4f628",
        storageBucket: "crwn-db-4f628.appspot.com",
        messagingSenderId: "718513601253",
        appId: "1:718513601253:web:bd99515952f5f48fccb20c",
        measurementId: "G-MCQED6GND9"
      
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get()

    console.log(snapShot);

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user ', error.message);
        }
    }
    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;