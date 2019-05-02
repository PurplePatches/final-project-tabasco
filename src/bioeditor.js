import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data[0]);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div />
            </React.Fragment>
        );
    }
}
