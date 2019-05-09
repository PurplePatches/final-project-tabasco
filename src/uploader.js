import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.url = "";
    }

    uploadFile(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append("file", this.url);

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
    logout() {
        axios
            .post("/logout")
            .then(({ data }) => {
                this.setState({
                    id: null
                });
            })
            .catch(err => {
                console.log("error in logout", err);
            });
    }
    render() {
        return (
            <div id="wrapuploader">
                <div className="uploader">
                    <form id="form">
                        <button
                            id="close"
                            onClick={() =>
                                this.setState({
                                    isUploaderVisible: false
                                })
                            }
                        >
                            X
                        </button>

                        <p>Change your Profile Picture?</p>
                        <input
                            id="file"
                            type="file"
                            name="file"
                            accept="image/*"
                            value=""
                            onChange={pic => {
                                this.url = pic.target.files[0];
                                console.log("this.image", this.url);
                            }}
                        />
                        <button onClick={e => this.uploadFile(e)}>
                            Upload
                        </button>

                        <button onClick={e => this.logout()}>Logout</button>
                    </form>
                </div>
            </div>
        );
    }
}
