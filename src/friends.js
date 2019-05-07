// * friends.js
//     * A `Friends` component that expects props for friends, wannabes, and dispatch.
//     * import the actions. dispatch the one for retrieving the users when the component mounts. The other two get dispatched in response to clicks.
//     * A mapStateToProps function that splits the combined list that is in the global state into a list of friends and a list of wannabes
//     * `export default connect(mapStateToProps)(Friends)`

import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { receiveFriends, acceptFriend, unfriend } from "./actions";
import { connect } from "react-redux";
import FriendsButton from "./friendsbutton";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(receiveFriends());
    }
    acceptFriend(arg) {
        this.props.dispatch(acceptFriend(arg));
    }
    unfriend(arg) {
        this.props.dispatch(unfriend(arg));
    }
    render() {
        const reject = e => {
            unfriend(e.target.name);
        };
        const agree = e => {
            acceptFriend(e.target.name);
        };

        console.log(this.props.result, "HEERE");
        if (!this.props.result) {
            return null;
        }
        const users = this.props.result;
        console.log(users, "USERS LABEL");
        const usersList = (
            <div className="profile-container">
                <h1>
                    {" "}
                    <i className="far fa-list-alt" /> Your friends list:{" "}
                </h1>
                {users.map(user => (
                    <div>
                        {user.sender_id != this.props.id && (
                            <div>
                                <h3>
                                    {user.first} {user.last}
                                </h3>

                                <Link to={"/user/" + user.id}>
                                    <div className="view overlay zoom">
                                        <img
                                            className="img-fluid z-depth-1"
                                            alt="zoom"
                                            src={user.url}
                                        />
                                    </div>
                                </Link>
                                {user.accepted && (
                                    <div>
                                        <button name={user.id} onClick={reject}>
                                            DELETE YOU!
                                        </button>
                                    </div>
                                )}

                                {!user.accepted && (
                                    <div>
                                        <button name={user.id} onClick={agree}>
                                            Accept
                                        </button>
                                        <button name={user.id} onClick={reject}>
                                            Decline
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
        return <div className="container">{usersList}</div>;
    }
}
const mapStateToProps = function(state) {
    console.log("global state in friends: ", state);
    return {
        result: state.users
    };
};
export default connect(mapStateToProps)(Friends);
