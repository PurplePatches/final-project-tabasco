import React from "react";
import axios from "./axios";
import { Route } from "react-router-dom";
import FriendButton from "./friendbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let self = this;
        const otherId = self.props.match.params.id;

        axios
            .get("/api/users/" + otherId)
            .then(({ data }) => {
                if (data.redirect) {
                    self.props.history.push("/");
                } else {
                    self.setState({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        url: data.url,
                        bio: data.bio,
                        userId: self.props.userId,
                        id: data.id,
                        accepted: data.accepted
                    });
                }
            })
            .catch(err => {
                console.log("error in axios get otherprofile", err);
            });
    }
    render() {
        return (
            <div id="wrap-otherprofile">
                <h2>
                    {this.state.firstname} {this.state.lastname}
                </h2>
                <img src={this.state.url} />
                <p>{this.state.bio}</p>

                <FriendButton
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    imageurl={this.state.url}
                    otherId={this.props.match.params.id}
                    bio={this.state.bio}
                    userId={this.state.userId}
                    accepted={this.state.accepted}
                    recipient_id={this.state.recipient_id}
                    requester_id={this.state.requester_id}
                    sentrequest={this.state.sentrequest}
                />
            </div>
        );
    }
}

//here we hander the friendship button
