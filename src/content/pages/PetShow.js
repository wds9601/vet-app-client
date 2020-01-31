import React, { useState, useEffect } from 'react'

const PetShow = ({match}, props) => {

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

    const handleSummaryEdit = async () => {
        e.preventDefault()
        let petId = match.params.id
        let token = localStorage.getItem('userToken')
        console.log('Submitted the form', name)
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
        .then(response => response.json())
        .then(result => {
            // Refreshing the pet list
            // props.refreshPets()
            // Reset the state
            setRabiesShot()
            setMicrochip()
            setRedirect(true)
            props.updateUser(result.token)
        })
        .catch(err => {
            console.log('Error Posting', err)
        })
    }
    

    console.log('This is the pet object', pet)
    
    // Conditional render
    let contentShow;
    if (pet) {
        contentShow = 
            <div >
                <img alt="pet" src={pet.petImage} />
                <p><strong>{pet.name}</strong> is a {pet.breed} and is {pet.age} years old.</p>

                <h3>Medical Records</h3>
                {/* <p>{pet.summary.rabiesShot}</p> */}
                <button type="button" onClick={handleSummaryEdit}>Edit Medical Record</button>
            </div>
            
        
    } else {
        console.log('No Pets Here')
        contentShow = <p>Loading...</p>
    }

    return (
        <div>
            {contentShow}
        </div>
    )
}

export default PetShow