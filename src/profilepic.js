import React from "react";

export default function ProfilePic({ image, first, clickHandler }) {
    return (
        <img
            onClick={clickHandler}
            src={image || "./default.jpg"}
            alt={first}
        />
    );
}

// TO DO:
// how to show name?
