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

//? const vscode = window.acquireVsCodeApi();

console.log(window.initialData);
console.log(window.code);

ReactDOM.render(
    <App vscode="placeholder" initialVariables={window.initialData} code={window.code} />,
    document.getElementById('root')
);