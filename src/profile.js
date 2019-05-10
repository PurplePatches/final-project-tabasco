import React from "react";
import { Link } from "react-router-dom";
export default class Profile extends React.Component {
    constructor(props) {
        super(props), (this.state = {});
    }
    render() {
        return (
            <div>
                {/**/}
                {this.props.profilePicComponent}
                <div className="container">
                    <h1 className="h1-responsive display-3">
                        <i className="far fa-id-card" /> Your profile:{" "}
                    </h1>

                    <h1 className="h1-responsive display-3">
                        {this.props.first} {this.props.last}
                    </h1>
                    <div className="img-container view overlay zoom">
                        <img
                            className="img-fluid friends"
                            src={this.props.image || "../default.jpg"}
                        />
                    </div>
                    {this.props.bioEditor}
                    <div>
                        <a className="text-center col-sm-12" href="/logout">
                            {" "}
                            Logout
                        </a>
                        <a
                            className="text-center col-sm-12 hvr-icon-wobble-horizontal"
                            href="/delete"
                        >
                            {" "}
                            Delete your account{" "}
                            <i className="far fa-trash-alt hvr-icon" />
                        </a>
                    </div>
                </div>

                {/* profile pic */}
                {/* bio editor */}
            </div>
        );
    }
}
