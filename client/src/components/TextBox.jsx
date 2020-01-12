import React from "react";

const Input = props => {
  return (
    <div className="form-group">
      {/* <label htmlFor={props.name} className="form-label">
        {props.title}
      </label> */}
      <input
        // style={{ marginRight: 1 }}
        class="form-control"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
