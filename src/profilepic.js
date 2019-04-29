import React from "react";
import axios from "./axios";

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {};
        // this.changePic = this.changePic.bind(this);
    }
    // changePic() {
    //     axios.get("/changePic").then(({ data }) => {
    //         this.setState({
    //             profilepic: data.picture
    //         });
    //     });
    // }
    render() {
        return (
            <div className="headerPic">
                <img
                    onClick={this.props.showUploader}
                    className="profilepic"
                    src={this.props.image || "/default.png"}
                />
            </div>
        );
    }
}
