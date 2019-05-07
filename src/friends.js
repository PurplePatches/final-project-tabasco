import React from "react";
import { Link } from "react-router-dom";

import { receiveFriends, rejectFriends, acceptFriends } from "./actions";
import { connect } from "react-redux";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    rejectFriends(id) {
        this.props.dispatch(rejectFriends(id));
    }
    acceptFriends(id) {
        this.props.dispatch(acceptFriends(id));
    }
    componentDidMount() {
        this.props.dispatch(receiveFriends());
        console.log(this.props);
    }
    render() {
        const reject = e => {
            rejectFriends(e.target.name);
        };
        const accept = e => {
            acceptFriends(e.target.name);
        };
        console.log(this.props.friendsList);
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
                        {friend.status == "pending" && (
                            <div>
                                <img src={friend.image} />
                                <p>
                                    {friend.firstname} {friend.lastname}
                                </p>
                                {friend.id == friend.sender_id && (
                                    <button name={friend.id} onClick={reject}>
                                        Reject friend request
                                    </button>
                                )}
                                {friend.id == friend.recipient_id && (
                                    <button name={friend.id} onClick={reject}>
                                        Cancel friend request
                                    </button>
                                )}
                                {friend.id == friend.sender_id && (
                                    <button name={friend.id} onClick={accept}>
                                        Accept friend request
                                    </button>
                                )}
                            </div>
                        )}
                        {friend.status == "done" && (
                            <div>
                                <img src={friend.image} />
                                <p>
                                    {friend.firstname} {friend.lastname}
                                </p>
                                <button name={friend.id} onClick={reject}>
                                    Unfriend
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
    return {
        friendsList: state.friendsList
    };
};

export default connect(mapStateToProps)(Friends);
