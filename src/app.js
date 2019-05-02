import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploaderVisible: false
        };
        this.logOut = this.logOut.bind(this);
        this.updatePicture = this.updatePicture.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data[0]);
        });
    }
    logOut() {
        axios.get("/logout").then(() => {
            location.replace("/welcome");
        });
    }

    updatePicture(image) {
        this.setState({ user_picture: image });
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navigation">
                    <div className="logo-container">
                        <h2>social network</h2>
                        <i
                            onClick={this.logOut}
                            className="fas fa-sign-out-alt"
                            id="logout-button"
                        />
                    </div>
                    <ProfilePic
                        image={this.state.user_picture}
                        first={this.state.first_name}
                        last={this.state.last_name}
                        clickHandler={() =>
                            this.setState({ isUploaderVisible: true })
                        }
                    />
                </nav>
                {this.state.isUploaderVisible && (
                    <Uploader
                        setUploaderVisible={() => {
                            this.setState({ isUploaderVisible: false });
                        }}
                        updatePicture={this.updatePicture}
                    />
                )}
            </React.Fragment>
        );
    }
}
