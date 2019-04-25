import React from "react";

import Registration from "./registration";

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <img className="logo" src="/tabasco.jpg" />
                <h1>SOCIAL NETWORK WELCOME</h1>
                <div id="boxregister">
                    <Registration />
                </div>
            </div>
        );
    }
}
