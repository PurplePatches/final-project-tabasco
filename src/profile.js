import React from "react";

export default function Profile(props) {
    return (
        <div className="profile">
            <div className="nameAndPic">
                <h2>
                    {props.firstName} {props.lastName}
                </h2>
                {props.ProfilePic}
            </div>
            {props.BioEditor}
        </div>
    );
}
