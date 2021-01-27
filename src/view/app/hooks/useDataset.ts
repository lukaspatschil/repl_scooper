import { useState } from 'react';
import { IDataSet } from '../types/interface';
import { parseParams } from '../util';

export const useDataset = (code: any) => {
  const [datasets, setDatasets] = useState<IDataSet[]>([]);

  const addDataSet = () => {
    const dataset = parseParams(code.params);
    setDatasets(el => [...el, { variables: dataset } as IDataSet]);
  };

  return [datasets, addDataSet] as const;
};