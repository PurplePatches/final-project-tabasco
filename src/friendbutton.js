import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios
            .get("/" + this.props.recipient_id + "/friend-button")
            .then(({ data }) => {
                this.setState(data);
            });
    }
    submit() {
        axios
            .post("/" + this.props.recipient_id + "/friend-button")
            .then(({ data }) => {
                console.log(data);
                this.setState(data);
            });
    }
    render() {
        return (
            <div>
                {this.state.friends && (
                    <button
                        type="submit"
                        onClick={() => {
                            this.submit();
                        }}
                    >
                        Unfriend
                    </button>
                )}
                {this.state.notFriends && (
                    <button
                        type="submit"
                        onClick={() => {
                            this.submit();
                        }}
                    >
                        Send Friend Request
                    </button>
                )}
                {this.state.receivedFriendRequest && (
                    <button
                        type="submit"
                        onClick={() => {
                            this.submit();
                        }}
                    >
                        Accept Friend Request
                    </button>
                )}
                {this.state.sentFriendRequest && (
                    <button
                        type="submit"
                        onClick={() => {
                            this.submit();
                        }}
                    >
                        Cancel Friend Request
                    </button>
                )}
            </div>
        );
    }
}
