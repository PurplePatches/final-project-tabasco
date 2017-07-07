import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { receiveUsers } from './actions';

class HotOrNot extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveUsers());
    }
    render() {
        const { users } = this.props;
        if (!users) {
            return null;
        }
        const user = users[0] && (
            <div className="user">
                <img src={users[0].image} />
                <div className="buttons">
                    <button>Hot</button>
                    <button>Not</button>
                </div>
            </div>
        );
        return (
            <div id="hot-or-not">
                {user || <div>Everybody is hot or not already!</div>}
                <nav>
                    <Link to="/hot">See who&apos;s hot</Link>
                    <Link to="/not">See who&apos;s not</Link>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        users: state.users && state.users.filter(user => user.hot == null)
    };
};

export default connect(mapStateToProps)(HotOrNot);
