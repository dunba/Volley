import React, { useRef } from 'react'
// import PLBackground from './video/PLBackground.mp4'

import { useState } from 'react'
import './home.css'
import { Link, useHistory } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap'
import firebase from "./firebase";
import { useAuth } from './AuthContext'



const SignUp = () => {
  const videobg = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/PLBackground.mp4?alt=media&token=f66cd986-59fb-47e3-bd10-118fc83652e8'
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const history = useHistory();

  ///
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    // signup(emailRef.current.value, passwordRef.current.value);
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/setuserinfo')
    } catch {
      setError('Failed to create an account')
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
          <Card.Body>  <h1>VOLLEY</h1>
          </Card.Body>
          <Card.Body>

            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>

              <Form.Group id='email'>
                <Form.Control type='email' placeholder='Email' ref={emailRef} required></Form.Control>
              </Form.Group>

              <Form.Group id='password'>

                <Form.Control type='password' placeholder='Password' ref={passwordRef} required></Form.Control>
              </Form.Group>

              <Form.Group id='password-confirm'>
                <Form.Control type='password' placeholder='Confirm Password' ref={passwordConfirmRef} required></Form.Control>
              </Form.Group>

              <Button id='submit' type='submit' disabled={loading} className='w-100'>Sign Up</Button>
            </Form>
          </Card.Body>
          <Card.Body>
            <span>Already a member? <Link to='/login'>Log in</Link></span>

          </Card.Body>
        </Card>
      </div>
    </div>

  </div >
  )
}
export default SignUp















