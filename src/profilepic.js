import React from "react";
// export default function ProfilePic(props) {
//     const image = props.image || "../default.jpg";
//     return <img src={image} />;
// }

export default function ProfilePic({
    profilePic,
    first,
    last,
    email,
    clickHandler
}) {
    return (
        <div className="profile-container">
            <img
                className="test"
                src={profilePic || "../default.jpg"}
                alt={(first, last, email)}
                onClick={clickHandler}
            />

            {/*<h2>Your account:</h2>
            <p>
                {first} {last}
            </p>
            <p>
                <b>Your email</b> {email}
            </p>*/}
        </div>
    );
}

//profilepic must be given by app the power to change the stateproperty
//app needs to create a function which change the setState and pass it to the child
//USING PROPS!!!
