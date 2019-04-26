import axios from "./axios";
import React from "react";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log(data);
            this.setState({
                firstname: data.firstname,
                lastname: data.lastname,
                image: data.image,
                id: data.id
            });
        });
    }
    render() {
        if (!this.state.id) {
            return (
                <div>
                    Please wait
                    <img src="/spinner.gif" />
                </div>
            );
        }
        return (
            <div>
                <ProfilePic
                    image={this.state.image}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: true })
                    }
                />
                {this.state.isUploaderVisible && (
                    <Uploader
                        handleImage={url => this.setState({ image: url })}
                    />
                )}
            </div>
        );
    }
}
