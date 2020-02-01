import React, { Component } from 'react'
import axios from 'axios'

const config = {
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_YELP_API_KEY}` 
    },
    params: {
        term: 'veterinarians',
        location: 'seattle'
    }
}

class Vets extends Component {
    componentDidMount() {
        console.log('cdm', config, process.env.REACT_APP_YELP_API_KEY)
        axios.get(`${process.env.REACT_APP_CORS_ANYWHERE}https://api.yelp.com/v3/businesses/search`, config)
        .then(response => console.log('success', response))
        .catch(err => {
            console.log(err)
        })
    }
    
    render(){
        return (
        <div className='results'>
            <h1>Here are some vets!</h1>
            
        </div>
        )
    }
}

export default Vets