import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Online extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const onlineUsers = this.props.onlineUsers;
        return (
            <div>
                {onlineUsers.map(user => {
                    <div>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                        <img src={user.image} />
                    </div>;
                })}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log(state);
    return {
        onlineUsers: state.onlineUsers
    };
};

export default connect(mapStateToProps)(Online);
