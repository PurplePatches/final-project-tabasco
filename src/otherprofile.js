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
                console.log(this.state.otherImage);
                console.log(data.friendship, "friendship after assig");
            }
        });
    }
    render() {
        return (
            <div className="container">
                <h1>
                    {" "}
                    Profile of {this.state.otherFirst} {this.state.otherLast}
                </h1>
                <img src={this.state.otherImage} />
                {this.state.otherBio}
                <FriendsButton otherId={this.props.match.params.id} />
            </div>
        );
    }
}
