import React from "react";

// export default function ProfilePic(props) {
//     const image = props.image || "../default.jpg";
//     return <img src={image} />;
// }

export default function ProfilePic({ profilePic, first, last, clickHandler }) {
    return (
        <div>
            <img
                src={profilePic || "../default.jpg"}
                alt={(first, last)}
                onClick={clickHandler}
            />
            <h2>Your account:</h2>
            <p>
                {first} {last}
            </p>
        </div>
    );
}

//profilepic must be given by app the power to change the stateproperty
//app needs to create a function which change the setState and pass it to the child
//USING PROPS!!!
