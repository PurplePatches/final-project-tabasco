import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";
import { Link } from "react-router-dom";
import { Online } from "./online";
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e) {
        //if code keyCode == 13
        if (e.which == 13) {
            console.log(e.target.value);
            var newChat = e.target.value;
            //RESET FIELD AFTERWARDS
            socket.emit("newChatMessage", newChat);
            e.target.value = "";
            //we now have to tell the server to listen for this event
        }
    }
    componentDidMount() {
        socket.emit("getMessages");
    }
    render() {
        if (!this.props.messages) {
            return null;
        }
        const messages = this.props.messages;
        var onlineAvatar = {
            width: 100 + "px",
            height: 100 + "px",
            objectFit: "cover"
        };
        return (
            <div className="container chat-container">
                <h1>
                    <i className="fas fa-pencil-alt" /> LIVE CHAT
                </h1>
                <textarea onKeyDown={this.handleInput} />

                {messages.map(message => {
                    return (
                        <div className="chat-item">
                            <Link
                                to={"/user/" + message.id}
                                target="_blank"
                                className="chat-author"
                            >
                                <p>
                                    By : {message.first} {message.last}
                                    <div className="view overlay zoom">
                                        <img
                                            src={message.url}
                                            style={onlineAvatar}
                                        />
                                    </div>
                                </p>
                            </Link>
                            <p>{message.message}</p>
                        </div>
                    );
                })}
                <Online />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Chat);
