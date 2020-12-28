import React, { useState, useEffect } from 'react';

import Code from './components/Code';
import { ProgramStatment } from "@typescript-eslint/eslint-plugin";
import { transpile } from 'typescript';
import Variable from './components/Variable';
import { generate } from "astring";

type DataProps = {
  vscode: any,
  code: ProgramStatment,
  global_variables: ProgramStatment[],
  code_string: string
};

export const App = ({ vscode, code, global_variables, code_string }: DataProps) => {
  // const [vscode, setVscode] = useState(props.vscode.getState());
  const [result, setResult] = useState(undefined);
  const [variables, setVariables] = useState([]);
  const [gvariables, setGvariables] = useState([]);

  //? is there a new function on every update?
  const updateValue = (value: any, name: string) => {
    // TODO make imutable
    const tmp = variables;
    tmp[tmp.findIndex(el => el.name === name)].value = value;
    setResult(reflect(code, variables, gvariables));
    // setVariables(tmp);
  };

  const updateGvalue = (value: any, name: string) => {
    // TODO make imutable
    const tmp = gvariables;
    tmp[tmp.findIndex(el => el.declarations[0].id.name === name)].declarations[0].init.value = value;
    tmp[tmp.findIndex(el => el.declarations[0].id.name === name)].declarations[0].init.raw = `"${value}"`;
    setResult(reflect(code, variables, gvariables));
    // setVariables(tmp);
  };

  useEffect(() => {
    // TODO add better validation
    if (code.type === "FunctionDeclaration") {
      setVariables(code.params);
      setGvariables(global_variables);
    } else if (code.type === "VariableDeclaration"
      && code.declarations[0].init.type === "ArrowFunctionExpression") {
      setVariables(code.declarations[0].init.params);
    }

    let oldState = vscode.getState();
    console.log(oldState);
  }, []);

  return (
    <React.Fragment>
      <h1>REPL Scooper</h1>
      <div>
        <h2>A list of all your global: </h2>
        {variables && gvariables.map((el) => <Variable key={el.declarations[0].id.name}
          name={el.declarations[0].id.name} typeAnnotation={el.declarations[0].id.typeAnnotation} updateValue={updateGvalue} />)}
      </div>
      <div>
        <h2>A list of all your function: </h2>
        {variables && variables.map((el) => <Variable key={el.name}
          name={el.name} typeAnnotation={el.typeAnnotation} updateValue={updateValue} />)}
      </div>
      <Code code={code_string} />
      <div>
        <h2>Result of your program:</h2>
        <p>{result}</p>
      </div>
    </React.Fragment>
  );
};

const reflect = (code: ProgramStatment, input: any, global_scope: any): any => {
  const values = [];
  let code_string: string;

  if (code.type === "FunctionDeclaration") {
    code_string = generate(code);
  } else if (code.type === "VariableDeclaration"
    && code.declarations[0].init.type === "ArrowFunctionExpression") {
    code_string = generate(code.declarations[0].init);
  }

  for (let item of input) {
    item.value ? values.push(item.value) : values.push(undefined);
  }

  let globalstring = "";
  for (let item of global_scope) {
    globalstring += generate(item);
  }

  const func = new Function(transpile(globalstring) + 'return ' + transpile(code_string))();

  try {
    return Reflect.apply(func, undefined, values);
  } catch (error) {
    console.log(error);
    return error.toString();

  }
};

export default App;
