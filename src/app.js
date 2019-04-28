import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        //lifecycle method
        console.log(this.state, "state of appjs");
        axios.get("/user").then(({ data }) => {
            //we need the user info...
            console.log(data, "DATA");
            console.log(data[0], "DATA 0");
            this.setState({
                image: data[0].url,
                first: data[0].first,
                last: data[0].last
            });

            // this.setState({
            //     image: data.image || default: "../default.jpg""
            // });
            //or this.setState({
            //    ...data,
            // image: data.image || default
            // // })
        });

        //the then... destructuring > check online
        //what we need to send back json:
    }
    render() {
        console.log(this.state, "state of appjs");
        // if (!this.state.id) {
        //     return (
        //         <div>
        //             <img src="/" />
        //         </div>
        //     );
        // } this will make a "spinner" appear when the page "loads" the 1st time and there's no id, when componentDidMount it will be faulse and go below
        return (
            <div>
                <img src="../logo.png" />;
                <ProfilePic
                    profilePic={this.state.image} //where I pass the image
                    first={this.state.first}
                    last={this.state.last}
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: true })
                    }
                />
                {this.state.isUploaderVisible && (
                    <Uploader
                        setImage={url => this.setState({ image: url })}
                        clickHandler={() =>
                            this.setState({ isUploaderVisible: false })
                        }
                    />
                )}
            </div>
            // {this.state.isUploaderVisible && <Uploader setImage={image => this.setState({image})} />}
            //PUT BEFORE THE DIV ENDING
            //{this is a //
            // conditionnal, a way to do "if"}
            //when a user clicks on the profile picture > isUploaderVisible setState must become TRUE

            //CLICKHANDLER > profile pic can use it now (child)
        );
    }
}
