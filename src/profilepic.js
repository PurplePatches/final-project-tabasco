import React from "react";

export default function ProfilePic(props) {
    return (
        <img
            id="profilepic"
            onClick={props.clickHandler}
            src={props.url || "/profile.jpg"}
        />
    );
}
