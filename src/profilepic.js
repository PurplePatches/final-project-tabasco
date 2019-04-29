import React from "react";

export default function ProfilePic(props) {
    console.log(props);
    return (
        <span id="profilepic" onClick={props.clickHandler}>
            <img
                className="top_profile"
                src={props.image_url || "/img/default.png"}
            />
        </span>
    );
}
