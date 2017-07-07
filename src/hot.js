import React from 'react';
import { Link } from 'react-router-dom';

class Hot extends React.Component {
    render() {
        const { users } = this.props;
        if (!users) {
            return null;
        }
        const hotUsers = (
            <div className="users">
                {users.map(user => (
                    <div className="user">
                        <img src={user.image} />
                        <div className="buttons">
                            <button>Not</button>
                        </div>
                    </div>
                ))}
            </div>
        );
        return (
            <div id="hot">
                {!users.length && <div>Nobody is hot!</div>}
                {!!users.length && hotUsers}
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/not">See who&apos;s not</Link>
                </nav>
            </div>
        );
    }
}
