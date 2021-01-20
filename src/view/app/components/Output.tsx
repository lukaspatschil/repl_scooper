import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';

export const Output: FunctionComponent<{ value: any }> = ({ value }) => {
  const [output, setOutput] = useState(null);

  useEffect(() => {
    console.log(value);
    Promise.resolve(value).then(data => setOutput(data));
  }, [value]);

  return(
    <Fragment>
      {output}
    </Fragment>
  );
};