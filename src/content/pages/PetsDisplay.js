import React from 'react'
import { Link } from 'react-router-dom'

const PetsDisplay = props => {
    if (!props.pet) {
        return (
            <h2>No pets yet</h2>
        )
    } else {
        // let link = '/pets/' + props.pet._id
        return (
            <div className="pets-display">
                <h1><Link to={`/pets/${props.pet._id}`}>{props.pet.name}</Link></h1>
            </div>
        )
    }
}

export default PetsDisplay