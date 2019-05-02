import React from "react";

export default function ProfilePic(props) {
    return (
        <div>
            <img
                className="userAvatar"
                src={props.useravatar || "assets/image-wireframe.png"}
                alt={props.firstname + props.lastname}
                onClick={props.clickHandler}
            />
        </div>
    );
}
