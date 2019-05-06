// * friends.js
//     * A `Friends` component that expects props for friends, wannabes, and dispatch.
//     * import the actions. dispatch the one for retrieving the users when the component mounts. The other two get dispatched in response to clicks.
//     * A mapStateToProps function that splits the combined list that is in the global state into a list of friends and a list of wannabes
//     * `export default connect(mapStateToProps)(Friends)`

import React from "react";
import axios from "./axios";
import { receiveFriends } from "./actions";
import { connect } from "react-redux";

const mapStateToProps = function(state) {
    console.log("global state in friends: ", state);
    return {
        result: state.users
    };
};
class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(receiveFriends());
    }
    render() {
        console.log(this.props.result, "HEERE");
        if (!this.props.result) {
            return null;
        }
        const users = this.props.result;
        console.log(users, "USERS LABEL");
        const usersList = (
            <div>
                {users.map(user => (
                    <h1>{user.first}</h1>
                ))}
            </div>
        );
        return (
            <div>
                <h1>HEY</h1>
                <p>{usersList}</p>
            </div>
        );
    }
}
export default connect(mapStateToProps)(Friends);
