import { useDebugValue, useEffect, useState } from 'react';
import { generate } from "astring";


export const useCode = (code: any, global: any) => {
  const [estree, setEstree] = useState(code);
  const [variables, setVariables] = useState(code?.params);
  const [globals, setGlobals] = useState(global);
  const [generated, setGenerated] = useState<string>(undefined);
  const [output, setOutput] = useState<any>(undefined);

  useEffect(() => {
    if (estree) {
      setGenerated(generate(estree));
    }
  }, [estree]);

  const updateOutput = () => {
    const values = [];
    let globalString = '';

    variables.forEach(el => values.push(el?.value));

    console.log(generate(globals));

    // globals.forEach(el => globalString += generate(el));

    const func = new Function(`${globalString}return ${generated}`)();

    try {
      setOutput(Reflect.apply(func, undefined, values));
    } catch (err) {
      console.log(err);
      setOutput(err.toString());
    }
  };

  const updateCode = (new_est: any) => {
    if (new_est) {
      setEstree(new_est);
    }
  };

  const setVariable = (name: string, value: any) => {
    const variable = variables.find(el => el.name === name);

    if (variable) {
      variable.value = value;
    }

    updateOutput();
  };

  const setGlobal = (name: string, value: any) => {
    const variable = globals.find(el => el?.declarations[0]?.id?.name === name);

    if (variable?.declarations[0]?.init) {
      variable.declarations[0].init.value = value;
    }

    console.log(globals);

    updateOutput();
  };

  useDebugValue(output || 'Not generated');

  return [generated, updateCode, variables, setVariable, globals, setGlobal, output] as const;
}