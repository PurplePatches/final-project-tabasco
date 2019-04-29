import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.newImage;
        this.uploadFile = this.uploadFile.bind(this);

        //WHERE I STORE THE IMAGE
    }
    componentDidMount() {
        document.body.style.overflow = "hidden";
    }
    componentWillUnmount() {
        document.body.style.overflow = "visible";

        console.log(this.newImage, "HERE!"); //image info does get passed
    }
    uploadFile(e) {
        e.preventDefault();

        var formData = new FormData();

        formData.append("file", this.newImage); //file is inside newImage

        axios.post("/upload", formData).then(({ data }) => {
            this.props.setImage(data.url); //probably wrong

            this.props.clickHandler(); //close modal
        });
    }
    render() {
        return (
            <div>
                <div className="modal-wrapper">
                    <p className="cross" onClick={this.props.clickHandler}>
                        {" "}
                        X
                    </p>
                    <h1>Select a new image for your profile</h1>

                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={image => {
                            console.log(image.target.files[0]);
                            this.newImage = image.target.files[0];
                        }}
                    />
                    <button
                        className="btn btn-dark btn-lg"
                        onClick={e => this.uploadFile(e)}
                        type="button"
                    >
                        UPLOAD
                    </button>
                </div>
            </div>
        );
    }
}
