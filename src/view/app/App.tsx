import React from 'react';

import Variables from './components/Variables';
import Code from './components/Code';
import { IVariable } from './model';

export const App = () => {
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

  return (
    <React.Fragment>
      <h1>REPL Scooper</h1>
      <Variables variables={testInput} />
      <Code code={codeString} />
    </React.Fragment>
  );
};

export default App;
