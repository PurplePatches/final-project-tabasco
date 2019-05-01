import React from 'react';
import axios from './service/axios'

export default class ProfileBrowser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {}
        }

        this.renderDefault = this.renderDefault.bind(this)
        this.renderProfile = this.renderProfile.bind(this)
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get(`/api/getProfile/${this.props.match.params.id}`)
            .then(({data}) => {
                this.setState({profile: data[0]})
                console.log('get user data', data)
                console.log(this.state.profile.url)
            })
            .catch(err => console.log('err user data', err))

    }

    renderProfile(profile) {
        return (
            <div>
                <div>
                    this is the fancy bio.. <br />
                    {this.state.profile.bio} <br />
                </div>               
            </div>
        )
    }

    renderDefault() {
        return (
            <div>
                <div className="bio-area">
                    no bio yet..
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="profile-area">
                {/* <ProfilePic bigger="true" avatar={this.state.profile.url} /> */}
                <h3> {this.state.profile.first} {this.state.profile.last} </h3>
                {this.state.profile.bio ? this.renderProfile(this.state.profile) : this.renderDefault()}
            </div>
        )
    }
}