import React, { Component } from 'react';

class Cloudinary extends Component {
    constructor(props) {
        super(props);
        this.state = { widget: window.cloudinary.createUploadWidget(
            { cloud_name: 'dschawel', upload_preset: 'et0rvort' },
            function(error, result) {
            console.log(result);
            props.petImage(result.info.secure_url)
            })
        }
    }
    // componentDidMount(){
    //     let widget = window.cloudinary.createUploadWidget(
    //         { cloud_name: 'dschawel', upload_preset: 'et0rvort' },
    //         function(error, result) {
    //         console.log(result);
    //         }
    //     );
    //     this.setState({widget});
    // }

    // uploadWidget() {
    //     let widget = window.cloudinary.createUploadWidget(
    //         { cloud_name: 'dschawel', upload_preset: 'et0rvort' },
    //         function(error, result) {
    //         console.log(result);
    //         }
    //     );
    // }
    
    render() {
    
    return (
        <div>
            <button id="upload_widget" class="cloudinary-button" onClick={this.state.widget.open}>Upload files</button>
        </div>
        )
    }
}

export default Cloudinary

