import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.image = "";
    }

    uploadFile(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append("file", this.image);

        let self = this;
        axios
            .post("/uploader", formData)
            .then(function(res) {
                self.props.setImage(res.data[0].url);
            })
            .catch(err => {
                console.log("error in axios", err);
            });
    }

    render() {
        return (
            <div id="wrapuploader">
                <div className="uploader">
                    <img
                        onClick={() =>
                            this.setState({
                                isUploaderVisible: false
                            })
                        }
                        className="logo"
                        src="et.jpg"
                    />
                    <form id="form">
                        <p>Change your Profile Picture?</p>
                        <input
                            id="file"
                            type="file"
                            name="file"
                            accept="image/*"
                            value=""
                            onChange={pic => {
                                this.image = pic.target.files[0];
                                console.log("this.image", this.image);
                            }}
                        />
                        <button onClick={e => this.uploadFile(e)}>
                            upload
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
