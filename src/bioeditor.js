import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: {}
        };
        this.updateBioInDatabase = this.updateBioInDatabase.bind(this);
        this.saveBioToState = this.saveBioToState.bind(this);
    }

    updateBioInDatabase() {
        axios.post("/edit", this.state.bio).then(data => {
            this.props.updateBioInDatabase(data).catch(err => {
                console.log("updateBioInDatabase() POST /edit ERROR: ", err);
            });
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
                    <button onClick={this.updateBioInDatabase} id="save-button">
                        Save
                    </button>
                </div>
            </React.Fragment>
        );
    }
}
