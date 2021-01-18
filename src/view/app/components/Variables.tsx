import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import { IVariable } from '../types/types';
import { parseParams } from '../util';

import Variable from './Variable';

const Variables: FunctionComponent<{ variables: IVariable[], setVariable: (name: string, value: any) => void, identifier: number }> = ({ variables, setVariable, identifier }) => {
  const [values, setValues] = useState<IVariable[]>([]);
  const inputRef = useRef(null);

  const updateAll = () => {
    if (inputRef.current?.checked) {
      console.log(values);
      values.forEach(el => setVariable(el.name, el.value));
    }
  };

  useEffect(() => {
    setValues([...parseParams(variables)]);
  }, []);

  return <React.Fragment>
    <label htmlFor={`variables-${identifier}`}>
      <input ref={inputRef} onClick={updateAll} type="radio" defaultChecked={identifier === 0 ? true : false}
        name="vars" id={`variables-${identifier}`} value={`variables-${identifier}`} />
      {
        values.map((el) => <Variable key={el.name + identifier}
          name={el.name} typeAnnotation="any" updateValue={setVariable} />)
      }
    </label></React.Fragment>;
};

export default Variables;