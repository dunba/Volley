import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import './setuserinfo.css'
import firebase from './firebase'

const Setuserinfo = () => {

    const displaynameRef = useRef();
    const phonenumberRef = useRef();
    const teamRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('');
    const currentUser = useAuth()
    const history = useHistory();
    const currentusermail = currentUser.currentUser.email
    const currentUserId = currentUser.currentUser.uid
    const usersRef = firebase.firestore().collection("users");


    // this function will create a document in firebase if a record of the user does not exist yet.
    const createUserDocument = async (user, displayName, timecreated) => {
        if (!user) return;
        const userRef = usersRef.doc(`/${user.uid}`);
        const snapshot = await userRef.get()
        if (snapshot.exists) {
            setError('your username already exists')
        }
        else {
            try {
                userRef.set({
                    email: currentusermail,
                    timecreated: new Date(),
                    displayName: displaynameRef.current.value
                })
                setSuccess('UserInfo Successfully Set')
                history.push('/')
            } catch {
                setError('Error to Set User Info')
            }
        }
    }

    //this runs to validate userdata everytime the page is visited. on the first time, it will prompt user to enter info.
    const [userDisplayName, setUserDisplayName] = useState('')

    const fetchUserData = async (user) => {
        console.log('fetching user data')
        const userRef = usersRef.doc(`/${user.uid}`);
        const snapshot = await userRef.get()
        if (snapshot.exists) {
            console.log(snapshot.data().displayName)
            setUserDisplayName(snapshot.data().displayName)
            setError(`Welcome ${userDisplayName}`)
            history.push('/')
        }
        else {

            setError('Please Enter User Data')

        }
    }
    //this will run everytime the page loads to fetch user data
    useEffect(() => {
        fetchUserData(currentUser.currentUser);
    }, [])




    // this runs when the submit button is entered.
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUserDocument(currentUser.currentUser, currentusermail, displaynameRef.current.value)
        console.log('submit')
    }





    return (
        <div>
            {JSON.stringify({ currentUser })}
            WELCOME {userDisplayName}
            <Card className='setusercard'>
                <Card.Body>
                    <h2 className='text-center mb-4'>Set User Info</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {success && <Alert variant='success'>{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='displayname'>
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control className='forminput' type='text' placeholder={currentUser.currentUser.uid} ref={displaynameRef} required></Form.Control>
                        </Form.Group>

                        <Button id='submit' type='submit' disabled={loading} className='w-100'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Setuserinfo
