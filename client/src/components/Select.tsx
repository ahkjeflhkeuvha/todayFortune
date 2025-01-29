import React from "react";

function SelectField(props: {
  fieldName: string;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  options: string[];
}) {
  const onChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;
    props.onChange(props.fieldName, target.value);
  };
  return (
    <div>
      <label>{props.fieldName}</label>
      <select onChange={onChange} value={props.value} id={props.fieldName}>
        {props.options.map((option) => (
          <option key={option} value={option.substring(7, option.length)}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
