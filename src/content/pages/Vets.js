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
    constructor(props) {
        super(props)
        this.state = { 
            businesses: []
        }
    }
    componentDidMount() {
        console.log(`${process.env.REACT_APP_CORS_ANYWHERE}https://api.yelp.com/v3/businesses/search`)
        axios.get(`${process.env.REACT_APP_CORS_ANYWHERE}https://api.yelp.com/v3/businesses/search`, config)
        .then((response) => {
            console.log('success', response)
            let data = response.data.businesses
            this.setState({businesses: data})
            // this.setState({name: data.name})
            // this.setState({address: data.address1})
            // this.setState({city: data.city})
            // this.setState({state: data.state})
            // this.setState({zip_code: data.zip_code})
            // this.setState({display_phone: data.display_phone})
        })
        .catch(err => {
            console.log(err)
        })
    }

    
    render(){
        let businesses = this.state.businesses.map((b, i) => {
            return (
            <div key={i}>
                {b.name}
            </div>
            )
        })

        return (
        <div className='results'>
            <h1>Here are some vets!</h1>
            {businesses}
        </div>
        )
    }
}


export default Vets