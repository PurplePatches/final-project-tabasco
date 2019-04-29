import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.uploadPic = this.uploadPic.bind(this);
    }
    uploadPic() {
        axios.post("/uploadpic", formData).then(() => {});
    }
    render() {
        return (
            <div className="uploader">
                <button onClick={this.uploadPic}>Upload</button>
            </div>
        );
    }
}
