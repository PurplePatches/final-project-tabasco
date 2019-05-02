import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";
export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get("/user/" + id + "/json").then(({ data }) => {
            if (!data.user) {
                this.setState(data[0]);
            } else {
                this.props.history.push("/");
            }

            console.log("Component OtherProfile has mounted", this.props);
        });
    }
    render() {
        return (
            <div id="profile">
                <div id="userdata" className="project">
                    <span>
                        <img
                            src={this.state.image_url || "/img/default.png"}
                            alt=""
                        />
                        <FriendButton
                            loggedId={this.props.loggedId}
                            id={this.props.match.params.id}
                        />
                    </span>
                    <article>
                        <h2>
                            {this.state.first_name} {this.state.last_name}
                        </h2>
                        BIO:
                        <p>
                            {this.state.bio ||
                                "This user has not updated a bio yet"}
                        </p>
                        <hr />
                    </article>
                </div>
            </div>
        );
    }
}
