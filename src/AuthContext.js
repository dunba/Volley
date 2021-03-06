import React, { useState, useEffect, useContext } from 'react'
import { auth } from './firebase'
import firebase from "./firebase";


export const AuthContext = React.createContext();
const usersRef = firebase.firestore().collection("users");

export function useAuth() {
    return useContext(AuthContext)
}


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)
    ////






    ////

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)



    }




    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, []);

    const value = { currentUser, signup, login, logout, resetPassword, updateEmail, updatePassword }
    return (
        <AuthContext.Provider
            value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
