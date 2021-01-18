import { useDebugValue, useEffect, useState } from 'react';
import { generate } from "astring";

export const useCode = (code: any) => {
  const [estree, setEstree] = useState(code);
  const [variables, setVariables] = useState(code?.params);
  const [generated, setGenerated] = useState<string>(undefined);
  const [output, setOutput] = useState<any>(undefined);

  useEffect(() => {
    if (estree) {
      setGenerated(generate(estree));
    }
  }, [estree]);

  const updateOutput = () => {
    const values = [];

    variables.forEach(el => values.push(el?.value));

    const func = new Function(`return ${generated}`)();

    try {
      setOutput(Reflect.apply(func, undefined, values));
    } catch (err) {
      console.log(err);
      setOutput(err.toString());
    }
  }

  const updateCode = (new_est: any) => {
    if (new_est) {
      setEstree(new_est);
    }
  }

  const setVariable = (name: string, value: any) => {
    let variable = variables.find(el => el.name === name);

    if (variable) {
      variable.value = value;
    }

    updateOutput();
  }

  useDebugValue(output || 'Not generated');

  return [generated, updateCode, variables, setVariable, output] as const;
}