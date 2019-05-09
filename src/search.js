import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { socket } from "./socket";
import { connect } from "react-redux";
import { clearSearch } from "./actions";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.clearSearchField = this.clearSearchField.bind(this);
    }
    search(e) {
        socket.emit("searching", e.target.value);
        if (this.searchResults && this.searchResults.hidden) {
            this.searchResults.hidden = false;
        }
    }
    clearSearchField() {
        this.searchfield.value = "";
        console.log(this.searchResults);
        this.searchResults.hidden = true;
    }
    clearSearch() {
        this.clearSearchField();
        this.props.dispatch(clearSearch());
    }
    render() {
        return (
            <div className="search">
                <input
                    onInput={this.search}
                    className="searchfield"
                    ref={searchfield => (this.searchfield = searchfield)}
                />
                <Link to="/search">
                    <button onClick={this.clearSearchField}>Search</button>
                </Link>
                {this.props.searchResults && (
                    <div
                        className="searchResults"
                        ref={searchResults =>
                            (this.searchResults = searchResults)
                        }
                    >
                        {location.pathname != "/search" &&
                            this.props.searchResults.map(name => {
                                return (
                                    <div
                                        onClick={this.clearSearch}
                                        key={name.id}
                                        className="searchResult"
                                    >
                                        <Link to={"/user/" + name.id}>
                                            {name.first_name} {name.last_name}
                                        </Link>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { searchResults: state.searchResults };
}

export default connect(mapStateToProps)(Search);
