import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { socket } from "./socket";
import { connect } from "react-redux";
import { clearSearch } from "./actions";

class Searchpage extends React.Component {
    constructor(props) {
        super(props);
        this.clearSearch = this.clearSearch.bind(this);
    }

    clearSearch() {
        this.props.dispatch(clearSearch());
    }
    render() {
        console.log(this.props);
        return (
            <div className="searchPage">
                {this.props.searchResults &&
                    this.props.searchResults.map(name => {
                        return (
                            <div
                                onClick={this.clearSearch}
                                key={name.id}
                                className="searchPageResults"
                            >
                                <Link to={"/user/" + name.id}>
                                    <img src={name.picture} />
                                    <h2>
                                        {name.first_name} {name.last_name}
                                    </h2>
                                </Link>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { searchResults: state.searchResults };
}

export default connect(mapStateToProps)(Searchpage);
