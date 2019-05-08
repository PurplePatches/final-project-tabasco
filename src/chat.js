import React from "react";

import { connect } from "react-redux";
// import {  } from "./actions";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="chatPage">
                <div className="onlineUsers">
                    {this.props.onlineUsers &&
                        this.props.onlineUsers.map(onUser => {
                            return (
                                <div className="onlineUser" key={onUser.id}>
                                    <img src={onUser.picture} />
                                    <h3>
                                        {onUser.first_name} {onUser.last_name}
                                    </h3>
                                </div>
                            );
                        })}
                </div>
                <div className="chat">
                    <textarea />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { onlineUsers: state.onlineUsers };
}

export default connect(mapStateToProps)(Chat);
