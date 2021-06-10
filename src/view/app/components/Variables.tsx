import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import { IVariable } from '../types/interface';
import Variable from './Variable';
import { parseParams } from '../util';

const Variables: FunctionComponent<{ variables: IVariable[], setVariable: (name: string, value: any) => void, identifier: number }> = ({ variables, setVariable, identifier }) => {
  const [values, setValues] = useState<IVariable[]>([]);
  const inputRef = useRef(null);

  const updateAll = () => {
    if (inputRef.current?.checked) {
      values.forEach(el => setVariable(el.name, el.value));
    }
  };

  const updateSelf = (name: string, value: any) => {
    if (inputRef.current?.checked) {
      setVariable(name, value);
    }

    const variable = values.find(el => el.name === name);

    if (variable) {
      variable.value = value;
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
          name={el.name} updateValue={updateSelf} />)
      }
    </label></React.Fragment>;
};

export default Variables;