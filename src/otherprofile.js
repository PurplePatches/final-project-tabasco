import React from "react";
import axios from "./axios";

import FriendButton from "./friendbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get("/api/user/" + id).then(({ data }) => {
            if (data.redirect == true) {
                this.props.history.push("/");
            } else {
                this.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    image: data.image,
                    bio: data.bio,
                    id: data.id
                });
            }
        });
    }
    render() {
        return (
            <div>
                <img src={this.state.image} />
                <p>
                    {this.state.firstname}
                    {this.state.lastname}
                </p>
                <p>{this.state.bio}</p>
                <FriendButton recipient_id={this.props.match.params.id} />
            </div>
        );
    }
}
