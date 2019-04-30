import React from "react";

export default function Profile(props) {
    return (
        <div>
            {props.image}
            {props.firstName} {props.lastName}
            {/*add bioeditor when ready*/}
        </div>
    );
}
