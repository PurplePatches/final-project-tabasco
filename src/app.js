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
    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <React.Fragment>
                <p>APP</p>
                <ProfilePic
                    image={this.state.iamge}
                    first={this.state.first}
                    last={this.state.last}
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: true })
                    }
                />
                {this.state.isUploaderVisible && (
                    <Uploader setImage={image => this.setState({ image })} />
                )}
            </React.Fragment>
        );
    }
}
