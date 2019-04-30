import React from 'react';

class OtherProfile extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get('/user/' + id).then(({data}) => {
            if (data.redirect) {
                this.props.history.push('/');
            }

        })
    }
}
