import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';

import { Error } from './Error';
import { Success } from './Success';

const nullMessage = {
  color: 'yellow',
};

export const Output: FunctionComponent<{ value: any }> = ({ value }) => {
  const [output, setOutput] = useState(<span style={nullMessage}>There was no output generated yet!</span>);

  useEffect(() => {
    if (value) {
      Promise.resolve(value)
        .then(data => setOutput(<Success>{JSON.stringify(JSON.parse(data), null, 2)}</Success>))
        .catch(error => setOutput(<Error>{error}</Error>));
    }
  }, [value]);

  return(
    <Fragment>
      {output}
    </Fragment>
  );
};