// Packages
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Button } from 'reactstrap';

const Signup = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')
  let [profileUrl, setProfileUrl] = useState('')

  // Set message to blank when typing in any form field
  useEffect(() => {
    setMessage('')
  }, [firstname, lastname, email, password, profileUrl])

  const handleSubmit = e => {
    e.preventDefault() //prevents default action of button (i.e. submit in this case)
    // Form the data object
    let data = {
      email,
      firstname,
      lastname,
      password,
      profileUrl
    }
  
    // Send the user sign up data to the server
    console.log(process.env.REACT_APP_SERVER_URL)
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, { //REACT automatically handles .env files dont need to require 'dotenv'
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      response.json().then(result => {
        if (response.ok) { // ok = built in property to response; boolean value
          //I have a token - update the user info
          props.updateUser(result.token)
        }
        else {
          //Status was something other than 200
          setMessage(`${response.status} ${response.statusText}: ${result.message}`)
        }
      })
    })
    .catch(err => {
      setMessage(`Error: ${err.toString()}`)
    })
  }

  if(props.user) {
    return <Redirect to="/profile" /> // if user, we want to return the profile page, not the signup form
  }

  return (
    <div className="signup">
      <h2>Signup</h2>
      <span className="red">{message}</span>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>First Name:</Label>
          <Input name="firstname" placeholder="First name" onChange={e => setFirstname(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Last Name:</Label>
          <Input name="lastname" placeholder="Last name" onChange={e => setLastname(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Profile Pic URL:</Label>
          <Input type="url" name="profileUrl" placeholder="picture link" onChange={e => setProfileUrl(e.target.value)} />
        </FormGroup>
        <Button color="info" type="submit">Sign Me Up!</Button>
      </Form>
    </div>
  )
}

export default Signup
