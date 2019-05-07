import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get(`/api/friends/${this.props.recipient}`).then(({ data }) => {
            this.setState({ ...data });
        });
    }

    send() {}

    unfriend() {}

    accept() {}

    cancel() {}

    render() {
        return (
            <React.Fragment>
                <button className="wide-button">Make friend request</button>
                <button className="wide-button">Cancel friend request</button>
                <button className="wide-button">Accept friend request</button>
                <button className="wide-button">End friendship</button>
            </React.Fragment>
        );
    }
}
