import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { receiveFriends, acceptFriendRequest, unfriend } from "./actions";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(receiveFriends());
        this.props.dispatch(acceptFriendRequest());
    }
    render() {
        if (!this.props.friends) {
            return (
                <div className="content" id="nofriends">
                    <p>YOU DONT HAVE FRIENDS</p>
                </div>
            );
        }
        if (!this.props.solicitationpending) {
            return <h1>NO SOLICITATIONS PENDING</h1>;
        }
        return (
            <div id="friends">
                <p className="friendstitle">Friends:</p>
                <div className="boxfriend">
                    {console.log("THIS.PROPS", this.props)}
                    {console.log("this.props.friends", this.props.friends)}
                    {console.log(
                        "this.props.solicitationpending",
                        this.props.solicitationpending
                    )}
                    {this.props.friends.map(friends => {
                        return (
                            <div className="itm" key={friends.id}>
                                <p>
                                    {friends.firstname} {friends.lastname}
                                </p>
                                <img src={friends.url} />
                            </div>
                        );
                    })}
                </div>
                <p className="friendstitle">Solicitation Pending:</p>
                <div className="boxfriend">
                    {this.props.solicitationpending.map(maybe => {
                        return (
                            <div className="itm" key={maybe.id}>
                                <p>
                                    {maybe.firstname} {maybe.lastname}
                                </p>
                                <img src={maybe.url} />
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
        friends: state.friends,
        solicitationpending: state.solicitationpending
    };
};

export default connect(mapStateToProps)(Friends);
