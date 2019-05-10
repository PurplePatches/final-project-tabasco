import React from "react";

import { connect } from "react-redux";

export class Online extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const connected = this.props.connectedUsers;

        console.log(this.props.connectedUsers, "connectedUsers");

        var onlineAvatar = {
            width: 100 + "px",
            height: 100 + "px"
        };
        if (!this.props.connectedUsers) {
            console.log("connectedUser was empty");
            return null;
        } else {
            const connectedList = (
                <div>
                    <h1 className="h2-responsive display-5">
                        <i className="fas fa-plug" /> People currently
                        connected:{" "}
                    </h1>
                    {connected.map(user => (
                        <div>
                            <p>
                                {user.first} {user.last}
                            </p>
                            <img style={onlineAvatar} src={user.url} />
                        </div>
                    ))}
                </div>
            );
            var onlineCard = {
                width: 18 + "rem",
                textAlign: "center",

                padding: 2 + "rem"
            };

            return (
                <div className="card" style={onlineCard}>
                    {connectedList}
                </div>
            );
        }
    }
}

const mapStateToProps = function(state) {
    //global redux state
    return {
        connectedUsers: state.online
    };
};
export default connect(mapStateToProps)(Online);
