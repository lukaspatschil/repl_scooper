import React, { useState, useEffect } from 'react';

import Code from './components/Code';
import ts from 'typescript';
import { ProgramStatment } from "@typescript-eslint/eslint-plugin";
import Variable from './components/Variable';

type DataProps = {
  vscode: any,
  code: ProgramStatment,
  code_string: string
};

export const App = ({ vscode, code, code_string }: DataProps) => {
  // const [vscode, setVscode] = useState(props.vscode.getState());
  const [result, setResult] = useState(undefined);
  const [variables, setVariables] = useState([]);
  const [evalString, setEvalString] = useState(code_string);

  //? is there a new function on every update?
  const updateValue = (value: any, name: string) => {
    // TODO make imutable
    const tmp = variables;
    tmp[tmp.findIndex(el => el.name === name)].value = value;
    // setVariables(tmp);
  };

  useEffect(() => {
    // TODO add better validation
    if (code.type === "FunctionDeclaration") {
      setVariables(code.params);
    } else if (code.type === "VariableDeclaration"
      && code.declarations[0].init.type === "ArrowFunctionExpression") {
      setVariables(code.declarations[0].init.params);
      // setEvalString(code_string.substring());
      console.log(evalString);
    }
  }, []);

  return (
    <React.Fragment>
      <h1>REPL Scooper</h1>
      <div>
        <h2>Controlls:</h2>
        <input type="button" onClick={() => setResult(reflect(code_string, variables))} value="start" />
        <input type="button" onClick={() => console.log("WIP")} value="reload" />
      </div>
      <div>
        <h2>A list of all your variables: </h2>
        {variables && variables.map((el) => <Variable key={el.name}
          name={el.name} typeAnnotation={el.typeAnnotation} updateValue={updateValue} />)}
      </div>
      <Code code={code_string} />
      <div>
        <h2>Result of your program:</h2>
        <pre>{result}</pre>
      </div>
    </React.Fragment>
  );
};

const reflect = (code_string: string, input: any): any => {
  const values = [];
  for (let item of input) {
    item.value ? values.push(item.value) : values.push(undefined);
  }

  // const func = eval(`(${ts.transpile(code_string)})`);
  const func = new Function('return ' + ts.transpile(code_string))();

  try {
    return Reflect.apply(func, undefined, values);
  } catch (error) {
    return error.toString();
  }
};

export default App;
