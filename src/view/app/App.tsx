import React, { useState } from 'react';

import Variables from './components/Variables';
import Code from './components/Code';
import { IVariable } from './model';

type DataProps = {
  vscode: any,
  initialVariables: IVariable
};

export const App = ({ vscode, initialVariables }: DataProps) => {
  //! This is a placeholder
  const codeString = `function add(num) {
    return num + 1;
  }`;
  //!

  // const [vscode, setVscode] = useState(props.vscode.getState());

  return (
    <React.Fragment>
      <h1>REPL Scooper</h1>
      <Variables variables={initialVariables} />
      <Code code={codeString} />
    </React.Fragment>
  );
};

export default App;
