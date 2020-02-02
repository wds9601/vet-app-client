import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Col } from 'reactstrap';
import '../../App.css';

const PetShow = ({match}, props) => {
    let [treatmentDate, setTreatmentDate] = useState('')
    let [treatment, setTreatment] = useState('')
    let [redirect, setRedirect] = useState(false)
    let [pet, setPet] = useState({})
    let [rabiesShot, setRabiesShot] = useState('')
    let [microchip,setMicrochip] = useState('')
    let [isHidden, setIsHidden] = useState(true)
    let petId = match.params.id
    
    //Call getPet(with match params) on load
    useEffect(() => {
        getPet(match)
    }, [])

    // Fetch all pet info for logged-in User
    const getPet =  async () => {
        // let petId = match.params.id
        let token = localStorage.getItem('userToken')
        await fetch(`${process.env.REACT_APP_SERVER_URL}/pets/${petId}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(foundPet => {
            setPet(foundPet)
        })
        .catch(err => {
            console.log('Fail pet fetch', err)
        })
    }
    
    // Edit Medical Record Data
    const handleSummaryEdit = (e) => {
        e.preventDefault()
        let petId = match.params.id
        let token = localStorage.getItem('userToken')
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
        .then(newSummary => {
            setRabiesShot(newSummary.summary.rabiesShot)
            setMicrochip(newSummary.summary.microchip)
            setRedirect(true)
        })
        .catch(err => {
            console.log('Fail pet fetch', err)
        })
        
    }
    
    // Create a new Treatment for user pet
    const handleSubmit = e => {
        e.preventDefault()
        let petId = match.params.id
        let token = localStorage.getItem('userToken')
        console.log('Submitted the form', treatment)
        // Forming the data
        let data = {
            treatmentDate,
            treatment
        }
        //API Call
        fetch(`${process.env.REACT_APP_SERVER_URL}/pets/${petId}/treatment`, {
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
            setRedirect(true)
        })
        .catch(err => {
            console.log('Error Posting', err)
        })
    }
    
    // Display all records in pet medical history
    let previousTreatment
    if (pet.treatment) {
        previousTreatment = pet.treatment.map((treatment, i) => {
            if (treatment.treatment) 
            return (
            <div key={i}>
                <p>On {treatment.treatmentDate}, {pet.name} had {treatment.treatment}</p>
            </div>
            )
        })
    }

    // Delete one pet by ID
    const handlePetDelete = () => {
        let petId = match.params.id
        let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/pets/${petId}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'DELETE'
        })
        .then(response => 
            response.status === 204 ? {} : response.json())
            .then(result => {
            setRedirect(true)
            })
            .catch(err => {
                console.log('handlePetDelete Error', err)
            })
    }
    
    //  Toggle isHidden property of medical form
    const toggleHidden = () => {
        if (isHidden === true) {
            setIsHidden(false)
        } else if (isHidden === false) {
            setIsHidden(true)
        }
    }
    
    // Show 'Edit' button when form is hidden, hide while form is showing
    let editButton
    if (isHidden === true) {
        editButton = (
            <Button color="info" onClick={toggleHidden}>Edit This Medical Record</Button>
        )
    }

    //  Edit medical record form
    let medicalForm
    if (isHidden === false) {
        medicalForm = (
            <div>
                <h3>Edit This Medical Record</h3>
                    <Form onSubmit={handleSummaryEdit}>
                        <FormGroup>
                            <Label>Rabies Shot(y/n):</Label>
                            <Input name="rabiesShot" value={rabiesShot} onChange={e => setRabiesShot(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Microchip #:</Label>
                            <Input name="microchip" value={microchip} onChange={e => setMicrochip(e.target.value)} />
                        </FormGroup>
                        <Button color="success" type="submit">Submit</Button>
                    </Form>
                <Button color="info" onClick={toggleHidden}>Minimize This Form</Button>
            </div>
        )
    }
    
    // Redirect to user profile page if 'Redirect' state is changed by a function
    if (redirect) {
        return <Redirect to="/profile" />
    }

    // If fetch has not completed, show 'Loading'; when fetch is completed state updates and re-renders page with data displayed
    let contentShow;
    if (pet.summary) {
        contentShow = (
        <Container className="pet-show">
            <Col>
                <img id="petImage" alt="pet" src={pet.petImage} />
                <Button id="delete" color="danger" onClick={handlePetDelete}>Remove This Pet</Button>
                <p><strong>{pet.name}</strong> is a {pet.breed} and is {pet.age} years old.</p>
            </Col>
            <Col>
                <h3>Medical Records</h3>
                <p>Has the pet had his rabies shot: {pet.summary.rabiesShot}.  Their microchip number is {pet.summary.microchip}</p>
                {medicalForm}
                {editButton}
            </Col>
            <Col>
            <h3>Previous Medical History</h3>
            {previousTreatment}
            </Col>
            <Col>
            <h3>Add a Treatment</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Treatment Date:</Label>
                        <Input name="treatmentDate" value={treatmentDate} placeholder='01312020' onChange={e => setTreatmentDate(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Treatment:</Label>
                        <Input name="treatment" value={treatment} onChange={e => setTreatment(e.target.value)} />
                    </FormGroup>
                    <Button color="success" type="submit">Submit</Button>
                </Form>
            </Col>
        </Container>
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