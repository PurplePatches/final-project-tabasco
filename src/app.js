import React from 'react';
import axios from './axios';
import { BrowserRouter, Router, Link } from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/user').then(
            ({data}) => {
                this.setState({
                    ...data
                });
            }
        );
    }
    render() {
        if (!this.state.id) {
            return (
                <div>
                    Hang on!
                    <img src="/spinner.gif">;
                </div>
            );
        }
        return (
            <BrowserRouter>
            <div>
                <img src="/logo.gif" />
                <ProfilePic
                    image={this.state.image}
                    first={this.state.first}
                    clickHandler={() => this.setState({ isUploaderVisible: true })}
                />
                <div>
                    <Route path="/" render={(props) => {
                        return (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                profilePic={
                                    <ProfilePic
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        image={this.state.image}
                                        onClick={this.showUploader}
                                    />
                                }
                                bioEditor={
                                    <BioEditor
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                    />
                                }
                            />
                        )
                    }} />
                    <Route path="/user/:id" component={OtherProfile} />
                </div>
                {this.state.isUploaderVisible && <Uploader /> }
            </div>
            </BrowserRouter>
        )
    }
}
