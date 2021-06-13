import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}
firebase.initializeApp(firebaseConfig)
export default firebase;
export const auth = firebase.auth();

export const createUserDocument = async (user, additionalData) => {
    if (!user) return
    const usersRef = firebase.firestore().collection("users");
    const userRef = firebase.firestore().collection(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email } = user;
        const { displayName } = additionalData;

        try {
            userRef.set({
                displayName,
                email,
                createdAt: new Date()
            })

        }
        catch (error) {
            console.log('Error in creating user', error)
        }
    }

}


