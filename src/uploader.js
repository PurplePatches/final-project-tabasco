import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.uploadFile = this.uploadFile.bind(this);
    }
    // uploadPic() {
    //     axios.post("/uploadpic", formData).then(() => {});
    // }
    uploadFile(e) {
        let formData = new FormData();

        formData.append("file", e.target.files[0]);

        // const file = e.target.files[0];
        // console.log(file);
        axios.post("/uploadpic", formData).then(({ data }) => {
            this.props.profilePicUrl(data.picture);
            console.log(data.picture);
        });
    }
    render() {
        return (
            <div className="uploader">
                <div className="uploadPopup">
                    <button onClick={this.props.toggleUploader}> X </button>
                    <label htmlFor="upload">Upload</label>
                    <input
                        style={{ opacity: 0 }}
                        name="file"
                        id="upload"
                        type="file"
                        accept="image/*"
                        onChange={this.uploadFile}
                    />
                </div>
            </div>
        );
    }
}
