import React from "react";

export default function ProfilePic({
    image,
    firstName,
    lastName,
    clickHandler
}) {
    return (
        <img
            className="profilePic"
            onClick={clickHandler}
            src={image || "/default.png"}
            alt={firstName + lastName}
        />
    );
}
