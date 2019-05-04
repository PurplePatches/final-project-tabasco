import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: {}
        };
        this.updateBio = this.updateBio.bind(this);
        this.saveBioToState = this.saveBioToState.bind(this);
        this.closeTextarea = this.closeTextarea.bind(this);
    }

    updateBio() {
        this.props.passUpdatedBio({ bio: this.state.bio });
        axios
            .post("/edit", { bio: this.state.bio })
            .then(() => {
                this.props.changeBio({ bio: this.state.bio });
            })
            .catch(err => {
                console.log("updateBio() POST /edit ERROR: ", err);
            });
        this.props.closeTextarea();
    }

    saveBioToState(e) {
        this.setState({ bio: e.target.value });
    }

    closeTextarea() {
        this.props.closeTextarea();
    }

    render() {
        return (
            <React.Fragment>
                <div className="bio-container">
                    <textarea
                        onChange={this.saveBioToState}
                        rows="4"
                        cols="30"
                        maxLength="140"
                    />
                    <div className="bio-buttons">
                        <button onClick={this.updateBio}>Save</button>
                        <button onClick={this.closeTextarea}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
