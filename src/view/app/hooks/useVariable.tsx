import { useState } from 'react';

export const useVariable = (data) => {
  const [variables, setVariables] = useState(data);

  const setVariable = (name: string, value: any) => {
    let variable = variables.find(el => el.name === name);

    if (variable) {
      variable.value = value;
    }
  }

  return [setVariable, ...variables] as const;
}