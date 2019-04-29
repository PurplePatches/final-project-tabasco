import React from "react";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploaderVisible: true
        };
        this.submit = this.submit.bind(this);
    }
    render() {
        return (
            <div className="modal">
                <div
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: false })
                    }
                >
                    x
                </div>
                <h1>Choose an image and upload yur profile picture</h1>
                <input type="file" />
                <button onClick={this.submit}>SUBMIT</button>
            </div>
        );
    }
}
