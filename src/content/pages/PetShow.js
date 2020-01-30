import React, { useState, useEffect } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import Async from 'react-async'

const PetShow = ({match}, props) => {

    // const getMedical = () => {
    //     <NavLink to="/pets/:id/medical" />
    // }

    // const getTreatment = () => {
    //     <NavLink to="/pets/:id/treatment" />
    // }
    // if(!props.user) {
    //     console.log('USER INFO', props.user)
    //     return <Redirect to="/" />
        
    // }

    let [pet, setPet] = useState({})

    //Call getPet(with match params) on load
    useEffect(() => {
        console.log('Trying to get a single pet')
        console.log('MATCH #1', match)
        console.log('PROPS====', props)
        getPet(match)
    }, [])

    const getPet = async () => {
        console.log('MATCH #2', match)
        let petId = match.params.id
        console.log('petId=====', petId)
        let token = localStorage.getItem('userToken')
        await fetch(`${process.env.REACT_APP_SERVER_URL}/pets/${petId}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(foundPet => {
            console.log('Success', foundPet)
            setPet(foundPet)
        })
        .catch(err => {
            console.log('Fail pet fetch', err)
        })
    }
    

    console.log('This is the pet object', pet.pet)
    

    return (
        <div>
            <div className="pet-image">
                <img alt="pet" src="" />
            </div>
            <div className="pet-details">
                <p>{pet.name}</p>
            </div>
            {/* <div>
                <button type="button" onClick={getMedical}>Medical Summary Details</button>
                <button type="button" onClick={getTreatment}>Previous Treatments</button>
            </div> */}
        </div>
    )
}

export default PetShow