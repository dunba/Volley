import React, { useRef } from 'react'
// import PLBackground from './video/PLBackground.mp4'
import { useState, useEffect } from 'react'
import './home.css'
import { useForm } from 'react-hook-form'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import app from './firebase'
import { useAuth } from './AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'


export default function ForgotPassword() {
    const videobg = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/PLBackground.mp4?alt=media&token=f66cd986-59fb-47e3-bd10-118fc83652e8'

    const emailRef = useRef();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth()
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value);
            alert('Check  your inbox for further instructions')

        } catch {
            setError('Failed to reset password')
        }

        setLoading(false);
    }









    return (<div>
        <video autoPlay muted loop style={{
            position: 'absolute',
            width: '100%',
            left:
                '50%',
            top: '50%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%,-50%)',
            zIndex: '-1'
        }}>
            <source src={videobg} type='video/mp4' />
        </video>

        <div className='formdiv'>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button id='submit' type='submit' disabled={loading} className='w-100'>Reset Password</Button>
                    </Form>
                    <div className='bottomlinks'>                    <span>Already a member? <Link to='/login'>Log in</Link></span>
                        <span>Not a member? <Link to='/signup'>sign up now</Link></span></div>

                </Card.Body>

            </Card>


            {/* <form onSubmit={handleSubmit}>
                <h1 className='logintext'> Password Reset</h1>
                <input ref={emailRef} className='inputtext' required placeholder='Email' type='email' name='email' />
                <button disabled={loading} className='formbttn'>Reset Password</button>
                <span>Not a member? <Link to='/signup'>sign up now</Link></span>
                <Link to='/login'> <div>Login</div></Link>
            </form> */}
        </div>


    </div >
    )
}
