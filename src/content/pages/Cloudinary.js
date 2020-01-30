import React, { Component } from 'react'
// import cloudinary from 'cloudinary-react'

class Cloudinary extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            widget: window.cloudinary.createUploadWidget({ 
                cloud_name: 'dschawel', 
                upload_preset: 'et0rvort'
            }, function(error, result) {
                if (error) {
                    console.log('error was...', error)
                }
                else if (result.event && result.event == 'success') {
                    console.log('successfully got the image', result)
                    props.setPetImage(result.info.secure_url)
                }
            })
        }
    }

    render() {
        return (
            <div>
                <button id="upload_widget" className="cloudinary-button" onClick={this.state.widget.open}>Upload files</button>
            </div>
        )
    }
}

export default Cloudinary

