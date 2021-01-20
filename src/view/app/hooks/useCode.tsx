import { generate } from "astring";
import { useDebugValue, useEffect, useState } from 'react';
import { make_global } from '../util';


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

    variables.forEach(el => values.push(el?.value));

    const ast = make_global(globals);

    // @ts-ignore
    const global_string = generate(ast);

    const func = new Function(`${global_string}return ${generated}`)();

    try {
      setOutput(Reflect.apply(func, undefined, values));
    } catch (err) {
      console.log(err);
      setOutput(err.toString());
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
      variable.declarations[0].init.raw = String(value);
    }

    updateOutput();
  };

  const setCode = (new_estree: any, new_globals: any) => {
    setEstree(new_estree);
    setVariables(code?.params);
    setGlobals(new_globals);
  }

  useDebugValue(output || 'Not generated');

  return [setVariable, globals, setGlobal, setCode, output] as const;
}