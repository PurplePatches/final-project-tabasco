import React from 'react';
import Greetee from './greetee';
import TextField from './textfield';

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Kitty'
        };
    }
    render() {
        const changeName = name => this.setState({name});
        return (
            <div>
                Hello, <Greetee name={this.state.name} />!
                <TextField change={changeName} />
            </div>
        );
    }
}
