import React, { FunctionComponent, useEffect, useState } from 'react';
import { useCode } from './hooks/useCode';
import { useVariable } from './hooks/useVariable';

export const App: FunctionComponent<{
  code: any,
  global_variables: any[],
  code_string: string
}> = ({ code, global_variables, code_string }) => {
  const [generated, setCode, setVariable, output] = useCode(code);

  useEffect(() => {
  }, []);

  return (
    <>
      <button onClick={() => setVariable("a", 1)}>a</button>
      <button onClick={() => setVariable("b", 1)}>b</button>
      {output}
    </>
  );
};
export default App;
