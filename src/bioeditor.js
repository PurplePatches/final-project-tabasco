import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/bioedit", {
                bio: this.bio
            })
            .then(({ data }) => {
                this.props.getBio(data.bio);
                this.setState({ inEditMode: false });
            });
    }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.value; //key value pair [name of the input field
        };
        return (
            <div className="container">
                {this.props.bio && (
                    <div>
                        <div className="edit-container">
                            <h3>Your current bio:</h3>
                            <blockquote className="blockquote">
                                <p className="mb-0">
                                    <br />{" "}
                                    <mark className="mb0">
                                        {this.props.bio}
                                    </mark>
                                </p>
                                <div className="blockquote-footer">
                                    by <cite>{this.props.first}</cite>
                                </div>
                            </blockquote>
                            <button
                                className="btn btn-dark btn-lg hvr-icon-wobble-horizontal"
                                onClick={() => {
                                    this.setState({ inEditMode: true });
                                }}
                            >
                                EDIT BIO {""}
                                <i className="fas fa-plus-circle hvr-icon" />
                            </button>
                        </div>
                    </div>
                )}
                {!this.props.bio && (
                    <div className="container">
                        <p>{this.props.bio}</p>
                        <button
                            className="btn btn-dark btn-lg hvr-icon-wobble-horizontal"
                            onClick={() => {
                                this.setState({ inEditMode: true });
                            }}
                        >
                            CREATE BIO {""}
                            <i className="fas fa-plus-circle hvr-icon" />
                        </button>
                    </div>
                )}
                {this.state.inEditMode && (
                    <div className="edit-container">
                        <p className="text-muted">Edit your bio text below</p>
                        <textarea
                            name="bio"
                            onChange={handleInput}
                            placeholder="Type your new bio here"
                        />
                        <button
                            className="btn btn-dark btn-lg hvr-icon-wobble-horizontal"
                            onClick={() => this.submit()}
                        >
                            UPDATE BIO {""}
                            <i className="fas fa-envelope hvr-icon" />
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

// {inEditMode == true && (
//     <div>
//         <h1>HEY !</h1>
//         <a href="/" onClick={toggleEdit}>
//             EDIT YOUR BIO
//         </a>
//     </div>
// )}
// <h1>HEY {first}</h1>
// <h2>BIO HERE: {bio}</h2>
// <a href="/" onClick={toggleEdit}>
//     EDIT YOUR BIO
// </a>
