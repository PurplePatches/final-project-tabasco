import React from "react";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("In Profile JS", props);
    }
    render() {
        return (
            <div id="profile">
                <div id="userdata" className="project">
                    <span>
                        <img
                            src={this.props.profilePic.props.image_url}
                            alt=""
                        />
                    </span>
                    <article>
                        <h2>
                            {this.props.first} {this.props.last}
                        </h2>
                        {this.props.bioEditor}
                    </article>
                </div>
            </div>
        );
    }
}
