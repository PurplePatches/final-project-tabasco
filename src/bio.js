import React from "react";
import axios from "./axios";
export default class Bio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showform: false,
            showlink: true,
            showBio: true
        };
        this.submit = this.submit.bind(this);
        // this.handleInput = this.handleInput.bind(this);

        console.log("In Bio:", this.props);
    }

    submit(e) {
        e.preventDefault();
        console.log("About to make the post in the Bio", this.state.bio);
        axios.post("/bio", this.state).then(({ data }) => {
            console.log("What i got from the server is", data);
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                this.setState({
                    bio: data.bio,
                    showform: false,
                    showBio: true,
                    showlink: true
                });
            }
        });
    }
    render() {
        const handleInput = e => {
            this.setState({
                [e.target.name]: e.target.value
            });
        };
        const showForm = e => {
            this.setState({
                showform: true,
                showlink: false,
                showBio: false
            });
        };
        return (
            <div>
                {this.state.error && <div className="error">Ooops!</div>}
                BIO:
                {this.state.showBio && (
                    <p>{this.state.bio || this.props.bio}</p>
                )}
                <hr />
                {this.state.showlink && <h5 onClick={showForm}>Edit bio</h5>}
                {this.state.showform && (
                    <form>
                        <label htmlFor="">
                            Bio
                            <textarea onInput={handleInput} name="bio">
                                {this.state.bio || this.props.bio}
                            </textarea>
                        </label>

                        <button onClick={e => this.submit(e)}>
                            Save the Bio
                        </button>
                    </form>
                )}{" "}
            </div>
        );
    }
}
