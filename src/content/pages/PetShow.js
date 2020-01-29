import React from 'react'
import { Redirect, NavLink } from 'react-router-dom'

const PetShow = props => {

    // const getMedical = () => {
    //     <NavLink to="/pets/:id/medical" />
    // }

    // const getTreatment = () => {
    //     <NavLink to="/pets/:id/treatment" />
    // }
    let display = <h3>No pet here yet!</h3>
    if(!props.user) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <div className="pet-image">
                <img alt="pet-image" src={props.user.pets.image} />
            </div>
            <div className="pet-details">
                <h1>{props.user.pets.name}</h1>
                <h3>{props.user.pets.typeOfAnimal}</h3>
                <h3>{props.user.pets.breed}</h3>
                <h3>{props.user.pets.age}</h3>
                <h3>{props.user.pets.sex}</h3>
            </div>
            {/* <div>
                <button type="button" onClick={getMedical}>Medical Summary Details</button>
                <button type="button" onClick={getTreatment}>Previous Treatments</button>
            </div> */}
        </div>
    )
}

export default PetShow