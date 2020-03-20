// Packages
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Button } from 'reactstrap';


const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  // Update the message whenever something else is typed
  useEffect(() => {
    setMessage('')
  }, [email, password])

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault()
    // Fetch call to POST data
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { //need to add localhost:3000 here bc we are using port 3001 for the front end currently
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }), 
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // console.log('Success')
      response.json().then(result => {
        // console.log('Response', response) // Meta-data, status, etc
        // console.log('Result', result)  // Stuff in the send
        // console.log('TOKEN', result.token)
        if(response.ok) {
          // Update the user's token (back up in App.js)
          props.updateUser(result.token)
        }
        else {
          setMessage(`${response.status} ${response.statusText}: ${result.message}`)
        }
      })
    })
    .catch(err => {
      console.log(err)
      setMessage(`${err.toString()}`)
    })
  }

  //If the user exists, redirect to the profile page
  if (props.user) {
    return <Redirect to="/profile" />
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <span className="red">{message}</span>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label>Email:</Label>
            <Input type="email" name="email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <Label>Password:</Label>
            <Input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
          <Button color="info" type="submit">Log In!</Button>
        </Form>
    </div>
  )
}

export default Login
