import React, { useState, useEffect } from 'react';

import Code from './components/Code';
import { ProgramStatment } from "@typescript-eslint/eslint-plugin";
import { transpile } from 'typescript';
import Variable from './components/Variable';
import { generate } from "astring";
import Variables from './components/Variables';
import { IDataSet, IVariable } from "./types/types";

type IDataProps = {
  vscode: any,
  code: ProgramStatment,
  global_variables: ProgramStatment[],
  code_string: string
};

export const App = ({ vscode, code, global_variables, code_string }: IDataProps) => {
  // const [vscode, setVscode] = useState(props.vscode.getState());
  const [result, setResult] = useState(undefined);
  const [variables, setVariables] = useState([]);
  const [gvariables, setGvariables] = useState([]);
  const [dataset, setDataset] = useState<IDataSet[]>([]);

  //? is there a new function on every update?
  const updateValue = (values: IVariable[]) => {
    // TODO make imutable
    const tmp = variables;
    for (let value of values) {
      tmp[tmp.findIndex(el => el.name === value.name)].value = value.value;
    }
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

  const addDataSet = () => {
    const something = parseParams(code.params);
    setDataset(el => [...el, { variables: something } as IDataSet]);
  }

  useEffect(() => {
    // TODO add better validation
    if (code.type === "FunctionDeclaration") {
      setVariables(code.params);
      console.log(code.params);
      setGvariables(global_variables);
    } else if (code.type === "VariableDeclaration"
      && code.declarations[0].init.type === "ArrowFunctionExpression") {
      setVariables(code.declarations[0].init.params);
    }

    let oldState = vscode.getState();
    console.log(oldState);
    addDataSet();
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
        <h2>A list of all your function variables:</h2>
        <button onClick={addDataSet}>add set</button>
        {
          dataset.map((el, id) => <Variables variables={el.variables} updateValues={updateValue} identifier={id} key={id} />)
        }

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

const parseParams = (params) => {
  let dataset: IVariable[] = [];

  for (let variable of params) {
    dataset = [...dataset, { name: variable.name } as IVariable];
  }

  console.log(dataset);
  return dataset;
};

export default App;
