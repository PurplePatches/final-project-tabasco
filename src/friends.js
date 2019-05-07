import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { receiveFriends } from "./actions";

import FriendButton from "./friendbutton";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        !this.props.friends && this.props.dispatch(receiveFriends());
    }
    render() {
        console.log("props in render", this.props);

        return (
            <div className="friendsList">
                <div className="friends">
                    {this.props.friends &&
                        this.props.friends.map(friend => {
                            return (
                                <div className="friend" key={friend.id}>
                                    <img src={friend.picture} />
                                    <h3>
                                        {friend.first_name} {friend.last_name}
                                    </h3>
                                    <FriendButton friendId={friend.id} />
                                </div>
                            );
                        })}
                </div>
                <div className="wannabes">
                    {this.props.wannabes &&
                        this.props.wannabes.map(wannabe => {
                            return (
                                <div className="wannabe" key={wannabe.id}>
                                    <img src={wannabe.picture} />
                                    <h3>
                                        {wannabe.first_name} {wannabe.last_name}
                                    </h3>
                                    <FriendButton friendId={wannabe.id} />
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    if (!state.friends) {
        return {};
    }
    const friends = state.friends.filter(friend => {
        if (friend.status == true) {
            return friend;
        }
    });
    const wannabes = state.friends.filter(friend => {
        if (friend.status == false) {
            return friend;
        }
    });
    return {
        friends,
        wannabes
    };
}

export default connect(mapStateToProps)(Friends);
