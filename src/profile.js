import React from "react";

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
                    <h1>Your profile: </h1>
                    <bR />
                    <h1 className="display-4">
                        {this.props.first} {this.props.last}
                    </h1>
                    <div className="img-container">
                        <img src={this.props.image} />
                    </div>
                    {this.props.bioEditor}

                    {/*<p>THE BIO props.bio : {props.bio}</p>

                {props.first} {props.last}*/}
                    <a className="grid" href="/logout">
                        Logout
                    </a>
                </div>

                {/* profile pic */}
                {/* bio editor */}
            </div>
        );
    }
}
