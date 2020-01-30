import React, { Component } from 'react'
// import cloudinary from 'cloudinary-react'

class Cloudinary extends Component {
    constructor(props) {
        super(props)
            this.state = { widget: window.cloudinary.createUploadWidget(
                { cloud_name: 'dschawel', upload_preset: 'et0rvort' },
                function(error, result) {
                console.log('successfully got the image', result)
                this.props.setPetImage(result.info.secure_url)
                })
            }
        }
        
        // this.widget = cloudinary.createUploadWidget({
        //     cloudName: 'dschawel', 
        //     uploadPreset: 'et0rvort'}, 
        //     (error, result) => { 
        //     if (!error && result && result.event === "success") { 
        //         console.log('Done! Here is the image info: ', result.info)
        //         }
        //     }
        // })
            
        // let token = localStorage.getItem('userToken')
        //     let data = {}
        //     fetch(process.env.REACT_APP_SERVER_URL + '/pets', {
        //         method: 'POST',
        //         body: JSON.stringify(data),
        //         headers: {
        //             'Content-type': 'application/json',
        //             'Authorization': `Bearer ${token}`
        //         }
        //     })
        //     .then(response => response.json())
        //     .then(result => {
        //         this.setPetImage(result.info.secure_url)
        //     })
        //     .catch(err => {
        //         console.log('Error Posting', err)
        //     })
        

    // componentDidMount() {
    //     let widget = window.cloudinary.createUploadWidget(
    //         { cloud_name: 'dschawel', upload_preset: 'et0rvort' },
    //         function(error, result) {
    //         console.log(result);
    //         }
    //     )
    //     this.setState({widget})
    // }

        // uploadWidget() {
        //     let widget = window.cloudinary.createUploadWidget(
        //         { cloud_name: 'dschawel', upload_preset: 'et0rvort' },
        //         function(error, result) {
        //         console.log(result)
        //         }
        //     )
        // }

    
    render() {
    console.log('Is this where the form is submitting?')
    return (
        <div>
            <button id="upload_widget" className="cloudinary-button" onClick={this.state.widget.open}>Upload files</button>
        </div>
        )
    }
}

export default Cloudinary

