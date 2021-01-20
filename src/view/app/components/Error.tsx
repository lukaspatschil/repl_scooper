import React, { Fragment, FunctionComponent } from 'react';

const errorMessage = {
  color: 'red',
};

export const Error: FunctionComponent = ({ children }) => {
  console.log(children);

  return (
    <Fragment>
      <span style={errorMessage}>Error:&nbsp;</span>
        {children}
      <span style={errorMessage}>&nbsp;end</span>
    </Fragment>
  );
};