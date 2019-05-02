import React from "react";
import axios from "./axios";

export default class FriendsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    askFriend() {
        console.log(this.props.otherId, "OTHER ID");
        axios
            .post("/ask/", {
                otherId: this.props.otherId
            })
            .then(({ data }) => {
                console.log("DATA BACK FROM ASK", data);
            });
    }
    deleteFriend() {
        axios.post("/delete", {
            otherId: this.props.otherId
        });
    }
    acceptFriend() {
        axios.post("/accept", {
            otherId: this.props.otherId
        });
    }
    componentDidMount() {
        console.log(this.props.otherId, "OTHER ID OK?");

        axios
            .post("/friends", {
                otherId: this.props.otherId
            })
            .then(({ data }) => {
                this.setState({
                    friendship: data.friendship,
                    requestOwner: data.requestOwner,
                    unknown: data.unknown
                });

                console.log(this.state.unknown, "UNKNOWN");
                console.log(data, "DATA FROM /FRIENDS");
            });
    }
    render() {
        return (
            <div className="container">
                {this.state.unknown && (
                    <button
                        className="btn btn-dark btn-lg hvr-icon-wobble-horizontal"
                        onClick={e => this.askFriend()}
                    >
                        {" "}
                        NOT FRIENDS AT ALL. ADD?{" "}
                        <i className="fas fa-plus-circle hvr-icon" />
                    </button>
                )}
                {!this.state.friendship && this.state.requestOwner && (
                    <button
                        className="btn btn-dark btn-lg hvr-icon-wobble-horizontal"
                        onClick={e => this.deleteFriend()}
                    >
                        {" "}
                        REQUEST SENT, do you wanna cancel it?{" "}
                        <i className="fas fa-plus-circle hvr-icon" />
                    </button>
                )}
                {!this.state.friendship &&
                    !this.state.requestOwner &&
                    !this.state.unknown && (
                        <button
                            className="btn btn-dark btn-lg hvr-icon-wobble-horizontal"
                            onClick={e => this.acceptFriend()}
                        >
                            {" "}
                            Accept friend request?{" "}
                            <i className="fas fa-plus-circle hvr-icon" />
                        </button>
                    )}
                {this.state.friendship && (
                    <button
                        className="btn btn-dark btn-lg hvr-icon-wobble-horizontal"
                        onClick={e => this.deleteFriend()}
                    >
                        {" "}
                        DELETE FRIEND?{" "}
                        <i className="fas fa-plus-circle hvr-icon" />
                    </button>
                )}
            </div>
        );
    }
}
