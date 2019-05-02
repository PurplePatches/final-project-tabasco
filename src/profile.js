import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updatePicture = this.updatePicture.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data[0]);
        });
    }

    updatePicture(image) {
        this.setState({ user_picture: image });
    }

    render() {
        return (
            <React.Fragment>
                <div className="flex-container-profile">
                    <ProfilePic
                        image={this.state.user_picture}
                        first={this.state.first_name}
                    />
                    <h1>
                        {this.state.first_name} {this.state.last_name}
                    </h1>
                </div>
            </React.Fragment>
        );
    }
}

// TO DO:
// picture won't change after upload
