import React, { useRef, useState } from 'react'
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUserDocument(currentUser.currentUser, currentusermail, displaynameRef.current.value)
        console.log('submit')
    }






    return (
        <div>
            {JSON.stringify({ currentUser })}
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
