import React from "react";

export default function ProfilePic(props) {
    return <img onClick={props.clickHandler} src={props.url || "/ovni.png"} />;
}
