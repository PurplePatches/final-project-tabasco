import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { getSocket } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput().bind(this);
    }
    handleInput(e) {
        if (e.which === 13) {
            var newChat = e.target.value;
            console.log("handleInput", e.target.value);
            getSocket().emit("newChatMessages", newChat);
            console.log(this.myDiv);
        }
    }
    componentDidUpdate() {
        this.myDiv.scrollTop = "100px";
    }
    render() {
        return (
            <div>
                <h1>CHAAAAAATTTT!!</h1>
                <div
                    className="chats-container"
                    ref={chatsContainer => (this.myDiv = chatsContainer)}
                >
                    <p>my chatsss!</p>
                    <p>my chatsss!</p>
                    <p>my chatsss!</p>
                    <p>my chatsss!</p>
                    <p>my chatsss!</p>
                    <p>my chatsss!</p>
                    <p>my chatsss!</p>
                    <p>my chatsss!</p>
                    <p>my chatsss!</p>
                </div>
                <textarea
                    onKeyDown={e => {
                        this.handleInput(e);
                    }}
                />
            </div>
        );
        return this.props.chatMessages;
    }
}

const mapStateToProps = state => {
    // state refers to global Redux state
    return {
        chatMessages: state.displayMessages
    };
};

export default connect(mapStateToProps)(Chat);
