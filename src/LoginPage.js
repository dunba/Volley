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









    return (<div>


        <div  >
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
                    <Card.Body>  <h1>VOLLEY</h1>
                    </Card.Body>
                    <Card.Body>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Control type='email' ref={emailRef} required placeholder='Email address'></Form.Control>
                            </Form.Group>

                            <Form.Group id='password' >
                                <Form.Control type='password' ref={passwordRef} placeholder='Password' required></Form.Control>
                            </Form.Group>

                            <Button id='submit' type='submit' disabled={loading} className='w-100'>Log In</Button>
                        </Form>



                    </Card.Body>
                    <Card.Body>      <Link to='/forgot-password'> <div>Forgot Password?</div></Link></Card.Body>

                    <Card.Footer>         <div> Don't have an account? <Link to='/signup'>Sign Up</Link></div></Card.Footer>
                </Card>




            </div>
        </div>

    </div >
    )
}

export default Login





