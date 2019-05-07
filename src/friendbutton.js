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
                this.setState(data);
            });
    }
    reject() {
        axios
            .post("/" + this.props.recipient_id + "/friend-button/reject")
            .then(({ data }) => {
                this.setState(data);
            });
    }
    render() {
        return (
            <div>
                <button
                    type="submit"
                    onClick={() => {
                        this.submit();
                    }}
                >
                    {this.state.buttonState}
                </button>
                {this.state.buttonState == "Accept friend request" && (
                    <button
                        type="submit"
                        onClick={() => {
                            this.reject();
                        }}
                    >
                        Refuse friend request
                    </button>
                )}
            </div>
        );
    }
}
