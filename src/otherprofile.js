import React from "react";
import axios from "./axios";

import ProfilePic from "./profilepic";
import FriendButton from "./friendbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get("/api/user/" + id).then(({ data }) => {
            if (data.redirect) {
                this.props.history.push("/");
                return;
            }
            const firstName = data.first_name;
            const lastName = data.last_name;
            const picture = data.picture;
            const bio = data.bio;

            this.setState({ firstName, lastName, picture, bio });
        });
    }
    render() {
        return (
            <div className="otherProfile">
                <div className="nameAndPic">
                    <h2>
                        {this.state.firstName} {this.state.lastName}
                    </h2>
                    <ProfilePic picture={this.state.picture} />
                    <FriendButton match={this.props.match} />
                </div>
                <div className="currentBio">
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
