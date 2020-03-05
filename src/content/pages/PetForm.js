import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Cloudinary from './Cloudinary'
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Col } from 'reactstrap';
import Image from 'react-bootstrap/Image'
import '../../App.css';


const PetForm = props => {
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
        <Container className="pet-form">
            <Col>
                <h1>Add A Pet Picture!</h1>
                <Image id="petImage" alt="pet" src={petImage} fluid />
                <Cloudinary setPetImage={setPetImage}/>
            </Col>
            <Col>
                <Form onSubmit={handleSubmit} >
                    <FormGroup>
                        <Label>Name: </Label>
                        <Input name="name" value={name} onChange={e => setName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Type of Animal: </Label>
                        <Input name="typeOfAnimal" value={typeOfAnimal} onChange={e => setTypeOfAnimal(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Breed: </Label>
                        <Input name="breed" value={breed} onChange={e => setBreed(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Age: </Label>
                        <Input name="age" value={age} onChange={e => setAge(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Sex: </Label>
                        <Input name="sex" value={sex} onChange={e => setSex(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Rabies Shot: </Label>
                        <Input name="rabiesShot" value={rabiesShot} onChange={e => setRabiesShot(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Microchip Number: </Label>
                        <Input name="microchip" value={microchip} onChange={e => setMicrochip(e.target.value)} />
                    </FormGroup>
                    <Button color="success" type="submit">Submit</Button>
                </Form>
            </Col>
        </Container>
    )
}

export default PetForm