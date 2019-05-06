import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("Friend Button babyy!");
        console.log("STATE IN FRIEND BUTTON: ", this.state);
    }
    submit() {
        const otherId = self.props.match.params.id;
        console.log("otherId", otherId);

        axios
            .post("/api/users/" + otherId, {
                status: "Request Sended"
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log("error in register", err);
            });
    }
    render() {
        return (
            <button
                onClick={() => {
                    console.log("button clicked!");
                }}
            >
                Send Request
            </button>
        );
    }
}
