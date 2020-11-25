import React from 'react';

import Variable from './Variable';

const Variables = ({ variables }) => {
  return <div>
    <h2>A list of all your variables: </h2>
    {variables.map((el) => <Variable key={el.name} name={el.name} typeAnnotation={el.typeAnnotation} />)}
  </div>;
};

export default Variables;