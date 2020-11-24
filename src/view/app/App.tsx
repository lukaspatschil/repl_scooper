import React, { useState } from 'react';

import Variables from './components/Variables';
import Code from './components/Code';
import { ProgramStatment } from "@typescript-eslint/eslint-plugin";

type DataProps = {
  vscode: any,
  code: ProgramStatment,
  code_string: string
};

export const App = ({ vscode, code, code_string }: DataProps) => {
  // const [vscode, setVscode] = useState(props.vscode.getState());
  let variables;

  if (code.type === "FunctionDeclaration") {
    variables = code.params;
  } else if (code.type === "ArrowFunctionExpression") {
    variables = code.declarations[0].init.params;
  }

  return (
    <React.Fragment>
      <h1>REPL Scooper</h1>
      <Variables variables={variables} />
      <Code code={code_string} />
    </React.Fragment>
  );
};

export default App;
