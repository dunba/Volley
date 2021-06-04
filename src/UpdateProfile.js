import React, { useRef } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './home.css'
import { useForm } from 'react-hook-form'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import app from './firebase'
import { useAuth } from './AuthContext'

export default function UpdateProfile() {
    const emailRef = useRef();
    const userNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const { currentUser, updateEmail, updatePassword, updateProfile } = useAuth()
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }
        const promises = []
        setLoading(true)
        setError('')

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef) {
            promises.push(updatePassword(emailRef.current.value))
        }
        if (userNameRef) {
            promises.push(updateProfile({ displayName: userNameRef.current.value, photoURL: null }))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => { setLoading(false) })





        try {

            // await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false);
    }









    return (<div>


        <div className='formdiv'>

            <form onSubmit={handleSubmit}>
                <h1 className='logintext'>Update Profile</h1>
                Email:
                <input ref={emailRef} className='inputtext' required placeholder='Email' type='email' name='email' defaultValue={currentUser.email} />
                /*username test*/
                 Email:
                <input ref={userNameRef} className='inputtext' required placeholder='Username' type='text' name='username' defaultValue={currentUser.displayName} />
               //
                Password:
                <input ref={passwordRef} className='inputtext' placeholder='Leave blank to keep the same' type='password' name='password' />
                Confirm Password:
                <input ref={passwordConfirmRef} className='inputtext' placeholder='Leave blank to keep the same' type='password' name='password' />
                <button disabled={loading} className='formbttn'>Update</button>
                <Link to='/user'>Cancel</Link>
            </form>
        </div>


    </div >
    )
}
