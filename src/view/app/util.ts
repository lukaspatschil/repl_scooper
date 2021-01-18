import { IVariable } from "./types/types";

export const parseParams = (params) => {
  let dataset: IVariable[] = [];

  for (let variable of params) {
    dataset = [...dataset, { name: variable.name } as IVariable];
  }

  return dataset;
};
