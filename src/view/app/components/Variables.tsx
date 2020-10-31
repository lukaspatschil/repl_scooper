import React from 'react';

import Variable from './Variable';

const Variables = ({ variables }) => {
  return <section>
    <h2>A list of all your variables: </h2>
    {variables.map(el => <Variable name={el.name} value={el.value} />)}
  </section>;
};

export default Variables;