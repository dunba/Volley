import React, { useRef, useState } from 'react'
import { useAuth } from './AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'

const Setuserinfo = () => {

    const displaynameRef = useRef();
    const phonenumberRef = useRef();
    const teamRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { updateProfile, currentUser } = useAuth()
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            Alert('Updated User!')
            await updateProfile(displaynameRef.current.value)
            history.push('/')
        } catch {
            setError('Failed To Update User')
        }

        setLoading(false);
    }


    return (
        <div>
            {JSON.stringify({ currentUser })}
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Set User Info</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='displayname'>
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control type='text' placeholder={currentUser.displayName} ref={displaynameRef} required></Form.Control>
                        </Form.Group>

                        <Button id='submit' type='submit' disabled={loading} className='w-100'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Setuserinfo
