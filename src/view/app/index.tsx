import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { IVariable } from "./model";

import './index.css';

declare global {
    interface Window {
        acquireVsCodeApi(): any;
        initialData: IVariable;
        code: string;
    }
}

const vscode = window.acquireVsCodeApi();

// console.log(window.initialData);
// console.log(window.code);
console.log(vscode);

ReactDOM.render(
    <App vscode={vscode} initialVariables={window.initialData} code={window.code ? window.code : ""} />,
    document.getElementById('root')
);