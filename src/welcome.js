import React from "react";

import Registration from "./registration";

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome">
                <div className="logo">My social Network</div>
                <Registration />
            </div>
        );
    }
}
