import React from "react";
import axios from "./axios";
export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: "",
            action: "",
            buttonText: "",
            reject: false
        };
    }
    componentDidMount() {
        axios.get("/friendship/status/" + this.props.id).then(({ data }) => {
            this.setState({ data });
            console.log("Checking if you are friends", data);
            if (!data) {
                this.setState({
                    friends: false,
                    action: "send",
                    buttonText: "Wanna bear with me?"
                });
                console.log("Not friends yet", this.state);
            } else if (data.status) {
                this.setState({
                    friends: true,
                    action: "delete",
                    buttonText: "Unbear!"
                });
                console.log("FRIENDZONE ON!", this.state);
            } else if (data.status == false) {
                if (data.id_sender != this.props.id) {
                    this.setState({
                        friends: "pending",
                        action: "delete",
                        buttonText: "Unbear!"
                    });
                    console.log("NOT ACCEPTED YET", this.state);
                } else {
                    this.setState({
                        friends: "pending",
                        action: "accept",
                        buttonText: "Become Bearies <3",
                        reject: true
                    });
                    console.log(
                        "I and only I can accept the request",
                        this.state
                    );
                }
            } else {
                console.log("BANANA");
            }
        });
        console.log(
            "Now it's when i have to check all of the friendships shit"
        );
    }
    submit(e) {
        if (e == "send") {
            axios.post("/friendship/send/" + this.props.id).then(data => {
                this.setState({
                    friends: "pending",
                    action: "delete",
                    buttonText: "Unbear!"
                });
            });
            console.log("Sending the friendship request", this.state);
        } else if (e == "delete") {
            console.log("DELETING! the friendship request", e);
            axios.post("/friendship/delete/" + this.props.id).then(data => {
                this.setState({
                    friends: false,
                    action: "send",
                    buttonText: "Wanna bear with me?"
                });
            });
        } else if (e == "accept") {
            console.log("Accepting the friendship request", e);
            axios.post("/friendship/accept/" + this.props.id).then(data => {
                this.setState({
                    friends: true,
                    action: "delete",
                    buttonText: "Unbear!"
                });
            });
        } else {
            console.log("REQUEST IS WRONG!!!");
        }
    }
    render() {
        return (
            <div>
                <button
                    className="friendbutton"
                    id={this.props.id}
                    onClick={e => this.submit(this.state.action)}
                >
                    {this.state.buttonText}
                </button>
                {this.state.reject && (
                    <button
                        className="friendbutton"
                        id={this.props.id}
                        onClick={e => this.submit("delete")}
                    >
                        Unbear!
                    </button>
                )}
            </div>
        );
    }
}
