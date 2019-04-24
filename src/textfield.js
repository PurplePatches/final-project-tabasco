import React from 'react';

export default function TextField(props) {
    const handleEvent = e => {
        props.change(e.target.value);
    }
    return (
        <div>
            <input type="text" onChange={handleEvent} />
        </div>
    );
}
