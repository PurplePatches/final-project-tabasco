import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './hello';

let elem = <Hello />;

ReactDOM.render(
    elem,
    document.querySelector('main')
);
