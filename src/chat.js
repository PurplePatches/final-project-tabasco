import React from "react";

import { connect } from "react-redux";
import { socket } from "./socket";
// import { receiveChat } from "./actions";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        !this.props.chatMessages && socket.emit("receiveChat");
    }

    handleInput(e) {
        if (e.which === 13) {
            e.preventDefault();
            var chatMessage = e.target.value;
            socket.emit("newChatMessage", chatMessage);
            e.target.value = "";
        }
    }

    render() {
        console.log(this.props);
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
                    <div
                        className="chatContainer"
                        ref={chatContainer => (this.chatDiv = chatContainer)}
                    >
                        {this.props.chatMessages &&
                            this.props.chatMessages.map(chatMessage => {
                                return (
                                    <div
                                        className="chatMessage"
                                        key={chatMessage.chatid}
                                    >
                                        <p>{chatMessage.posted}</p>
                                        <h3>
                                            {chatMessage.first_name}{" "}
                                            {chatMessage.last_name}
                                        </h3>
                                        <p>{chatMessage.message}</p>
                                    </div>
                                );
                            })}
                    </div>
                    <textarea onKeyDown={this.handleInput} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { onlineUsers: state.onlineUsers, chatMessages: state.chatMessages };
}

export default connect(mapStateToProps)(Chat);
