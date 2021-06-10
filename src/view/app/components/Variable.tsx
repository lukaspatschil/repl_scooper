import React, { FunctionComponent, useState } from 'react';

import { convert_value } from '../util';

const Variable: FunctionComponent<{ name: string, preValue?: any, updateValue: (name: string, value: any) => void }> = ({ name, preValue, updateValue }) => {
  const [value, setValue] = useState((preValue !== undefined ? preValue : ""));

  const handleChange = (eventValue: string) => {
    setValue(eventValue);
    updateValue(name, convert_value(eventValue));
  };

  return (
    <div className="var-container">
      <div className="border">
        <label className="var-lable" htmlFor="variable">{name}</label>
      </div>
      <div className="border">
        <input name="variable" type="text" value={value} onChange={(e) => handleChange(e.target.value)} />
      </div>
    </div>
  );
};

export default Variable;
