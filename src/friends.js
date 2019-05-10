import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFriends, unfriend, becomeFriends } from "./actions";

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(getFriends());
    }
    render() {
        const { users } = this.props;
        if (!users) {
            console.log("I ain't got nothing to show mama!");
            return null;
        }
        let friends = [];
        let wannabes = [];

        users.map(single => {
            //console.log(single);
            let userlink = "/user/" + single.id;
            if (single.status) {
                friends.push(
                    <div className="friendslist project" key={single.id}>
                        <Link to={userlink}>
                            <span className="profilepic">
                                <img
                                    className="top_profile"
                                    src={single.image_url || "/img/default.png"}
                                    alt={(single.first_name, single.last_name)}
                                />
                            </span>
                            {single.first_name + " " + single.last_name}
                        </Link>
                        <button
                            onClick={() => {
                                this.props.dispatch(unfriend(single.id));
                            }}
                            className="friendbutton"
                        >
                            Unbear
                        </button>
                    </div>
                );
            } else if (single.status == false) {
                wannabes.push(
                    <div className="friendslist project" key={single.id}>
                        <Link to={userlink}>
                            <span className="profilepic">
                                <img
                                    className="top_profile"
                                    src={single.image_url || "/img/default.png"}
                                    alt={(single.first_name, single.last_name)}
                                />
                            </span>
                            {single.first_name + " " + single.last_name}
                        </Link>
                        <button
                            onClick={() =>
                                this.props.dispatch(unfriend(single.id))
                            }
                            className="friendbutton"
                        >
                            Unbear
                        </button>

                        <button
                            onClick={() => {
                                this.props.dispatch(becomeFriends(single.id));
                            }}
                            className="friendbutton"
                        >
                            Become Bearies
                        </button>
                    </div>
                );
            }
        });

        return (
            <section className="project" id="friendspage">
                <div id="friends">
                    <h3>Your Bearies</h3>
                    <div className="container">{friends}</div>
                </div>
                <div id="wannabes">
                    <h3>They wanna become bearies with you</h3>
                    <div className="container">{wannabes}</div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        users: state.users
    };
};

export default connect(mapStateToProps)(Friends);
