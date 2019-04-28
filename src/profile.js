import React from "react";
import axios from "./axios";

export default function ProfilePic({ image, first, last, clickHandler }) {
    return <img onClick={clickHandler} src={image || "/default.jpg"} />;
}
