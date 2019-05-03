import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updatePicture = this.updatePicture.bind(this);
    }

    updatePicture(image) {
        this.setState({ user_picture: image });
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
                    <ProfilePic
                        image={this.props.image}
                        first={this.props.first}
                    />
                    <div className="text-bio-container">
                        <h1>
                            {this.props.first} {this.props.last}
                        </h1>
                        <BioEditor />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

// TO DO:

// show "Add bio" button if bio text is undefined or null
// show "Edit bio" button if bio text is NOT undefined or null
// show BioEditor when clicking "Add bio" or "Edit bio" button
// add transition for modal
