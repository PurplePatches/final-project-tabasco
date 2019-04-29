import React from "react";
import axios from "./axios";
export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picname: ""
        };
        this.submit = this.submit.bind(this);
        this.formpic = "";
        // this.handleInput = this.handleInput.bind(this);
    }
    submit(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.formpic);
        axios.post("/upload", formData).then(({ data }) => {
            console.log("What i got from the server is", data);
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                console.log("Image uploaded");
                this.props.setImage(data.image_url);
                this.props.clickHandler();
            }
        });
    }
    render() {
        return (
            <section id="modal">
                <div className="project">
                    <span id="close" onClick={this.props.clickHandler}>
                        X
                    </span>
                    <h3>Want to change your profile pic?</h3>
                    {this.state.error && <div className="error">Ooops!</div>}
                    <form>
                        <input
                            className="inputfile"
                            id="file"
                            type="file"
                            accept="image/*"
                            name="file"
                            onChange={pic => {
                                this.formpic = pic.target.files[0];
                                this.setState({ picname: this.formpic.name });
                                console.log(this.formpic.name);
                            }}
                        />
                        <label htmlFor="file">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="17"
                                viewBox="0 0 20 17"
                            >
                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                            </svg>
                            <span>
                                {this.state.picname || "Choose a file…"}
                            </span>
                        </label>

                        <button onClick={e => this.submit(e)}>
                            Join the Community
                        </button>
                    </form>
                </div>
            </section>
        );
    }
}
