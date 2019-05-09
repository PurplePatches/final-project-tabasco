import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { usersmenu } from "./actions";

class UsersMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(usersmenu());
    }
    render() {
        if (!this.props.users) {
            return (
                <div className="content" id="nofriends">
                    <p>NO USERS</p>
                </div>
            );
        }

        return (
            <div id="users">
                <p className="friendstitle">Users:</p>
                <div className="boxfriend">
                    {console.log("THIS.PROPS", this.props)}
                    {console.log("this.props.friends", this.props.users)}

                    {this.props.users.map(users => {
                        return (
                            <div className="itm" key={users.id}>
                                <p>
                                    {users.firstname} {users.lastname}
                                </p>
                                <div id="combo">
                                    <img src={users.url} />
                                    <a id="goto" href={"/users/" + users.id}>
                                        Go to Profile
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("STATE", state);
    return {
        users: state.users
    };
};

export default connect(mapStateToProps)(UsersMenu);
