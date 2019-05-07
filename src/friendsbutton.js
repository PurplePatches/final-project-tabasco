import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendshipStatus: undefined
        };
        this.acceptFriendship = this.acceptFriendship.bind(this);
        this.deleteFriendship = this.deleteFriendship.bind(this);
        this.requestFriendship = this.requestFriendship.bind(this);
        this.cancelFriendship = this.cancelFriendship.bind(this);

        this.setButtonStatus = this.setButtonStatus.bind(this);
    }

    componentDidMount() {
        axios.get(`/user/${this.props.otherId}/friendship`).then(data => {
            console.log("DATA LOG --> ", data.friendshipStatus);
            // if (data.friendshipStatus) {
            //     this.setState({ data }, () => this.setButtonStatus);
            // }
            this.setState({ data }, () => this.setButtonStatus());
        });
    }

    // friendshipStatusriendship() {
    //     axios
    //         .get("/user/:id/friendship")
    //         .then(data => {
    //             this.setState({ data });
    //             this.setButtonStatus();
    //         })
    //         .catch(err => {
    //             console.log("ERROR in retriving friendship data--> ", err);
    //         });
    // }

    setButtonStatus() {
        const { friendshipStatus, recipient_id } = this.state;
        if (friendshipStatus == undefined) {
            this.setState({
                buttonText: "MAKE FRIEND REQUEST",
                buttonAction: this.requestFriendship
            });
        } else if (friendshipStatus == true) {
            this.setState({
                buttonText: "END THE FRIENDSHIP",
                buttonAction: this.deleteFriendship
            });
        } else if (friendshipStatus == false) {
            if (recipient_id == this.props.otherId) {
                this.setState({
                    buttonText: "ACCEPT FRIENDSHIP REQUEST",
                    buttonAction: this.acceptFriendship
                });
            } else {
                this.setState({
                    buttonText: "CANCEL FRIENDSHIP REQUEST",
                    buttonAction: this.cancelFriendship
                });
            }
        }
    }

    requestFriendship() {
        axios
            .post(`/user/${this.props.otherId}/requestFriendship`)
            .then(() => {
                this.setState(
                    {
                        friendshipStatus: false
                    },
                    () => this.setButtonStatus()
                );
            })
            .catch(err => {
                console.log("ERROR in requesting friendship --> ", err);
            });
    }

    deleteFriendship() {
        axios
            .post(`/user/${this.props.otherId}/deleteFriendship`)
            .catch(err => {
                console.log("ERROR in ending friendship --> ", err);
            });
    }

    acceptFriendship() {
        axios
            .post(`/user/${this.props.otherId}/acceptFriendship`)
            .catch(err => {
                console.log("ERROR in acceptig friendship --> ", err);
            });
    }

    cancelFriendship() {
        axios
            .post(`/user/${this.props.otherId}/cancelFriendship`)
            .then(() => {
                this.setState(
                    {
                        friendshipStatus: undefined
                    },
                    () => this.setButtonStatus()
                );
            })
            .catch(err => {
                console.log("ERROR in deleting friendship --> ", err);
            });
    }

    render() {
        return (
            <button onClick={this.state.buttonAction}>
                {this.state.buttonText}
            </button>
        );
    }
}
