import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default class Welcome extends React.Component {
    render() {
        console.log(this.props.age);
        return (
            <div id="welcome">
                <h1 className="display-1">Social Network</h1>
                <img className="img-fluid" src="../logo.png" />
                <HashRouter>
                    <div className="container">
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
