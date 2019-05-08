import React from "react";
import { Link } from "react-router-dom";

import { receiveFriends, rejectFriends, acceptFriends } from "./actions";
import { connect } from "react-redux";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(receiveFriends());
        console.log(this.props);
    }
    render() {
        if (!this.props.friendsList) {
            return (
                <div>
                    Please wait
                    <img src="/spinner.gif" />
                </div>
            );
        }
        const friendsList = this.props.friendsList;
        return (
            <div>
                {friendsList.map(friend => (
                    <div>
                        {friend.status == "done" && (
                            <div>
                                <img src={friend.image} />
                                <p>
                                    <Link to={"/user/" + friend.id}>
                                        {friend.firstname} {friend.lastname}
                                    </Link>
                                </p>
                                <button
                                    onClick={() =>
                                        this.props.dispatch(
                                            rejectFriends(friend.id)
                                        )
                                    }
                                >
                                    Unfriend
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                {friendsList.map(friend => (
                    <div>
                        {friend.status == "pending" &&
                            friend.id == friend.recipient_id && (
                                <div>
                                    <img src={friend.image} />
                                    <p>
                                        <Link to={"/user/" + friend.id}>
                                            {friend.firstname} {friend.lastname}
                                        </Link>
                                    </p>
                                    <button
                                        onClick={() =>
                                            this.props.dispatch(
                                                rejectFriends(friend.id)
                                            )
                                        }
                                    >
                                        Cancel friend request
                                    </button>
                                </div>
                            )}
                    </div>
                ))}
                {friendsList.map(friend => (
                    <div>
                        {friend.status == "pending" &&
                            friend.id == friend.sender_id && (
                                <div>
                                    <img src={friend.image} />
                                    <p>
                                        <Link to={"/user/" + friend.id}>
                                            {friend.firstname} {friend.lastname}
                                        </Link>
                                    </p>
                                    <button
                                        onClick={() =>
                                            this.props.dispatch(
                                                rejectFriends(friend.id)
                                            )
                                        }
                                    >
                                        Reject friend request
                                    </button>
                                    <button
                                        onClick={() =>
                                            this.props.dispatch(
                                                acceptFriends(friend.id)
                                            )
                                        }
                                    >
                                        Accept friend request
                                    </button>
                                </div>
                            )}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("state in map", state);
    return {
        friendsList: state.friendsList
    };
};

export default connect(mapStateToProps)(Friends);
