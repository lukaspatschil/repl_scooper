export interface IVariable {
  name: string;
  value: any;
}

export interface IDataSet {
  key?: number;
  variables: IVariable[];
}

export interface IPropsVariables {
  variables: IVariable[];
  updateValues: (values: IVariable[]) => void;
  identifier: number;
}
