import React from "react";

export default function ProfilePic(props) {
    return (
        <div>
            <img
                className="profilePic"
                src={props.useravatar || "assets/image-wireframe.png"}
                alt={props.firstname}
                onClick={props.clickHandler}
            />
        </div>
    );
}

//
//
