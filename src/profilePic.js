import React from "react";

export default function ProfilePic({
    image = "/default.jpg",
    firstName,
    lastName,
    clickHandler
}) {
    return (
        <img onClick={clickHandler} src={image} alt={firstName + lastName} />
    );
}
