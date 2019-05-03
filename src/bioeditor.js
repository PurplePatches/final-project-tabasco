import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBioVisible: false,
            bio: {}
        };
        this.updateBio = this.updateBio.bind(this);
        this.saveBioToState = this.saveBioToState.bind(this);
    }

    updateBio() {
        axios
            .post("/edit", { bio: this.state.bio })
            .then(() => {
                this.props.changeBio({ bio: this.state.bio });
            })
            .catch(err => {
                console.log("updateBio() POST /edit ERROR: ", err);
            });
    }

    saveBioToState(e) {
        this.setState({ bio: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <div className="bio-container">
                    <textarea
                        onChange={this.saveBioToState}
                        id="story"
                        name="story"
                        rows="4"
                        cols="33"
                        maxLength="140"
                    />
                    <button
                        type="submit"
                        onClick={this.updateBio}
                        id="save-button"
                    >
                        Save
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

// TO DO:

// close textarea after succesfull request and call function to update bio
