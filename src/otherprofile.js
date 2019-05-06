import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: {},
            isBioVisible: false
        };
        this.updatePicture = this.updatePicture.bind(this);
    }

    componentDidMount(this.props.match.params.id;) {
        axios.get("/api/user/:id").then(({ data }) => {

        });
    }

    // how to incorporate this.props.history.push('/');
    // use this to prevent looking at other profiles then your own

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
                    {/* show image */}
                    <img src={this.props.image} />

                    <div className="text-bio-container">
                        {/* show name */}
                        <h1>
                            {this.props.first} {this.props.last}
                        </h1>
                        {/* show bio (if available) */}
                        {this.props.bio &&
                        Object.keys(this.props.bio).length > 0 ? (
                                <p>{this.props.bio}</p>
                            ) : (
                                <p>no bio yet</p>
                            )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
