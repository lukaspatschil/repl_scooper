import { Node } from "acorn";
import { useState } from "react";
import { IVariable } from "./types/types";

export const parseParams = (params: any) => {
  let dataset: IVariable[] = [];

  for (let variable of params) {
    dataset = [...dataset, { name: variable.name } as IVariable];
  }

  return dataset;
};

export const convert_value = (value: string) => {
  if (value === `true`) {
    return true;
  } else if (value === `flase`) {
    return false;
  } else if (!Number.isNaN(Number(value))) {
    return Number(value);
  } else {
    return value;
  }
};

export const get_type = (ts_type: any) => {
  switch (ts_type) {
    case "TSNumberKeyword":
      return "number";
    case "TSStringKeyword":
      return "string";
    case "TSBooleanKeyword":
      return "boolean";
    default:
      return "unknown";
  }
};

export const make_global = (globals: any[]) => {
  const ast: Node = {
    type: "Program",
    // @ts-ignore
    body: [],
  };

  // @ts-ignore
  globals.forEach((el) => ast.body.push(el));

  return ast;
};

export const make_function_call = (name: string) => {
  const function_call = {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name,
      },
      arguments: [],
    },
  };
  const ast: Node = {
    type: "Program",
    // @ts-ignore
    body: [function_call],
  };

  return ast;
};

export const useForceUpdate = () => {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};
