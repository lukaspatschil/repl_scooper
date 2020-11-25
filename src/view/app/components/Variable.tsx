import * as React from 'react';

const Variable = ({ name, typeAnnotation, updateValue }) => {
  const handleChange = (value) => {
    updateValue(convert_value(value), name);
  };

  return (
    <div className="var-container">
      <div className="border">
        <label className="var-lable" htmlFor="variable">{name}</label>
      </div>
      <div className="border">
        <input name="variable" type="text" onChange={(e) => handleChange(e.target.value)}
          placeholder={typeAnnotation ? typeAnnotation.typeAnnotation.type : "any"} />
      </div>
    </div>
  );
};

const convert_value = (value) => {
  if (!Number.isNaN(Number(value))) {
    return Number(value);
  } else if (value === `true`) {
    return true;
  } else if (value === `flase`) {
    return false;
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
      return "any";
  }
};

export default Variable;
