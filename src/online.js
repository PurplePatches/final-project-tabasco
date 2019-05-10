import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Online extends React.Component {
    constructor(props) {
        super(props);
        console.log("Online", this.props);
    }

    render() {
        const { users } = this.props;
        console.log(users);
        let onlines = [];
        {
            users != undefined &&
                users.map(single => {
                    if (single.id != this.props.loggedId) {
                        let userlink = "/user/" + single.id;
                        onlines.push(
                            <div
                                className="friendslist project"
                                key={single.id}
                            >
                                <Link to={userlink}>
                                    <span className="profilepic">
                                        <img
                                            className="top_profile"
                                            src={
                                                single.image_url ||
                                                "/img/default.png"
                                            }
                                            alt={
                                                (single.first_name,
                                                single.last_name)
                                            }
                                        />
                                    </span>
                                    {single.first_name + " " + single.last_name}
                                </Link>
                            </div>
                        );
                    }
                });
        }
        return (
            <section className="project" id="friendspage">
                <h3>Here you can see who's online right now</h3>
                <div id="onlineusers">{onlines}</div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        users: state.onlineusers
    };
};

export default connect(mapStateToProps)(Online);
