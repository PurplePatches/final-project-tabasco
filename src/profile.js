import React from "react";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const fullname = `${this.props.firstname} ${this.props.lastname}`;
        return (
            <div>
                {this.props.profilePic}
                <img
                    className="profilePic"
                    src={this.props.image}
                    alt={fullname}
                />
                <p>{fullname}</p>
                {this.props.bioEditor}
            </div>
        );
    }
}
