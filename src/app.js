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
    }
    // componentDidMount() {
    //     axios.get("/user").then(({ data }) => {
    //         this.setState(data);
    //     });
    // }
    logOut() {
        axios.get("/logout").then(() => {
            location.replace("/welcome");
        });
    }
    render() {
        // if (!this.state.id) {
        //     return null;
        // }
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
                        image={this.state.image}
                        first={this.state.first}
                        last={this.state.last}
                        clickHandler={() =>
                            this.setState({ isUploaderVisible: true })
                        }
                    />
                    {this.state.isUploaderVisible && (
                        <Uploader
                            setImage={image => this.setState({ image })}
                        />
                    )}
                </nav>
            </React.Fragment>
        );
    }
}

// TO DO:
// default picture not showing
// how to add className to ProfilePic?
// log out button not working
// cookies not working correctly
