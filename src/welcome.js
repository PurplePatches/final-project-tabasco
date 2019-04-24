import React from "react";
import Registration from "./registration";

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome-container">
                <h1>SOCIAL NETWORK</h1>
                <Registration />
            </div>
        );
    }
}
