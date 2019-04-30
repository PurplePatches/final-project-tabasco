import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveInput = this.saveInput.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }
    saveInput(e) {
        console.log(e.target.value);
        this.setState({
            file: e.target.files[0]
        });
    }
    uploadImage(e) {
        e.preventDefault();
        // console.log("show me upload file");
        var formData = new FormData();
        formData.append("file", this.state.file);
        // console.log("formData: ", formData);
        axios.post("/upload", formData).then(({ data }) => {
            console.log("show me dat from POST/upload: ", data);
            this.props.setUrl(data.url);
        });
    }
    render() {
        console.log("show me render");
        return (
            <div className="imageModal">
                <input
                    type="file"
                    accept="image/*"
                    name="file"
                    onChange={this.saveInput}
                />
                <button
                    className="uploadImage"
                    onClick={e => this.uploadImage(e)}
                >
                    Save
                </button>
            </div>
        );
    }
}
