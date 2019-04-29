import React from "react";
// import axios from "./axios";

export default function ProfilePic(props) {
    return (
        <div className="headerPic">
            <img
                onClick={props.toggleUploader}
                className="profilepic"
                src={props.image || "/default.png"}
            />
        </div>
    );
}
