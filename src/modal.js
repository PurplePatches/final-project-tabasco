import React from "react";
import axios from "./axios";

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsVisible: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    // WORK IN PROGRESS:
    handleChange(e) {
        e.preventDefault();
        axios
            .post("/upload", this.state)
            .then(data => {
                if (data.data.success) {
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log("handleChange() POST /upload ERROR: ", err);
            });
    }

    // WORK IN PROGRESS:
    closeModal() {
        this.modalIsVisible = false;
    }

    // WORK IN PROGRESS:
    render() {
        return (
            <React.Fragment>
                <div className="outer-modal" onClick={this.closeModal}>
                    <div className="inner-modal">
                        <p>Would you like to change your profile picture?</p>
                        <button type="submit" onClick={this.handleChange}>
                            Change
                        </button>
                        <button onClick={this.closeModal}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
