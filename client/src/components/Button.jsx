import React from "react";

const Button = props => {
  console.log(props.style);
  return (
    <button style={props.style} class={props.class} onClick={props.action}>
      {props.title}
    </button>
  );
};

export default Button;
