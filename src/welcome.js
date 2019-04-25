import React from "react";
import Registration from "./registration";
import Logo from "./logo";

export default function Welcome() {
    return (
        <div id="welcomeMessage">
            <h1>Welcome to my Social Network</h1>
            <Logo className="logo" />
            <h3>
                This is the place to be if you want to meet like-minded folk!
            </h3>
            <p className="pleaseRegister">Please register to enter site</p>
            <Registration />
            <h2 className="loginText">
                Please <a href="/">login</a> if you already have an account
            </h2>
        </div>
    );
}
