import React from "react";

function Calendar(props: {
  fieldName: string;
  value: string;
  onChange: (fieldName: string, value: string) => void;
}) {
  const onChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;
    props.onChange(props.fieldName, target.value);
  };

  return (
    <div>
      <label>{props.fieldName}</label>
      <input
        type="date"
        id={props.fieldName}
        value={props.value}
        onChange={onChange}
      />
    </div>
  );
}

export default Calendar;
