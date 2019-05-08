import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.send = this.send.bind(this);
        this.cancel = this.cancel.bind(this);
        this.accept = this.accept.bind(this);
        this.unfriend = this.unfriend.bind(this);
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

    // NOT WORKING:
    send() {
        console.log('SEND REQUEST CLICKED');
        axios
            .post(`/api/friends/${this.props.recipient}`, {})
            .then(() => {
                this.setState({
                    requestAccepted: false,
                    id_recipient: this.props.recipient
                });
            })
            .catch(e => {
                console.log('POST send() ERROR: ', e);
            });
    }

    unfriend() {
        console.log('UNFRIEND CLICKED');
        this.setState({ requestAccepted: undefined });
    }

    accept() {
        console.log('ACCEPT REQUEST CLICKED');
        this.setState({ requestAccepted: true });
    }

    cancel() {
        console.log('CANCEL REQUEST CLICKED');
        this.setState({ requestAccepted: undefined });
    }

    render() {
        if (this.state.requestAccepted === undefined) {
            return (
                <React.Fragment>
                    <button onClick={this.send} className="wide-button">
                        Send friend request
                    </button>
                </React.Fragment>
            );
        } else if (this.state.requestAccepted) {
            return (
                <React.Fragment>
                    <button onClick={this.unfriend} className="wide-button">
                        End friendship
                    </button>
                </React.Fragment>
            );
        } else if (this.state.id_recipient === this.props.recipient) {
            return (
                <React.Fragment>
                    <button onClick={this.cancel} className="wide-button">
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
