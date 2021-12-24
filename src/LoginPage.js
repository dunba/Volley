import React, { useRef } from 'react'

import { useState } from 'react'
import './home.css'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'


const Login = () => {
    const videobg = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/PLBackground.mp4?alt=media&token=f66cd986-59fb-47e3-bd10-118fc83652e8'

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to sign in')
        }

        setLoading(false);
    }









    return (<div style={{
        backgroundImage: `url("https://images.pond5.com/professional-soccer-stadium-087802383_prevstill.jpeg")`
    }}>


        <div >

            <div className='formdiv'>

                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Login</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required></Form.Control>
                            </Form.Group>

                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required></Form.Control>
                            </Form.Group>

                            <Button id='submit' type='submit' disabled={loading} className='w-100'>Login</Button>
                        </Form>
                        <div> Not a member? <Link to='/signup'>Sign Up Now</Link></div>
                        <Link to='/forgot-password'> <div>Forgot Password?</div></Link>

                    </Card.Body>

                </Card>




            </div>
        </div>

    </div >
    )
}

export default Login





