import React from "react";

export default function() {
    return (
        <div>
            {props.profilePic}
            <h1>
                {props.firstname} {props.lastname}
            </h1>
            <Bioeditor bio={props.bio} setBio={props.setBio} />
        </div>
    );
}
