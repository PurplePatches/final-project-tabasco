import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.send = this.send.bind(this);
        this.cancel = this.cancel.bind(this);
        this.accept = this.accept.bind(this);
        this.unfriend = this.unfriend.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/friends/${this.props.recipient}`).then(({ data }) => {
            this.setState({ ...data });
        });
    }

    send() {
        console.log("SEND REQUEST");
        this.setState({ requestAccepted: false });
    }

    unfriend() {
        console.log("UNFRIEND");
        this.setState({ requestAccepted: undefined });
    }

    accept() {
        console.log("ACCEPT REQUEST");
        this.setState({ requestAccepted: true });
    }

    cancel() {
        console.log("CANCEL REQUEST");
        this.setState({ requestAccepted: undefined });
    }

    render() {
        if (this.state.requestAccepted === undefined) {
            return (
                <React.Fragment>
                    {/* check for request between profile viewer and profile owner */}
                    {/* if undefined: send() */}
                    <button onClick={this.send} className="wide-button">
                        Send friend request
                    </button>
                </React.Fragment>
            );
        } else if (this.state.requestAccepted) {
            return (
                <React.Fragment>
                    {/* if true: is requestAccepted true? */}
                    {/* if true: unfriend() */}
                    <button onClick={this.unfriend} className="wide-button">
                        End friendship
                    </button>
                </React.Fragment>
            );
        } else if (this.state.id_recipient === this.props.recipient) {
            return (
                <React.Fragment>
                    {/* if false: is profile owner === recipient? */}
                    {/* if true: cancel() */}
                    <button onClick={this.cancel} className="wide-button">
                        Cancel friend request
                    </button>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {/* if false: accept() */}
                    <button onClick={this.accept} className="wide-button">
                        Accept friend request
                    </button>
                </React.Fragment>
            );
        }
    }
}
