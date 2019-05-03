import React from "react";
import axios from "./axios";
import { Route } from "react-router-dom";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("Okkkkkk babyy");
    }

    componentDidMount() {
        let self = this;
        const id = self.props.match.params.id;
        console.log("id", id);
        axios
            .get("/api/users/" + id)
            .then(({ data }) => {
                console.log("DATA IN OTHER PROFILES", data);
                if (data.redirect) {
                    self.props.history.push("/");
                } else {
                    self.setState({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        url: data.url,
                        bio: data.bio
                    });
                }
            })
            .catch(err => {
                console.log("error in axios get otherprofile", err);
            });
    }
    render() {
        return (
            <div>
                <h2>
                    {this.state.firstname} {this.state.lastname}
                </h2>
                <img src={this.state.url} />
                <p>{this.state.bio}</p>
            </div>
        );
    }
}

//here we hander the friendship button
