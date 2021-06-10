import { IVariable } from "./types/interface";
import type { Node } from "acorn";
import { useState } from "react";

export const parseParams = (params: any[]) => {
  let dataset: IVariable[] = [];

  if (!Array.isArray(params)) {
    return dataset;
  }

  for (let variable of params) {
    dataset = [...dataset, { name: variable.name } as IVariable];
  }

  return dataset;
};

export const convert_value = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (error) {
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

export const make_function_call = (name: string, variables: Array<Node>) => {
  const convertedValues = variables.map((el) => ({
    type: "Literal",
    //@ts-ignore
    value: el.value,
    //@ts-ignore
    raw: typeof el.value === "string" ? `'${el.value}'` : `${el.value}`,
  }));

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
          name: console,
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

export const make_clg = (name: string, estree: any) => {
  console.log(JSON.stringify(estree));
  return {
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
      computed: false,
      optional: false,
    },
    arguments: [estree?.expression],
    optional: false,
  };
};

export const make_promise = (function_name: string, function_args: any[]) => {
  const convertedValues = function_args.map((el) => ({
    type: "Literal",
    //@ts-ignore
    value: el.value,
    //@ts-ignore
    raw: typeof el.value === "string" ? `"${el.value}"` : `${el.value}`,
  }));

  const promise = {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "MemberExpression",
        object: {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "CallExpression",
              callee: {
                type: "MemberExpression",
                object: {
                  type: "Identifier",
                  name: "Promise",
                },
                property: {
                  type: "Identifier",
                  name: "resolve",
                },
                computed: false,
                optional: false,
              },
              arguments: [
                {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: function_name,
                  },
                  arguments: [...convertedValues],
                  optional: false,
                },
              ],
              optional: false,
            },
            property: {
              type: "Identifier",
              name: "then",
            },
            computed: false,
            optional: false,
          },
          arguments: [
            {
              type: "ArrowFunctionExpression",
              id: null,
              expression: true,
              generator: false,
              async: false,
              params: [
                {
                  type: "Identifier",
                  name: "data",
                },
              ],
              body: {
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
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Identifier",
                    name: "data",
                  },
                ],
                optional: false,
              },
            },
          ],
          optional: false,
        },
        property: {
          type: "Identifier",
          name: "catch",
        },
        computed: false,
        optional: false,
      },
      arguments: [
        {
          type: "ArrowFunctionExpression",
          id: null,
          expression: true,
          generator: false,
          async: false,
          params: [
            {
              type: "Identifier",
              name: "error",
            },
          ],
          body: {
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
              computed: false,
              optional: false,
            },
            arguments: [
              {
                type: "Identifier",
                name: "error",
              },
            ],
            optional: false,
          },
        },
      ],
      optional: false,
    },
  };

  const ast: Node = {
    type: "Program",
    // @ts-ignore
    body: [promise],
  };

  return ast;
};
