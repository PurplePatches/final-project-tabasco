import React from 'react';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: {},
            isBioVisible: false
        };
        this.updatePicture = this.updatePicture.bind(this);
        this.toggleBio = this.toggleBio.bind(this);
    }

    updatePicture(image) {
        this.setState({ user_picture: image });
    }

    toggleBio() {
        this.setState({ isBioVisible: true });
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className={
                        this.props.isUploaderVisible
                            ? 'flex-container-profile blur'
                            : 'flex-container-profile'
                    }
                >
                    <ProfilePic
                        image={this.props.image}
                        first={this.props.first}
                    />
                    <div className="text-bio-container">
                        <h1>
                            {this.props.first} {this.props.last}
                        </h1>

                        {this.props.bio &&
                        Object.keys(this.props.bio).length > 0 ? (
                                <p>{this.props.bio}</p>
                            ) : (
                                <p>no bio yet</p>
                            )}

                        {this.props.bio &&
                        Object.keys(this.props.bio).length > 0 ? (
                                <button onClick={this.toggleBio}>Edit bio</button>
                            ) : (
                                <button onClick={this.toggleBio}>Add bio</button>
                            )}

                        {this.state.isBioVisible && (
                            <BioEditor
                                changeBio={this.props.changeBio}
                                passUpdatedBio={update => {
                                    this.props.passUpdatedBio(update);
                                }}
                                isBioVisible={this.state.isBioVisible}
                                closeTextarea={() => {
                                    this.setState({ isBioVisible: false });
                                }}
                            />
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

// TO DO:

// add transition for modal
