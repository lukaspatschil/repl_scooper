import { IDataSet } from "../types/interface";
import { parseParams } from "../util";
import { useState } from "react";

export const useDataset = (code: any) => {
  const [datasets, setDatasets] = useState<IDataSet[]>([]);

  const addDataSet = () => {
    const dataset = parseParams(code?.params);
    setDatasets((el) => [...el, { variables: dataset } as IDataSet]);
  };

  return [datasets, addDataSet] as const;
};
