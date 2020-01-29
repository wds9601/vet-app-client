import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import cloudinary from 'cloudinary-react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

const Form = props => {
    // Defining variables
    let [name, setName] = useState('')
    let [typeOfAnimal, setTypeOfAnimal] = useState('')
    let [breed, setBreed] = useState('')
    let [age, setAge] = useState('')
    let [sex, setSex] = useState('')
    let [petImage, setPetImage] = useState('')

    const handleSubmit = e => {
        let token = localStorage.getItem('userToken')
        e.preventDefault()
        console.log('Submitted the form', name)
        // Forming the data
        let data = {
            name,
            typeOfAnimal,
            breed,
            age,
            sex
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
        })
        .catch(err => {
            console.log('Error Posting', err)
        })
        if (data) {
            return <Redirect to="/profile" />
        }
    }

    function showUploadWidget() {
        // cloudinary.openUploadWidget({
        //     cloudName: "dschawel",
        //     uploadPreset: "et0rvort",
        //     sources: [
        //         "local",
        //         "url",
        //         "camera",
        //         "image_search",
        //         "facebook",
        //         "dropbox",
        //         "instagram",
        //         "shutterstock"
        //     ],
        //     // googleApiKey: "<image_search_google_api_key>",
        //     showAdvancedOptions: true,
        //     cropping: true,
        //     multiple: false,
        //     defaultSource: "local",
        //     styles: {
        //         palette: {
        //             window: "#FFFFFF",
        //             windowBorder: "#90A0B3",
        //             tabIcon: "#0078FF",
        //             menuIcons: "#5A616A",
        //             textDark: "#000000",
        //             textLight: "#FFFFFF",
        //             link: "#0078FF",
        //             action: "#FF620C",
        //             inactiveTabIcon: "#0E2F5A",
        //             error: "#F44235",
        //             inProgress: "#0078FF",
        //             complete: "#20B832",
        //             sourceBg: "#E4EBF1"
        //         },
        //         fonts: {
        //             default: {
        //                 active: true
        //             }
        //         }
        //     }
        // },
        // (err, info) => {
        //     if (!err) {    
        //     console.log("Upload Widget event - ", info);
        //     }
        // });
    }
    
    return (
        <div className="pet-form">
            <h1>Add A Pet!</h1>
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
                <button id="upload_widget" class="cloudinary-button" onClick={showUploadWidget} >Upload A Picture</button>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Form