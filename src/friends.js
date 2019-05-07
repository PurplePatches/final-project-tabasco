import React from "react";
// import axios from "./axios";

import { connect } from "react-redux";
import { receiveFriends, acceptFriend, unfriend } from "./actions";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        !this.props.friends && this.props.dispatch(receiveFriends());
    }
    render() {
        console.log("props in render", this.props);

        return (
            <div className="friendsList">
                <h2> Friends </h2>
                <div className="friends">
                    {this.props.friends &&
                        this.props.friends.map(friend => {
                            return (
                                <div className="friend" key={friend.id}>
                                    <img src={friend.picture} />
                                    <h3>
                                        {friend.first_name} {friend.last_name}
                                    </h3>
                                    <button
                                        onClick={() =>
                                            this.props.dispatch(
                                                unfriend(friend.id)
                                            )
                                        }
                                    >
                                        unfriend
                                    </button>
                                </div>
                            );
                        })}
                </div>
                <div className="wannabes">
                    <h2> Wannabes </h2>
                    {this.props.wannabes &&
                        this.props.wannabes.map(wannabe => {
                            return (
                                <div className="wannabe" key={wannabe.id}>
                                    <img src={wannabe.picture} />
                                    <h3>
                                        {wannabe.first_name} {wannabe.last_name}
                                    </h3>
                                    <button
                                        onClick={e =>
                                            this.props.dispatch(
                                                acceptFriend(wannabe.id)
                                            )
                                        }
                                    >
                                        accept
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    if (!state.friends) {
        return {};
    }
    const friends = state.friends.filter(friend => {
        if (friend.status == true) {
            return friend;
        }
    });
    const wannabes = state.friends.filter(friend => {
        if (friend.status == false) {
            return friend;
        }
    });
    return {
        friends,
        wannabes
    };
}

export default connect(mapStateToProps)(Friends);
