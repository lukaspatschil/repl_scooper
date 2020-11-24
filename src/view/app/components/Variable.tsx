import * as React from 'react';

const Variable = ({ name, typeAnnotation }) => {
  return (
    <div className="var-container">
      <div className="border">
        <label className="var-lable" htmlFor="variable">{name}</label>
      </div>
      <div className="border">
        <input name="variable" type="text" placeholder={typeAnnotation ? get_type(typeAnnotation.typeAnnotation.type) : "any"} />
      </div>
    </div>
  );
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
      return "";
  }
};

export default Variable;
