import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorOn: false,
            bio: ""
        };
        this.submit = this.submit.bind(this);
    }

    submit() {
        axios
            .post("/bio", {
                bio: this.bio
            })
            .then(({ data }) => {
                this.setState({ editorOn: false });

                this.props.setBio(this.bio);
            })
            .catch(err => {
                console.log("error in bio editor", err);
            });
    }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.value;
        };
        console.log("this.props", this.props);
        if (!this.state.editorOn) {
            return (
                <div>
                    <p>{this.props.bio}</p>
                    <div>
                        <button
                            onClick={() => {
                                this.setState({ editorOn: true });
                            }}
                        >
                            EDIT BIO
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <p>{this.props.bio}</p>
                    <div>
                        <textarea
                            name="bio"
                            type="text"
                            onChange={handleInput}
                        />
                        <button onClick={e => this.submit()}>OK</button>
                        <button
                            onClick={() => {
                                this.setState({ editorOn: false });
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            );
        }
    }
}
