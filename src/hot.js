import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeNot, receiveUsers } from './actions';

class Hot extends React.Component {
    componentDidMount() {
        !this.props.users && this.props.dispatch(receiveUsers());
    }
    render() {
        const { users } = this.props;
        if (!users) {
            return null;
        }
        const hotUsers = (
            <div className="users">
                {users.map(user => (
                    <div className="user" key={user.id}>
                        <img src={user.image} />
                        <div className="buttons">
                            <button onClick={e => this.props.dispatch(makeNot(user.id))}>Not</button>
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

function mapStateToProps(state) {
    return {
        users: state.users && state.users.filter(user => user.hot)
    }
}

export default connect(mapStateToProps)(Hot);
