import { IVariable } from "./types/types";

export const parseParams = (params) => {
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

export const get_type = (ts_type) => {
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
