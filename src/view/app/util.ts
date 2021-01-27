import { Node } from "acorn";
import { useState } from "react";
import { IVariable } from "./types/interface";

export const parseParams = (params: any) => {
  let dataset: IVariable[] = [];

  for (let variable of params) {
    dataset = [...dataset, { name: variable.name } as IVariable];
  }

  return dataset;
};

export const convert_value = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.substring(1, value.length - 2);

      return inner.split(",");
    } else if (value === `true`) {
      return true;
    } else if (value === `false`) {
      return false;
    } else if (!Number.isNaN(Number(value))) {
      return Number(value);
    } else {
      return value;
    }
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

export const make_function_call = (name: string, variables: Array<Node>) => {
  const convertedValues = variables.map((el) => ({
    type: "Literal",
    //@ts-ignore
    value: el.value,
    //@ts-ignore
    raw: "'" + el.value + "'",
  }));

  console.log(values);

  const function_call = {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name,
    },
    arguments: [...convertedValues],
  };

  const l = {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "console",
        },
        property: {
          type: "Identifier",
          name: "log",
        },
      },
      arguments: [function_call],
    },
  };

  const ast: Node = {
    type: "Program",
    // @ts-ignore
    body: [l],
  };

  return ast;
};

export const useForceUpdate = () => {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};
