import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { socket } from "./socket";

class Online extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log("render online");
        const onlineUsers = this.props.onlineUsers;
        if (!onlineUsers) {
            return (
                <div>
                    Please wait
                    <img src="/spinner.gif" />
                </div>
            );
        }

        return (
            <div>
                {onlineUsers.map(user => {
                    return (
                        <div>
                            <p>
                                {user.firstname} {user.lastname}
                            </p>
                            <img src={user.image} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("state", state);
    return {
        onlineUsers: state.onlineUsers
    };
};

export default connect(mapStateToProps)(Online);
