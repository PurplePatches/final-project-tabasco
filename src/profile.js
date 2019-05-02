import Bioeditor from "./bioEditor";
import ProfilePic from "./profilepic";
import React from "react";

export default function(props) {
    return (
        <div>
            {props.profilePic}
            <h1>
                {props.firstname} {props.lastname}
            </h1>
            <Bioeditor />
        </div>
    );
}
