import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Online extends React.Component {
    constructor(props) {
        super(props);
        //console.log("Online", this.props);
    }

    render() {
        const { users } = this.props;
        console.log(users);
        let onlines = [];
        {
            users != undefined &&
                users.map(single => {
                    let userlink = "/user/" + single.id;
                    onlines.push(
                        <div className="friendslist project" key={single.id}>
                            <Link to={userlink}>
                                <span className="profilepic">
                                    <img
                                        className="top_profile"
                                        src={single.image_url}
                                        alt={
                                            (single.first_name,
                                            single.last_name)
                                        }
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
                });
        }
        return <div> {onlines} </div>;
    }
}

const mapStateToProps = function(state) {
    console.log("This is the state ", state);
    return {
        users: state.onlineusers
    };
};

export default connect(mapStateToProps)(Online);
