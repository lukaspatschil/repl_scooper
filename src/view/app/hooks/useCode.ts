import { generate } from "astring";
import { useDebugValue, useEffect, useState } from "react";
import { make_function_call, make_global } from "../util";
import useFilewriter from "./useFilewriter";

export const useCode = (
  code: any,
  global: Array<any>,
  requires: Array<any>
) => {
  const [estree, setEstree] = useState(code);
  const [variables, setVariables] = useState(code?.params);
  const [globals, setGlobals] = useState(global);
  const [generated, setGenerated] = useState<string>("");
  const [output, setOutput] = useState<any>(undefined);
  const writeToFile = useFilewriter();

  useEffect(() => {
    if (estree) {
      setGenerated(generate(estree));
    }
  }, [estree]);

  const updateOutput = () => {
    const values: Array<any> = [];

    variables.forEach((el: { value: any }) => values.push(el?.value));

    const ast = make_global(globals);

    const requires_ast = make_global(requires);

    // @ts-ignore
    const global_string = generate(ast);

    // @ts-ignore
    const require_string = generate(requires_ast);

    console.log(require_string);

    const func = new Function(
      `${require_string}\n${global_string}\nconsole.log((${generated})())`
    );

    const function_call = make_function_call(estree?.id?.name);
    // @ts-ignore
    const something = generate(function_call);

    const fileString = `${require_string}\n${global_string}\n${generated}\n${something}`;

    writeToFile(fileString);

    try {
      // @ts-ignore
      setOutput(Reflect.apply(func, undefined, values));
    } catch (err) {
      console.log(err);
      setOutput(err.toString());
    }
  };

  const setVariable = (name: string, value: any) => {
    const variable = variables.find((el: { name: string }) => el.name === name);

    if (variable) {
      variable.value = value;
    }

    updateOutput();
  };

  const setGlobal = (name: string, value: any) => {
    const variable = globals.find(
      (el: { declarations: { id: { name: string } }[] }) =>
        el?.declarations[0]?.id?.name === name
    );

    if (variable?.declarations[0]?.init) {
      variable.declarations[0].init.value = value;
      if (typeof value === "string") {
        variable.declarations[0].init.raw = `"${value}"`;
      } else {
        variable.declarations[0].init.raw = String(value);
      }
    }

    updateOutput();
  };

  const setCode = (new_estree: any, new_globals: any) => {
    setEstree(new_estree);
    setVariables(code?.params);
    setGlobals(new_globals);
  };

  useDebugValue(output || "Not generated");

  return [setVariable, globals, setGlobal, setCode, output] as const;
};
