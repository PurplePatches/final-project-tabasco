import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/updateBio", {
                bio: this.bio
            })
            .then(({ data }) => {
                this.props.handleBio(data.bio);
                this.setState({ createBio: false, editBio: false });
            });
    }
    render() {
        const clickHandler = e => {
            this[e.target.name] = e.target.value;
        };
        return (
            <div>
                {this.props.bio && (
                    <div>
                        <p>{this.props.bio}</p>
                        <button
                            type="submit"
                            onClick={() => this.setState({ editBio: true })}
                        >
                            Edit
                        </button>
                    </div>
                )}
                {!this.props.bio && (
                    <button
                        type="submit"
                        onClick={() => this.setState({ createBio: true })}
                    >
                        Create a Bio
                    </button>
                )}
                {this.state.createBio && (
                    <div>
                        <textarea
                            className="bioInput"
                            type="text"
                            name="bio"
                            onChange={clickHandler}
                        >
                            {this.props.bio}
                        </textarea>

                        <button type="submit" onClick={() => this.submit()}>
                            Save my Bio
                        </button>
                    </div>
                )}
                {this.state.editBio && (
                    <div>
                        <textarea
                            className="bioInput"
                            type="text"
                            name="bio"
                            onChange={clickHandler}
                        >
                            {this.props.bio}
                        </textarea>

                        <button type="submit" onClick={() => this.submit()}>
                            Save my Bio
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
