import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.uploadAvatar = this.uploadAvatar.bind(this);
    }
    uploadAvatar() {
        var formData = new FormData();
        formData.append("file", this.file);
        axios
            .post("/uploadProfilePic", formData)
            .then(({ data }) => {
                this.props.setAvatar(data.useravatar);
            })
            .catch(err => {
                console.log("Error in setAvatar", err);
                this.setState({
                    error: true
                });
            });
    }
    render() {
        const setAvatar = e => {
            this[e.target.name] = e.target.files[0];
        };
        return (
            <div className="modal">
                {this.state.error && (
                    <div>There was an error in loading your avatar</div>
                )}
                <button onClick={this.props.closeUploader}> CANCEL </button>
                <h1>Choose an image and upload yur profile picture</h1>
                <input
                    type="file"
                    accept="image/*"
                    className="input"
                    name="file"
                    onChange={setAvatar}
                />
                <button onClick={() => this.uploadAvatar()}>UPLOAD</button>
            </div>
        );
    }
}
