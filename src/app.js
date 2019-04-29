import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import ProfilePic from "./profilepic";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploaderVisible: false
        };
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                useravatar: data.useravatar
            });
        });
    }
    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <div>
                <h1>DASHBOARD</h1>
                <img src="assets/logo.png" />

                <ProfilePic
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    useravatar={this.state.useravatar}
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: true })
                    }
                />
                {this.state.isUploaderVisible && <Uploader />}
            </div>
        );
    }
}
