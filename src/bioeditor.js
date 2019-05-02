import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorOn: false
        };
        this.bio = "";
    }
    submit() {
        console.log(this.bio);
        axios
            .post("/bio", {
                bio: this.bio
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log("error in bio editor", err);
            });
    }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.value;
        };
        console.log("this.bio", this.bio);
        if (!this.state.editorOn) {
            return (
                <div>
                    <div>
                        <button
                            onClick={() => {
                                this.setState({ editorOn: true });
                            }}
                        >
                            EDIT BIO
                        </button>

                        <p id="log">{this.props.bio}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <textarea
                            name="bio"
                            type="text"
                            onChange={handleInput}
                        />
                        <button onClick={e => this.submit()}>OK</button>

                        <p id="log">{this.props.bio}</p>
                    </div>
                </div>
            );
        }
    }
}
