import React from 'react';
import Variable from './components/Variable';

export const App = () => {
  const test = [
    {
      name: "x",
      value: "number"
    },
    {
      name: "y"
    }
  ];

  return (
    <div>
      <h1>Hello</h1>
      {test.map(x => <Variable name={x.name} value={x.value} />)}
    </div>
  );
};

export default App;
