import React from "react";
import axios from "./axios";
import FriendsButton from "./friendsbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("ID!", this.props.match.params.id);
        console.log(this.props, "PROPS LABEL");

        const id = this.props.match.params.id;
        axios.get("/user/" + id + "/nope").then(({ data }) => {
            if (data.redirect) {
                this.props.history.push("/");
            } else {
                console.log(data, "DATA ID");
                console.log(data, "DATA!");
                this.setState({
                    otherId: data.id,
                    otherImage: data.url,
                    otherFirst: data.first,
                    otherLast: data.last,
                    otherEmail: data.email,
                    otherBio: data.bio
                });
            }
        });
    }
    render() {
        return (
            <div className="container">
                <h1 className="h1-responsive display-3">
                    Profile of {this.state.otherFirst} {this.state.otherLast}
                </h1>
                <p className="h6-responsive">{this.state.otherBio}</p>
                <div className="img-container">
                    <img
                        className="img-container"
                        src={this.state.otherImage}
                    />
                </div>
                <FriendsButton otherId={this.props.match.params.id} />
            </div>
        );
    }
}
