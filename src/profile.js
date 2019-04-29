import React from "react";
import axios from "./axios";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("In Profile JS", props);
    }
    render() {
        const handleInput = e => {
            this.setState({ [e.target.name]: e.target.value });
        };
        return (
            <div id="profile">
                {this.props.profilePic}
                <div id="userdata">
                    <img src={this.props.profilePic.props.image_url} alt="" />
                    <article>
                        <h2>
                            {this.props.first} {this.props.last}
                        </h2>
                        {this.props.bioEditor}
                    </article>
                </div>
            </div>
        );
    }
}
