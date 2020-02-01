import React, { Component } from 'react'
import { Table } from 'reactstrap';
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
        axios.get(`${process.env.REACT_APP_CORS_ANYWHERE}https://api.yelp.com/v3/businesses/search`, config)
        .then((response) => {
            console.log('success', response)
            let data = response.data.businesses
            this.setState({businesses: data})
    
        })
        .catch(err => {
            console.log(err)
        })
    }

    
    render(){
        let businesses = this.state.businesses.map((b, i) => {
            return (
                <div className="vet-table" key={i}>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Vet Clinic</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip Code</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                            <tbody>
                                <tr >
                                    <td><a href={b.url}>{b.name}</a></td>
                                    <td>{b.location.address1}</td>
                                    <td>{b.location.city}</td>
                                    <td>{b.location.state}</td>
                                    <td>{b.location.zip_code}</td>
                                    <td>{b.display_phone}</td>
                                </tr>
                            </tbody>
                    </Table>
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