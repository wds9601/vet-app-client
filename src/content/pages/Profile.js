import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  //Declare and initialize state
  let [serverMessage, setServerMessage] = useState('')

  const callServer = () => {
    let token = localStorage.getItem('userToken')
    console.log('token is', token)

    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('In the .then() code', response)
      response.json().then(result => {
        if (response.ok) {
          console.log('YAY')
        }
        else {
          console.log('Darn', result)
          setServerMessage('No secret message for youuuuuu!')
        }
      })
      .catch(err => {
        console.log('Error in parsing JSON')
      })
    })
    .catch(err => {
      console.log('Some sort of error', err)
    })
  }


  // if there is not a user, send them away
  if (!props.user) {
    return <Redirect to="/" />
  }

  let display = <h2>No pets yet</h2>
  if (props.user.pets.length) {
    display = (
      <div>
        <h1><a href="/pets/{props.user.pets[0]._id}">{props.user.pets[0].name}</a></h1>
        <h2>{props.user.pets[0].breed}</h2>
        <h3>{props.user.pets[0].age}</h3>
      </div>
    )
  }

  return (
    <div>
      <h2>{props.user.firstname}'s Profile</h2>
      <h3>{props.user.firstname} {props.user.lastname}</h3>
      <img alt="profile-pic" src={props.user.profileUrl} />
      <p>
        <strong>Email:</strong>
        {props.user.email}
      </p>
      {display}
      <button onClick={callServer}>Call /profile route on server</button>
      <p>{serverMessage}</p>
    </div>
  )
}

export default Profile
