import React, { useState, useEffect } from 'react'
// import { Redirect, NavLink } from 'react-router-dom'
// import { withRouter } from 'react-router'
import '../../App.css';

const PetShow = ({match}, props) => {
    let [treatmentDate, setTreatmentDate] = useState('')
    let [treatment, setTreatment] = useState('')

    let [pet, setPet] = useState({})
    let [rabiesShot, setRabiesShot] = useState({})
    let [microchip,setMicrochip] = useState({})

    //Call getPet(with match params) on load
    useEffect(() => {
        getPet(match)
    }, [])

    const getPet =  async () => {
        let petId = match.params.id
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

    const handleSummaryEdit = async (e) => {
        e.preventDefault()
        let petId = match.params.id
        let token = localStorage.getItem('userToken')
        console.log('Submitted the form', petId)
        // Forming the data
        let data = {
            rabiesShot,
            microchip
        }
        //API Call
        fetch(`${process.env.REACT_APP_SERVER_URL}/pets/${petId}/medical`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        // const gotPet = await fetchPet.json()
        // console.log('GOTPET====', gotPet)
        .then(response => response.json())
        .then(foundPet => {
            console.log('Success', foundPet)
            setPet(foundPet)
        })
        .catch(err => {
            console.log('Fail pet fetch', err)
        })

        // .then(response => response.json())
        // .then(result => {
        //     // Refreshing the pet list
        //     // props.refreshPets()
        //     // Reset the state
        //     setRabiesShot()
        //     setMicrochip()
        //     setRedirect(true)
        //     props.updateUser(result.token)
    }

    const handleSubmit = e => {
        e.preventDefault()
        let token = localStorage.getItem('userToken')
        console.log('Submitted the form', treatment)
        // Forming the data
        let data = {
            treatmentDate,
            treatment
        }
        //API Call
        fetch(process.env.REACT_APP_SERVER_URL + '/:petId', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(result => {
            // Reset the state
            setTreatmentDate('')
            setTreatment('')
            // props.updateUser(result.token)

        })
        .catch(err => {
            console.log('Error Posting', err)
        })
    }

    console.log(pet.summary)
    let contentShow;
    if (pet.summary) {
        console.log(`inside the if statement`, pet.summary)
        contentShow = (
        <div>
            <img alt="pet" src={pet.petImage} />
            <p><strong>{pet.name}</strong> is a {pet.breed} and is {pet.age} years old.</p>
            <h3>Medical Records</h3>
            <p>Has the pet had his rabies shot, {pet.summary.rabiesShot}.  Their microchip number is {pet.summary.microchip}</p>
    

            <h3>Add a Treatment</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Treatment Date:</label>
                        <input name="treatmentDate" value={treatmentDate} onChange={e => setTreatmentDate(e.target.value)} />
                    </div>
                    <div>
                        <label>Treatment:</label>
                        <input name="treatment" value={treatment} onChange={e => setTreatment(e.target.value)} />
                    </div>
                    <input type="submit" />
                </form>
        </div>
        )
    } else {
        console.log('No Pets Here')
        contentShow = <p>Loading</p>
    }

    return (
        <div>
            {contentShow}
        </div>
    )
}

export default PetShow