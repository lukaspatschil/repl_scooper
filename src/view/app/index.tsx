import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { IVariable } from "./model";

import './index.css';

declare global {
    interface Window {
        acquireVsCodeApi(): any;
        initialData: IVariable;
    }
}

//? const vscode = window.acquireVsCodeApi();

console.log(window.initialData);

ReactDOM.render(
    <App vscode="placeholder" initialVariables={window.initialData} />,
    document.getElementById('root')
);