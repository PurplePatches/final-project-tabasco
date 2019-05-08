import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInput(e) {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            var newChat = {
                msg: e.target.value,
                recipientId: recipientId
            };
            socket.emit("newChatMessage", newChat);
            e.target.value = "";
        }
    }
    componentDidUpdate() {
        this.myDiv.scrollTop = "100px";
    }
    render() {
        return (
            <div>
                <h1>chat!!!</h1>
                <div
                    className="chats-container"
                    ref={chatsContainer => (this.myDiv = chatsContainer)}
                />
                <textarea onKeyDown={this.handleInput} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(Chat);
