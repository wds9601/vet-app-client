import React, {useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

const Profile = props => {
  //Declare and initialize state
  let [pets, setPets] = useState({})

  useEffect(() => {
    fetchPet()
  }, [])

  const fetchPet = async () => {
    let token = localStorage.getItem('userToken')
    await fetch(`${process.env.REACT_APP_SERVER_URL}/pets`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      response.json().then(result => {
        setPets(result)
      })
      .catch(err => {
        console.log('Error in pet fetch', err)
      })
    })
  }

  // if there is not a user, send them away
  if (!props.user) {
    return <Redirect to="/" />
  }

  let content;
  if (pets.length > 0) {
    content = pets.map((pet, i) => {
      return (
        <div key={i}>
          <h3>
            <Link user={props} to={`/pets/show/${pet._id}`}>{pet.name}</Link>
          </h3>
        </div>
      )
    })
  } else {
    console.log('No Pets Here')
    content = <p>No Pets Yet...</p>
  }


  return (
    <div className="profile">
      <h2>{props.user.firstname}'s Profile</h2>
      <h3>{props.user.firstname} {props.user.lastname}</h3>
      <p>
        <strong>Email:</strong>
        {props.user.email}
      </p>
      <img id="profilePic" alt="profile-pic" src={props.user.profileUrl} />
      <h1>My Pets</h1>
      {content}
    </div>
  )
}

export default Profile