import React, { FunctionComponent, useEffect, useState } from 'react';
import Code from './components/Code';
import { Output } from './components/Output';
import Variable from './components/Variable';
import Variables from './components/Variables';
import { useCode } from './hooks/useCode';
import { useDataset } from './hooks/useDataset';
import { useForceUpdate } from './util';

export const App: FunctionComponent<{
  code: any,
  global_variables: Array<any>,
  requires: Array<any>
}> = ({ code, global_variables, requires }) => {
  const [output, setOutput] = useState(null);
  const [setVariable, globals, setGlobal, setCode, test] = useCode(code, global_variables, requires);
  const [datasets, addDataSet] = useDataset(code);
  const forceUpdate = useForceUpdate();

  // listen for new input from the repl code
  window.addEventListener('message', event => {
    const message = event.data;

    switch (message.command) {
      case 'update':
        setCode(message.code, message.global_variables);
        window.code_string = message.code_string;
        forceUpdate();
        break;
      case 'output':
        console.log(message.output);
        setOutput(message.output);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    addDataSet();
  }, []);

  return (
    <>
      <h1>REPL Code</h1>
      <section>
        <h2>Your global variables:</h2>
        {globals && globals.map(el => <Variable key={el?.declarations[0]?.id?.name} name={el?.declarations[0]?.id?.name} preValue={el?.declarations[0]?.init?.value} updateValue={setGlobal} />)}
      </section>
      <section>
        <h2>Your function variables:</h2>
        <button onClick={addDataSet}>add set</button>
        {datasets && datasets.map((el, id) => <Variables variables={el.variables} setVariable={setVariable} identifier={id} key={id} />)}
      </section>
      <section>
        <h2>Your code:</h2>
        <Code code={window.code_string ? window.code_string : ""} />
      </section>
      <section>
        <h2>Your output:</h2>
        <Output value={output} />
      </section>
    </>
  );
};
export default App;
