import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: {}
        };
    }

    componentDidMount() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                data.redirect
                    ? this.props.history.push("/")
                    : this.setState({ ...data });
            })
            .catch(e => {
                if (e.response.status === 400) {
                    this.props.history.push("/");
                }
            });
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className={
                        this.props.isUploaderVisible
                            ? "flex-container-profile blur"
                            : "flex-container-profile"
                    }
                >
                    <img src={this.state.user_picture} />
                    <div className="text-bio-container">
                        <h1>
                            {this.state.first_name} {this.state.last_name}
                        </h1>
                        {this.state.bio &&
                        Object.keys(this.state.bio).length > 0 ? (
                                <p>{this.state.bio}</p>
                            ) : (
                                <p>no bio yet</p>
                            )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
