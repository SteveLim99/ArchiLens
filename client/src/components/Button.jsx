import React, { Component } from "react";

const Button = props => {
  console.log(props.style);
  return (
    <div class="form-group">
      <button style={props.style} class={props.class} onClick={props.action}>
        {props.title}
      </button>
    </div>
  );
};

export default Button;
