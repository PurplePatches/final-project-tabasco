import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const otherId = this.props.otherId;

        axios.get("/users" + otherId).then(({ data }) => {
            this.setState({
                id: data.id,
                sentrequest: data.sentrequest,
                recipient_id: data.recipient_id,
                requester_id: data.requester_id,
                accepted: data.accepted
            });
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
                this.setState({
                    sentrequest: true,
                    recipient_id: this.props.otherId,
                    requester_id: this.props.userId
                });
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
            .then(({ data }) => {
                this.setState({
                    sentrequest: false
                });
            })
            .catch(err => {
                console.log("error in cancel", err);
            });
    }

    accept(e) {
        e.preventDefault();
        const otherId = this.props.otherId;

        axios
            .post("/api/users/" + otherId + "/accept", {
                recipient_id: this.props.otherId,
                requester_id: this.props.userId
            })
            .then(({ data }) => {
                this.setState({
                    accepted: true
                });
            })
            .catch(err => {
                console.log("error in accepted", err);
            });
    }
    render() {
        console.log("userId", this.props.userId);
        console.log("recipient_id", this.state.recipient_id);
        console.log("otherId", this.props.otherId);
        console.log("requester_id", this.state.requester_id);
        if (
            this.props.userId == this.state.recipient_id &&
            this.props.otherId == this.state.requester_id &&
            !this.state.accepted
        ) {
            return (
                <button
                    onClick={e =>
                        this.accept(e) || console.log("accepteeeeddd")
                    }
                >
                    Accept Solicitation
                </button>
            );
        } else if (this.state.accepted) {
            return (
                <button
                    onClick={e => {
                        this.cancel(e);
                    }}
                >
                    Cancel Request
                </button>
            );
        } else if (this.state.sentrequest) {
            return (
                <button
                    onClick={e => {
                        this.cancel(e);
                    }}
                >
                    Cancel Request
                </button>
            );
        } else {
            return <button onClick={e => this.submit(e)}>Send Request</button>;
        }
    }
}
