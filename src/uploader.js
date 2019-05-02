import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {}
        };
        this.uploadFile = this.uploadFile.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveFileToState = this.saveFileToState.bind(this);
    }

    // WORK IN PROGRESS:
    uploadFile() {
        const formData = new FormData();
        formData.append("file", this.state.file[0]);
        axios
            .post("/upload", formData)
            .then(response => {
                this.props.updatePicture(response.data[0].user_picture);
                this.props.setUploaderVisible();
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
            this.props.setUploaderVisible();
        } else if (e.target.id == "upload-button") {
            return null;
        }
    }

    saveFileToState(e) {
        this.setState({ file: e.target.files });
    }

    // WORK IN PROGRESS:
    render() {
        return (
            <React.Fragment>
                <div className="outer-modal" onClick={this.closeModal}>
                    <div className="inner-modal">
                        <p>Would you like to change your profile picture?</p>
                        <input
                            onChange={this.saveFileToState}
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
