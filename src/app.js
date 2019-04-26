import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data);
        });
    }
    // logOut() {
    //     axios.post("/logout", (req, res) => {
    //         req.session = null;
    //         res.redirect("/");
    //     });
    // }
    render() {
        // if (!this.state.id) {
        //     return null;
        // }
        return (
            <React.Fragment>
                <nav className="navigation">
                    <h2>social network</h2>
                    <button onClick={this.logOut} className="logout-button">
                        log out
                    </button>
                    <ProfilePic
                        className="profile-picture"
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
