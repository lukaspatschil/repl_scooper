import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Code = ({ code }) => {
  return (
    <React.Fragment>
      <h2>Your current code:</h2>
      <SyntaxHighlighter language="javascript" style={ocean} showLineNumbers={true}>
        {code && "this is a string"}
      </SyntaxHighlighter>
    </React.Fragment>
  );
};

export default Code;