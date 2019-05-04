import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateFriendship = this.updateFriendship.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ id });

        axios.get("/friend/status/" + id).then(({ data }) => {
            this.setState({ option: data });
        });
    }
    updateFriendship() {
        axios
            .post("/friendship/" + this.state.option + "/" + this.state.id)
            .then(({ data }) => {
                this.setState({ option: data });
            });
    }
    render() {
        return (
            <div className="FriendButton">
                <button onClick={this.updateFriendship}>
                    {this.state.option}
                </button>
            </div>
        );
    }
}
