import React, {useState} from 'react'
import { Redirect, Link } from 'react-router-dom'

import PetsDisplay from './PetsDisplay'

const Profile = props => {
  //Declare and initialize state
  let [serverMessage, setServerMessage] = useState('')
  console.log('PROPS in PROFILE', props)

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

//   const PetsDisplay = props => {
//     console.log('USER', props.user)
//     if (!props.user.pets.length) {
//         return (
//             <h2>No pets yet</h2>
//         )
//     } else {
//         return (
//             <div className="pets-display">
//                 <h1><a href="/pets/{props.user.pet._id}">{props.user.pet.name}</a></h1>
//             </div>
//         )
//     }
// }

  // let displays = props.user.pets.map((p, i) => {
  //   return (
  //     <PetsDisplay 
  //       key={p._id}
  //       pet={p}
  //     />
  //   )
  // })


  // let display = <h2>No pets yet</h2>
  // if (props.user.pets.length) {
    
      
  //       props.user.pets.forEach(pet => {
  //         display = (
  //           <div>
  //             <h1><a href="/pets/{pet._id}">{pet.name}</a></h1>
  //             <h2>{pet.breed}</h2>
  //             <h3>{pet.age}</h3>
  //           </div>
  //         )
  //       })
  // }

  return (
    <div>
      <h2>{props.user.firstname}'s Profile</h2>
      <h3>{props.user.firstname} {props.user.lastname}</h3>
      <img alt="profile-pic" src={props.user.profileUrl} />
      <p>
        <strong>Email:</strong>
        {props.user.email}
      </p>
      <div>
        {props.user.pets.map(p => (
          <h3 key={p._id}>
            <Link user={props} to={`/pets/${p._id}`}>{p.name}</Link>
          </h3>
        ))}
      </div>
      <button onClick={callServer}>Call /profile route on server</button>
      <p>{serverMessage}</p>
    </div>
  )
}

export default Profile
