import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { receiveFriends } from "./actions";

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
                <div className="friends">lalalala</div>
                <div className="wannabes">lelelele</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        friends: state.friends
    };
}

export default connect(mapStateToProps)(Friends);
