import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.uploadFile = this.uploadFile.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    // WORK IN PROGRESS:
    uploadFile() {
        console.log("uploadFile() fires");
        const formData = new FormData();
        formData.append("file", this.form.file);
        var app = this;
        axios
            .post("/upload", formData)
            .then(function(response) {
                app.images.unshift({
                    url: response.data[0].url
                });
            })
            .catch(err => {
                console.log("uploadeFile() POST /upload error: ", err);
            });
    }

    closeModal(e) {
        if (
            e.target.className == "outer-modal" ||
            e.target.id == "cancel-button"
        ) {
            console.log("outer modal OR cancel button clicked");
            this.props.setUploaderVisible();
        } else if (e.target.id == "upload-button") {
            console.log("upload button clicked");
            return null;
        }
    }

    // WORK IN PROGRESS:
    render() {
        return (
            <React.Fragment>
                <div className="outer-modal" onClick={this.closeModal}>
                    <div className="inner-modal">
                        <p>Would you like to change your profile picture?</p>
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            id="browse-button"
                        />
                        <button onClick={this.uploadFile} id="upload-button">
                            Upload
                        </button>
                        <button onClick={this.closeModal} id="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

// TO DO:
// uploadFile() not working
