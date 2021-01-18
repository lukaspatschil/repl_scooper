import React, { FunctionComponent, useEffect, useState } from 'react';
import Variables from './components/Variables';
import { useCode } from './hooks/useCode';
import { useDataset } from './hooks/useDataset';
import { IDataSet, IVariable } from './types/types';

export const App: FunctionComponent<{
  code: any,
  global_variables: any[],
  code_string: string
}> = ({ code, global_variables, code_string }) => {
  const [generated, setCode, variables, setVariable, output] = useCode(code);
  const [datasets, addDataSet] = useDataset(code);

  useEffect(() => {
    addDataSet();
  }, []);

  return (
    <>
      <h2>Your function variables:</h2>
      <button onClick={addDataSet}>add set</button>
      {datasets.map((el, id) => <Variables variables={el.variables} setVariable={setVariable} identifier={id} key={id} />)}
      <h2>Your output:</h2>
      {output}
    </>
  );
};
export default App;
