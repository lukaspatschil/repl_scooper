import React, { useState } from 'react';

import Variables from './components/Variables';
import Code from './components/Code';
import { IVariable } from './model';

export const App = (props: any) => {
  const codeString = `function add(num) {
    return num + 1;
  }`;
  const testInput: IVariable[] = [
    {
      name: "x",
      value: "number"
    },
    {
      name: "y"
    }
  ];

  const [vscode, setVscode] = useState(props.vscode.getState());
  const initialData = props.initalData;

  return (
    <React.Fragment>
      <h1>REPL Scooper</h1>
      <Variables variables={testInput} />
      <Code code={codeString} />
    </React.Fragment>
  );
};

export default App;
