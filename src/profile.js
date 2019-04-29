import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default class Profile extends React.Component {
    constructor(props) {
        super(props), (this.state = {});
    }
    render() {
        return (
            <div>
                {/**/}
                {this.props.profilePicComponent}
                <div className="profile">
                    <h1>FIRST{this.props.first}</h1>
                    <h1>LAST{this.props.last}</h1>
                    <img src={this.props.image} />
                    {this.props.bioEditor}

                    {/*<p>THE BIO props.bio : {props.bio}</p>
                {props.first} {props.last}*/}
                </div>

                {/* profile pic */}
                {/* bio editor */}
            </div>
        );
    }
}
