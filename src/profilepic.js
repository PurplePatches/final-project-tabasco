import React from "react";

export default function ProfilePic(props) {
    return (
        <div className="profilePic">
            <img
                onClick={props.toggleUploader}
                className="profileImage"
                src={props.picture || "/default.png"}
            />
        </div>
    );
}
