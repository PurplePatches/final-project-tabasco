import React from "react";
import ProfilePic from "./profilePic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    return (
        <div>
            <div id="profileImage">
                <ProfilePic image={props.image} />
            </div>
            <div id="userInfo">
                {props.firstName} {props.lastName}
            </div>
            <div id="bioEditor">
                {
                    // <BioEditor={props.bio} />
                }
            </div>
        </div>
    );
}
