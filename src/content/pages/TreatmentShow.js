import React from 'react'

const TreatmentShow = props => {

    let pet = props.user.pets

    return (
        <div>
            <p>{pet.treatment.treatment}</p>
        </div>
    )
}

export default TreatmentShow