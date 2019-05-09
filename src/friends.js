import React from "react";
import { fetchFriends } from "./actions";
import { connect } from "react-redux";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(fetchFriends());
    }
    render() {
        return (
            <div>
                <h1> FRIENDS </h1>
                <div className="imagesGallery">
                    {this.props.friends &&
                        this.props.friends.map(item => (
                            <div className="imageBlock" key={item.id}>
                                <img
                                    src={item.useravatar}
                                    className="greyscale profilePicture"
                                />
                                <h5>
                                    {item.firstname} {item.lastname}
                                </h5>
                                <div className="buttonFrame">
                                    <button
                                        className="friendsButton"
                                        onClick="endFriendship"
                                    >
                                        END FRIENDSHIP
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <h1> REQUESTS </h1>
                <div className="imagesGallery">
                    {this.props.requests &&
                        this.props.requests.map(item => (
                            <div className="imageBlock" key={item.id}>
                                <img
                                    src={item.useravatar}
                                    className="greyscale profilePicture"
                                />
                                <h5>
                                    {item.firstname} {item.lastname}
                                </h5>
                                <div className="buttonFrame">
                                    <button
                                        className="friendsButton"
                                        onClick="acceptFriendship"
                                    >
                                        CANCEL FRIENDSHIP
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        requests:
            state.users && state.users.filter(users => users.status == false),
        friends:
            state.users && state.users.filter(users => users.status == true)
    };
};

export default connect(mapStateToProps)(Friends);
