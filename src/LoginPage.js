import React, { useRef } from 'react'
// import PLBackground from './video/PLBackground.mp4'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './home.css'
import { useForm } from 'react-hook-form'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import app from './firebase'
import { useAuth } from './AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'


const Login = () => {
    const videobg = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/PLBackground.mp4?alt=media&token=f66cd986-59fb-47e3-bd10-118fc83652e8'

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, currentUser } = useAuth()
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









    return (<div>


        <div>

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





{/* <form onSubmit={handleSubmit}>
                {currentUser && currentUser.email}
                <h1 className='logintext'>LOGIN</h1>
                <input ref={emailRef} className='inputtext' required placeholder='Email' type='email' name='email' />
                <input ref={passwordRef} className='inputtext' required placeholder='password' type='password' name='password' />
                <button disabled={loading} className='formbttn'>LOGIN</button>
               
                
            </form> */}