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
        console.log(this.props, "this.props");
        if (!this.props.result) {
            return null;
        }
        const list = this.props.result;

        const usersList = (
            <div className="profile-container">
                <h1 className="w-100 ">
                    {" "}
                    <i className="far fa-list-alt" /> Your friends list:{" "}
                </h1>
                {list.map(user => (
                    <div>
                        {user.sender_id != this.props.id && (
                            <div>
                                <h3>
                                    {user.first} {user.last}
                                </h3>

                                <Link to={"/user/" + user.id}>
                                    <div className="view overlay zoom">
                                        <img
                                            className="img-fluid friends"
                                            alt="zoom"
                                            src={user.url || "./default.jpg"}
                                        />
                                    </div>
                                </Link>
                                {user.accepted && (
                                    <div>
                                        <button
                                            className="btn btn-danger btn-rounded btn-sm hvr-icon-wobble-horizontal w-50"
                                            onClick={() =>
                                                this.props.dispatch(
                                                    unfriend(user.id)
                                                )
                                            }
                                        >
                                            DELETE FRIEND{" "}
                                            <i className="far fa-trash-alt hvr-icon" />
                                        </button>
                                    </div>
                                )}

                                {!user.accepted && (
                                    <div>
                                        <button
                                            className="btn btn-success btn-rounded btn-sm hvr-icon-wobble-horizontal w-50"
                                            onClick={() =>
                                                this.props.dispatch(
                                                    acceptFriend(user.id)
                                                )
                                            }
                                        >
                                            {" "}
                                            Accept?{" "}
                                            <i className="fas fa-plus-circle hvr-icon" />{" "}
                                        </button>
                                        <button
                                            className="btn btn-danger btn-rounded btn-sm hvr-icon-wobble-horizontal w-50"
                                            onClick={() =>
                                                this.props.dispatch(
                                                    unfriend(user.id)
                                                )
                                            }
                                        >
                                            Decline{" "}
                                            <i className="far fa-trash-alt hvr-icon" />
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
    //global redux state
    console.log("global state in friends: ", state);
    return {
        result: state.users
    };
};
export default connect(mapStateToProps)(Friends);
