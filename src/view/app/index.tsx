import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { ProgramStatment } from "@typescript-eslint/eslint-plugin";


import './index.css';

declare global {
    interface Window {
        acquireVsCodeApi(): any;
        code: ProgramStatment;
        code_string: string;
    }
}

const vscode = window.acquireVsCodeApi();

console.log(window.code);
console.log(window.code_string);
console.log(vscode);

ReactDOM.render(
    <App vscode={vscode} code={window.code} code_string={window.code_string} />,
    document.getElementById('root')
);