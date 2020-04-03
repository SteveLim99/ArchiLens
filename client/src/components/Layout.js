import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .container {
    margin-left: 180px;
    margin-top: 0px;
  }
`;

export const Layout = props => <Styles>{props.children}</Styles>;
