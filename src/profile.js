import React from "react";
import axios from "./axios";

import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/users").then(({ data }) => {
            this.setState({
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                url: data.url,
                bio: data.bio
            });
            console.log("firstname", data.firstname);
            console.log("DATA IN PROFILE", data);
            console.log("BIO IN PROFILE", data.bio);
        });
    }
    render() {
        return (
            <div>
                <h1>PROFILE</h1>
                <div>
                    <p id="nameprofile">
                        {this.props.firstname} {this.props.lastname}
                    </p>
                    <p>{this.state.bio}</p>
                    <ProfilePic
                        url={this.props.imageurl}
                        clickHandler={this.props.onClick}
                    />
                    <BioEditor bio={this.props.bio} />;
                </div>
            </div>
        );
    }
}
