import React from 'react';

import Variable from './Variable';
import { IVariable } from '../model';

const Variables = ({ variables }) => {
  return <section>
    <h2>A list of all your variables: </h2>
    {variables.map((el: IVariable) => <Variable key={el.name} name={el.name} value={el.value} />)}
  </section>;
};

export default Variables;