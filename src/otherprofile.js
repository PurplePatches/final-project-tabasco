import React from "react";
import axios from "./axios";
import { Router, Link } from "react-router-dom";

class OtherProfile extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get("/users/" + id).then(({ data }) => {
            if (data.redirect) {
                this.props.history.push("/");
            }
        });
    }
}

//here we hander the friendship button
