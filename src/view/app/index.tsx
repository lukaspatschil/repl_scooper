import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import acorn from 'acorn';

declare global {
    interface Window {
        acquireVsCodeApi(): any;
        code: acorn.Node;
        global_variables: acorn.Node[];
        globalScope: acorn.Node[],
        requires: acorn.Node[];
        code_string: string;
        extensionPath: string;
    }
}

console.log(tsvscode);

ReactDOM.render(
    <App code={window.code} global_variables={window.global_variables} globalScope={window.globalScope} requires={window.requires} />,
    document.getElementById('root')
);