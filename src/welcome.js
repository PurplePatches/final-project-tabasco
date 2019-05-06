import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default class Welcome extends React.Component {
    render() {
        console.log(this.props.age);
        return (
            <div id="welcome">
                <img className="logo" src="../logo.png" />
                <HashRouter>
                    <div className="wrapper">
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
