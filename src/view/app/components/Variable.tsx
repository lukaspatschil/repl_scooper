import * as React from 'react';

import { IVariable } from '../model';

const Variable = ({ name, value }: IVariable) => {
  return (
    <div className="var-container">
      <div className="border">
        <label className="var-lable" htmlFor="variable">{name}</label>
      </div>
      <div className="border">
        <input name="variable" type="text" placeholder={value ? value : ""} />
      </div>
    </div>
  );
};

export default Variable;
