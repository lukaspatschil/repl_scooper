import React from 'react';

import Variable from './Variable';

const Variables = ({ variables, updateValue, identifier }) => {
  return <React.Fragment>
    <label htmlFor={`variables-${identifier}`}>
      <input type="radio" name="vars" id={`variables-${identifier}`} value={`variables-${identifier}`} />
      {
        variables.map((el) => <Variable key={el.name}
          name={el.name} typeAnnotation={el.typeAnnotation} updateValue={updateValue} />)
      }
    </label></React.Fragment>;
};

export default Variables;