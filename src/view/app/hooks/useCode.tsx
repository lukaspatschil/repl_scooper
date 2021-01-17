import { useEffect, useState } from 'react';
import { generate } from "astring";
import { useVariable } from './useVariable';

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

  useEffect(() => {
    const values = [];

    variables.forEach(el => values.push(el?.value));

    const func = new Function(`return ${generated}`);
    console.log(func);

    try {
      setOutput(Reflect.apply(func, undefined, values));
    } catch (err) {
      console.log(err);
      setOutput(err.toString());
    }
  }, [...variables]);

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
    console.log(variables);
  }

  return [generated, updateCode, setVariable, output] as const;
}