import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            bio: ""
        };
        this.submit = this.submit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    submit() {
        axios
            .post("/bio", {
                bio: this.state.bio
            })
            .then(({ data }) => {
                this.setState({ editing: false });
                console.log("STATE BIO", this.state.bio);
                this.props.setBio(this.state.bio);
            })
            .catch(err => {
                console.log("error in bio editor", err);
            });
    }
    handleInput(e) {
        this.setState({
            bio: e.target.value
        });
    }
    render() {
        if (!this.state.editing && this.props.bio === "") {
            return (
                <div>
                    <p>{this.props.bio}</p>
                    <div>
                        <button
                            onClick={() => {
                                this.setState({ editing: true });
                            }}
                        >
                            ADD BIO
                        </button>
                    </div>
                </div>
            );
        }
        if (!this.state.editing) {
            return (
                <div>
                    <p>{this.props.bio}</p>
                    <div>
                        <button
                            onClick={() => {
                                this.setState({ editing: true });
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
                            onChange={this.handleInput}
                        />
                        <button onClick={this.submit}> SAVE </button>
                        <button
                            onClick={() => {
                                this.setState({ edditing: false });
                            }}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            );
        }
    }
}
