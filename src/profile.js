import React from "react";
import axios from "./axios";

import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="wrap-profile">
                <h1>PROFILE</h1>
                <div>
                    <p id="nameprofile">
                        {this.props.firstname} {this.props.lastname}
                    </p>

                    <ProfilePic
                        url={this.props.imageurl}
                        clickHandler={this.props.onClick}
                    />
                    <BioEditor
                        bio={this.props.bio}
                        setBio={this.props.setBio}
                    />
                </div>
            </div>
        );
    }
}
