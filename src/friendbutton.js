import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const otherId = this.props.otherId;

        axios.get("/api/users/" + otherId + "/friend").then(({ data }) => {
            this.setState({
                id: data.id,
                sentrequest: data.sentrequest
            });
            console.log("DATA IN USERS FRIENDS", data);
        });
    }
    submit(e) {
        e.preventDefault();
        const otherId = this.props.otherId;

        axios
            .post("/api/users/" + otherId, {
                recipient_id: this.props.otherId,
                requester_id: this.props.userId,
                sentrequest: true
            })
            .then(({ data }) => {
                console.log("data", data);
            })
            .catch(err => {
                console.log("error in register", err);
            });
    }
    cancel(e) {
        e.preventDefault();
        const otherId = this.props.otherId;

        axios
            .post("/api/users/" + otherId + "/friend", {
                recipient_id: this.props.otherId,
                requester_id: this.props.userId,
                sentrequest: true
            })
            .catch(err => {
                console.log("error in cancel", err);
            });
    }
    render() {
        console.log("this.state.sentrequest", this.state.sentrequest);
        if (this.state.sentrequest) {
            return (
                <button
                    id="cancelrequest"
                    onClick={e => {
                        this.cancel(e) || console.log("canceled");
                    }}
                >
                    Cancel Request
                </button>
            );
        }

        return (
            <button
                onClick={e => this.submit(e) || console.log("REQUEST SENDED")}
            >
                Send Request
            </button>
        );
    }
}
