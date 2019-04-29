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
            <div>
                {this.props.bio && (
                    <div className="container">
                        <p>{this.props.bio}</p>
                        <button
                            className="btn btn-dark btn-lg"
                            onClick={() => {
                                this.setState({ inEditMode: true });
                            }}
                        >
                            EDIT BIO
                        </button>
                    </div>
                )}
                {!this.props.bio && (
                    <div className="container">
                        <p>{this.props.bio}</p>
                        <button
                            className="btn btn-dark btn-lg"
                            onClick={() => {
                                this.setState({ inEditMode: true });
                            }}
                        >
                            CREATE BIO
                        </button>
                    </div>
                )}
                {this.state.inEditMode && (
                    <div>
                        <textarea name="bio" onChange={handleInput}>
                            TEST
                        </textarea>
                        <button
                            className="btn btn-dark btn-lg"
                            onClick={() => this.submit()}
                        >
                            UPDATE BIO
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
