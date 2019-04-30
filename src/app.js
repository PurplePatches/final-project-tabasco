import React from "react";
import axios from "./axios";
import Logo from "./logo";
import Profile from "./profile";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import { BrowserRouter } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                console.log("show me data in GET/user", data);
                // res.json everything except email and password
                this.setState(data);
            })
            .catch(err => {
                alert(err);
            });
    }
    render() {
        if (!this.state.id) {
            return (
                <div>
                    <img src="spinner.gif" />
                </div>
            );
        }
        const { id, firstName, lastName, image } = this.state;
        console.log("show me this.state", this.state);
        return (
            <div>
                <Logo />
                <ProfilePic
                    firstName={firstName}
                    lastName={lastName}
                    image={image}
                    clickHandler={() => {
                        this.setState({ isUploaderVisible: true });
                    }}
                />
                <BrowserRouter>
                    <Route path="/user/:id" component={OtherProfile} />
                </BrowserRouter>
                <Profile
                    firstName={firstName}
                    lastName={lastName}
                    profilePic={
                        <ProfilePic
                            id={id}
                            firstName={firstName}
                            lastName={lastName}
                            image={image}
                            onClick={this.showUploader}
                        />
                    }
                />
                {this.state.isUploaderVisible && (
                    <Uploader
                        setUrl={image => this.setState({ image: image })}
                        clickHandler={() => {
                            this.setState({ isUploaderVisible: false });
                        }}
                    />
                )}
            </div>
        );
    }
}
