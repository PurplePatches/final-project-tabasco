import React from 'react';

export default function Greetee(props) {
    return (
        <strong
            style={{
                color: 'tomato',
                textTransform: 'capitalize'
            }}
            className={'blah' + Date.now()}
        >{props.name}</strong>
    );
}
