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
  const ast = {
    type: "Program",
    sourceType: "script",
    body: [],
  };

  globals.forEach((el) => ast.body.push(el));

  return ast;
};
