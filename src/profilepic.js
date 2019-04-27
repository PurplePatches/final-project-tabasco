import React from "react";

export default function ProfilePic({ image_url, clickHandler }) {
    return (
        <span id="profilepic" onClick={clickHandler}>
            <img
                className="top_profile"
                src={image_url || "/img/default.png"}
            />
        </span>
    );
}
