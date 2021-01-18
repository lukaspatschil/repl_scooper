import React, { FunctionComponent } from 'react';

const Variable: FunctionComponent<{ name: string, typeAnnotation?: any, updateValue: (name: string, value: any) => void }> = ({ name, typeAnnotation, updateValue }) => {
  const handleChange = (value: string) => {
    updateValue(name, convert_value(value));
  };

  return (
    <div className="var-container">
      <div className="border">
        <label className="var-lable" htmlFor="variable">{name}</label>
      </div>
      <div className="border">
        <input name="variable" type="text" onChange={(e) => handleChange(e.target.value)}
          placeholder={typeAnnotation ? get_type(typeAnnotation?.typeAnnotation?.type) : "any"} />
      </div>
    </div>
  );
};

const convert_value = (value: string) => {
  if (value === `true`) {
    return true;
  } else if (value === `flase`) {
    return false;
  } else if (!Number.isNaN(Number(value))) {
    return Number(value);
  } else {
    return value;
  }
};

const get_type = (ts_type) => {
  switch (ts_type) {
    case "TSNumberKeyword":
      return "number";
    case "TSStringKeyword":
      return "string";
    case "TSBooleanKeyword":
      return "boolean";
    default:
      return "unknown";
  }
};

export default Variable;
