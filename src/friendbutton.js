import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.send = this.send.bind(this);
        this.accept = this.accept.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        axios
            .get(`/api/friends/${this.props.recipient}`)
            .then(({ data }) => {
                this.setState({ ...data });
            })
            .catch(e => {
                console.log('GET componentDidMount() ERROR: ', e);
            });
    }

    send() {
        axios
            .post(`/api/friends/${this.props.recipient}/send`)
            .then(() => {
                this.setState({
                    friendship: [
                        {
                            request_accepted: false,
                            id_recipient: this.props.recipient
                        }
                    ]
                });
            })
            .catch(e => {
                console.log('POST send() ERROR: ', e);
            });
    }

    delete() {
        axios
            .post(`/api/friends/${this.props.recipient}/delete`)
            .then(() => {
                this.setState({
                    friendship: [],
                    id_recipient: null
                });
            })
            .catch(e => {
                console.log('POST delete() ERROR: ', e);
            });
    }

    accept() {
        axios
            .post(`/api/friends/${this.props.recipient}/accept`)
            .then(() => {
                this.setState({
                    friendship: [{ request_accepted: true }]
                });
            })
            .catch(e => {
                console.log('POST accept() ERROR: ', e);
            });
    }

    render() {
        if (!this.state.friendship) {
            return null;
        }
        if (this.state.friendship.length == 0) {
            return (
                <React.Fragment>
                    <button onClick={this.send} className="wide-button">
                        Send friend request
                    </button>
                </React.Fragment>
            );
        } else if (this.state.friendship[0].request_accepted) {
            return (
                <React.Fragment>
                    <button onClick={this.delete} className="wide-button">
                        End friendship
                    </button>
                </React.Fragment>
            );
        } else if (
            this.state.friendship[0].id_recipient == this.props.recipient
        ) {
            return (
                <React.Fragment>
                    <button onClick={this.delete} className="wide-button">
                        Cancel friend request
                    </button>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <button onClick={this.accept} className="wide-button">
                        Accept friend request
                    </button>
                </React.Fragment>
            );
        }
    }
}
