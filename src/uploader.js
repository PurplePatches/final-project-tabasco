import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        var formData = new FormData();
        formData.append("file", this.profilePic);
        axios
            .post("/uploadPic", formData)
            .then(({ data }) => {
                let image = data.image;
                this.props.handleImage(image);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: true
                });
            });
    }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.files[0];
        };
        return (
            <div>
                {this.state.error && <div>Oups</div>}
                <input
                    type="file"
                    accept="image/*"
                    className="input-image"
                    onChange={handleInput}
                    name="profilePic"
                    required
                />
                <button onClick={e => this.submit()}>Submit</button>
            </div>
        );
    }
}
