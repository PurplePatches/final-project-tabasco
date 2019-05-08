import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post('/login', this.state)
            .then(({ data }) => {
                if (data.success) {
                    location.replace('/');
                }
            })
            .catch(err => {
                console.log('handleSubmit() POST /register ERROR: ', err);
            });
    }

    render() {
        return (
            <React.Fragment>
                <form className="login-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="e-mail"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                        onChange={this.handleChange}
                    />
                    <div className="empty" />
                    <button type="submit" onClick={this.handleSubmit}>
                        Log In
                    </button>
                </form>
                <p>
                    Please log in. If you are not registered yet, click{' '}
                    <Link to="/">here</Link>.
                </p>
            </React.Fragment>
        );
    }
}

// To Do:
// create error message for missing e-mail address
// create error message for missing password
