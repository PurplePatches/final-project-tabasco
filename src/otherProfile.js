import React from "react";
import axios from "./axios";
import FriendsButton from "./friendsbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        let otherUserId = this.props.match.params.id;
        axios.get("/user/" + otherUserId + "/json").then(({ data }) => {
            // console.log("DATA--->", data);
            if (data.redirect == true) {
                this.props.history.push("/");
            } else {
                this.setState(data);
            }
        });
    }
    render() {
        return (
            <div>
                <h1>
                    {this.state.firstname} {this.state.lastname}
                </h1>
                <img
                    className="greyscale profilePicture"
                    src={this.state.useravatar || "assets/logo-wireframe.png"}
                />
                <p>{this.state.bio}</p>
                <FriendsButton otherId={this.props.match.params.id} />
            </div>
        );
    }
}
