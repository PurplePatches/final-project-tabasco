import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.editingOn = this.editingOn.bind(this);
        this.updateDraft = this.updateDraft.bind(this);
        this.editBio = this.editBio.bind(this);
    }
    editingOn() {
        this.setState({ bio: this.props.bio });
        this.setState({ editing: true });
    }
    updateDraft(e) {
        this.setState({ bio: e.target.value });
    }
    editBio() {
        if (this.props.bio == this.state.bio) {
            this.setState({ editing: false });
        } else {
            axios
                .post("/editbio", { bio: this.state.bio })
                .then(({ data }) => {
                    this.props.changeBio(data.bio);
                    this.setState({ editing: false });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ error: true });
                });
        }
    }
    render() {
        return (
            <div className="bio">
                {this.state.editing ? (
                    <div className="editBioField">
                        <textarea
                            id="bioInput"
                            type="text"
                            defaultValue={this.state.bio}
                            onInput={this.updateDraft}
                        />
                        {this.state.error && (
                            <p>Something went wrong. Please try again.</p>
                        )}
                        <button onClick={this.editBio}>Save</button>
                    </div>
                ) : this.props.bio ? (
                    <div className="currentBio">
                        <p>{this.props.bio}</p>
                        <button onClick={this.editingOn}>Edit</button>
                    </div>
                ) : (
                    <div className="noBio">
                        <button onClick={this.editingOn}>Add bio</button>
                    </div>
                )}
            </div>
        );
    }
}
