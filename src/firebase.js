import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});

export default app;
export const auth = app.auth();
export const db = app.firestore();













export const createUserDocument = async (user, additionalData) => {
    if (!user) return
    const userRef = db.doc(`users/${user.uid}`);
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
