import React, { useState, useEffect, useRef } from 'react';
import { IPropsVariables, IVariable } from '../types/types';

import Variable from './Variable';

const Variables = ({ variables, updateValues, identifier }: IPropsVariables) => {
  const [values, setValues] = useState<IVariable[]>([]);
  const inputRef = useRef(null);

  const saveValues = (value: any, name: string) => {
    // TODO make imutable
    const tmp = values;
    tmp[tmp.findIndex(el => el.name === name)].value = value;
    dosomething();
    // setVariables(tmp);
  };

  const dosomething = () => {
    if (inputRef.current?.checked) {
      updateValues(values);
    }
  };

  useEffect(() => {
    setValues([...parseParams(variables)]);
  }, []);

  return <React.Fragment>
    <label htmlFor={`variables-${identifier}`}>
      <input ref={inputRef} onClick={dosomething} type="radio" defaultChecked={identifier === 0 ? true : false}
        name="vars" id={`variables-${identifier}`} value={`variables-${identifier}`} />
      {
        values.map((el) => <Variable key={el.name}
          name={el.name} typeAnnotation="any" updateValue={saveValues} />)
      }
    </label></React.Fragment>;
};

const parseParams = (params) => {
  let dataset: IVariable[] = [];

  for (let variable of params) {
    dataset = [...dataset, { name: variable.name } as IVariable];
  }

  console.log(dataset);
  return dataset;
};

export default Variables;