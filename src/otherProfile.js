import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;

        axios
            .get("/api/user/" + id)
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log("error", err);
            });
    }

    render() {
        console.log("state for OtherProfile: ", this.props);
        return (
            <div>
                <p>
                    {this.props.first_name} {this.props.last_name}
                </p>
                <p>{this.props.bio}</p>
                <img src={this.props.image || "default"} />
            </div>
        );
    }
}
