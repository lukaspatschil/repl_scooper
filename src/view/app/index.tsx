import { ProgramStatment } from "@typescript-eslint/eslint-plugin";
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import './index.css';

declare global {
    interface Window {
        acquireVsCodeApi(): any;
        code: ProgramStatment;
        global_variables: ProgramStatment[];
        requires: ProgramStatment[];
        code_string: string;
        extensionPath: string;
    }
}

console.log(tsvscode);

ReactDOM.render(
    <App code={window.code} global_variables={window.global_variables} requires={window.requires} />,
    document.getElementById('root')
);