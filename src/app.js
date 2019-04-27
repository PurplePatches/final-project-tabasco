import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data[0]);
            console.log("Component has mounted", this.state);
        });
    }
    render() {
        // const handleInput = e => {
        //     this.setState({ [e.target.name]: e.target.value });
        // };
        if (!this.state.id) {
            return (
                <section id="modal">
                    <img id="spinner" src="/img/spinner.gif" />
                </section>
            );
        } else {
            return (
                <div id="app">
                    <ProfilePic
                        image_url={this.state.image_url}
                        clickHandler={() =>
                            this.setState({ showUploader: true })
                        }
                    />
                    {this.state.showUploader && (
                        <Uploader
                            setImage={url => this.setState({ image_url: url })}
                            clickHandler={() =>
                                this.setState({ showUploader: false })
                            }
                        />
                    )}
                </div>
            );
        }
    }
}
