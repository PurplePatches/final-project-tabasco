import React from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { connect } from "react-redux";
import { socket } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e) {
        if (e.which === 13) {
            let newChat = e.target.value.trim();
            if (newChat.trim() != "") {
                socket.emit("newChatMessage", newChat);
                console.log("handleInput", newChat);
                e.target.value = "";
                e.preventDefault();
            }
        }
    }
    componentDidUpdate() {
        this.myDiv.scrollTop = this.myDiv.scrollHeight;
        console.log("updated");
    }
    render() {
        console.log("in the render this.props", this.props);
        const { chats } = this.props;

        return (
            <section className="project" id="friendspage">
                <h3>CHATTY</h3>
                <div
                    id="chats-container"
                    ref={chatsContainer => (this.myDiv = chatsContainer)}
                >
                    {chats != undefined &&
                        chats.map(message => {
                            let userlink = "/user/" + message.userid;
                            console.log("Each one", message);
                            return (
                                <div key={message.id} className="singlemessage">
                                    <span className="userpic">
                                        <Link to={userlink}>
                                            <img
                                                className="top_profile"
                                                src={
                                                    message.image_url ||
                                                    "/img/default.png"
                                                }
                                            />
                                            <h5>{message.first_name}</h5>
                                        </Link>
                                    </span>
                                    <p className="textMessage">
                                        {message.message}
                                    </p>
                                    <p className="date">
                                        {moment(message.created_at).fromNow()}
                                    </p>
                                </div>
                            );
                        })}
                </div>
                <textarea onKeyDown={this.handleInput} />
            </section>
        );
    }
}
const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        chats: state.chats
    };
};

export default connect(mapStateToProps)(Chat);
