// Packages
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

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
    <div>
      <h2>Signup</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input name="firstname" placeholder="Your first name" onChange={e => setFirstname(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input name="lastname" placeholder="Your last name" onChange={e => setLastname(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Profile Pic URL:</label>
          <input type="url" name="profileUrl" onChange={e => setProfileUrl(e.target.value)} />
        </div>
        <button type="submit">Sign Me Up!</button>
      </form>
    </div>
  )
}

export default Signup
