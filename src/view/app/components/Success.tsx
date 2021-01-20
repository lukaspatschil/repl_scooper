import React, { Fragment, FunctionComponent } from 'react';

const successMessage = {
  color: 'green',
};

export const Success: FunctionComponent = ({ children }) => {
  console.log(children);

  return (
    <Fragment>
      <span style={successMessage}>Success:&nbsp;</span>
        {children}
      <span style={successMessage}>&nbsp;end</span>
    </Fragment>
  );
};