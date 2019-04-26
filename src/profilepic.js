import React from "react";

export default function ProfilePic({
    image,
    firstname,
    lastname,
    clickHandler
}) {
    const fullName = `${firstname}  ${lastname}`;
    return (
        <img
            onClick={clickHandler}
            src={image || "/default.png"}
            alt={fullName}
        />
    );
}
