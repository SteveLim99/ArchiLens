import React from "react";
import { Header } from "../components/Header";
import styled from "styled-components";

const Styles = styled.div`
  .menuCardsRow {
    width: 80%;
    max-width: 800px;
    margin: 50px auto;
    margin-top: -100px;
    display: flex;
  }

  .menuCards {
    background: #f0f2f5;
    box-shadow: 0px 10px 10px -7px grey;
    width: 40%;
    height: auto;
    margin: 0 2%;
    padding: 30px;
    transition: all 1s;
    cursor: pointer;
    text-align: center;
    font-size: large;
  }

  .menuCards:hover {
    box-shadow: 20px 20px 20px -10px dimgrey;
  }

  img {
    max-width: 80%;
    max-height: 80%;
  }

  .footerText {
    text-align: center;
    font-size: small;
    margin-top: 425px;
  }
`;

export const Home = () => (
  <Styles>
    <Header title="ARchiLens" />
    <div className="menuCardsRow">
      <div
        className="menuCards"
        onClick={() => {
          window.location.href = "/documents";
        }}
      >
        <img src={require("../images/docs.png")} alt="docs.png missing" />
        <div className="menuLabels">Documents List</div>
      </div>
      <div
        className="menuCards"
        onClick={() => {
          window.location.href = "/search";
        }}
      >
        <img src={require("../images/search.png")} alt="search.png missing" />
        <div className="menuLabels">Advance search</div>
      </div>
      <div
        className="menuCards"
        onClick={() => {
          window.location.href = "/upload";
        }}
      >
        <img src={require("../images/upload.png")} alt="upload.png missing" />
        <div className="menuLabels">Upload</div>
      </div>
    </div>
    <p className="footerText">
      Find out More:{" "}
      <a href="http://students.cs.ucl.ac.uk/2019/group38/index.html">
        http://students.cs.ucl.ac.uk/2019/group38/index.html
      </a>
    </p>
  </Styles>
);
