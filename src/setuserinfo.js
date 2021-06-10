import React, { useRef, useState } from 'react'
import { useAuth } from './AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import './setuserinfo.css'
import { firestore, createUserDocument } from './firebase'

const Setuserinfo = () => {

    const displaynameRef = useRef();
    const phonenumberRef = useRef();
    const teamRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const history = useHistory();
    const currentusermail = currentUser.email

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await setTimeout(consolelogthis(currentusermail, displaynameRef.current.value), 3000).then(console.log('hey!!!!'))
            //await createUserDocument(currentusermail, displaynameRef.current.value);
            // history.push('/')
        } catch {
            setError('Failed To Set User Data')
        }

        setLoading(false);
    }

    const consolelogthis = (x, y) => {
        console.log(x);
        console.log(y)
    }




    return (
        <div>
            {JSON.stringify({ currentUser })}
            <Card className='setusercard'>
                <Card.Body>
                    <h2 className='text-center mb-4'>Set User Info</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='displayname'>
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control className='forminput' type='text' placeholder={currentUser.displayName} ref={displaynameRef} required></Form.Control>
                        </Form.Group>

                        <Button id='submit' type='submit' disabled={loading} className='w-100'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Setuserinfo
