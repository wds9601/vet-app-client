import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Cloudinary from './Cloudinary'
import '../../App.css';


const Form = props => {
    // Defining variables
    let [name, setName] = useState('')
    let [typeOfAnimal, setTypeOfAnimal] = useState('')
    let [breed, setBreed] = useState('')
    let [age, setAge] = useState('')
    let [sex, setSex] = useState('')
    let [redirect, setRedirect] = useState(false)
    let [petImage, setPetImage] = useState('')
    let [rabiesShot, setRabiesShot] = useState('')
    let [microchip, setMicrochip] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        let token = localStorage.getItem('userToken')
        // console.log('Submitted the form', name)
        // Forming the data
        let data = {
            name,
            typeOfAnimal,
            breed,
            age,
            sex, 
            petImage,
            rabiesShot,
            microchip
        }
        //API Call
        fetch(process.env.REACT_APP_SERVER_URL + '/pets', {
            method: 'POST',
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
            setName('')
            setTypeOfAnimal('')
            setBreed('')
            setAge('')
            setSex('')
            setRedirect(true)
            // props.updateUser(result.token)
        })
        .catch(err => {
            console.log('Error Posting', err)
        })
    }

    if (redirect) {
        return <Redirect to="/profile" />
    }
    
    return (
        <div className="pet-form">
            <h1>Add A Pet!</h1>

            <div>
                <p>Pet Image (optional):</p>
                <Cloudinary setPetImage={setPetImage}/>
            </div>
            <img alt="pet" src={petImage} />

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Type of Animal:</label>
                    <input name="typeOfAnimal" value={typeOfAnimal} onChange={e => setTypeOfAnimal(e.target.value)} />
                </div>
                <div>
                    <label>Breed:</label>
                    <input name="breed" value={breed} onChange={e => setBreed(e.target.value)}/>
                </div>
                <div>
                    <label>Age:</label>
                    <input name="age" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div>
                    <label>Sex:</label>
                    <input name="sex" value={sex} onChange={e => setSex(e.target.value)} />
                </div>
                <div>
                    <label>Rabies Shot:</label>
                    <input name="rabiesShot" value={rabiesShot} onChange={e => setRabiesShot(e.target.value)} />
                </div>
                <div>
                    <label>Microchip Number:</label>
                    <input name="microchip" value={microchip} onChange={e => setMicrochip(e.target.value)} />
                </div>

                <input type="submit" />
            </form>
        </div>
    )
}

export default Form