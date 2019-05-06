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
        console.log("otherId", otherId);
        axios
            .get("/api/users/" + otherId)
            .then(({ data }) => {
                console.log("DATA IN OTHER PROFILES", data);
                if (data.redirect) {
                    self.props.history.push("/");
                } else {
                    self.setState({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        url: data.url,
                        bio: data.bio,
                        otherId: otherId
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

                <FriendButton />
            </div>
        );
    }
}

//here we hander the friendship button
