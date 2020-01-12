import React from "react";

const TextArea = props => (
  // {/* <label className="form-label">{props.title}</label> */}
  <div class="form-group">
    <textarea
      class="form-control"
      name={props.name}
      rows={8}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
    />
  </div>
);

export default TextArea;
