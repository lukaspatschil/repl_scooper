import { Variable } from "../model";
import * as React from 'react';

const Variable = ({ name, value }) => {
  return (
    <div>
      <label htmlFor="variable">{ name }</label>
      <input name="variable" type="text" placeholder={ value ? value : "" }/>
    </div>
  );
};

export default Variable;
