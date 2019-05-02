import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get("/user/" + id + "/json").then(({ data }) => {
            if (!data.user) {
                this.setState(data);
            } else {
                this.props.history.push("/");
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
            </div>
        );
    }
}
