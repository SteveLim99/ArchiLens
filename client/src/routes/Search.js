import React, { Component } from "react";
import { Header } from "../components/Header";
import { DocumentTable } from "../components/DocumentTable";
import { Form, Col, Button } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .form-container {
    background-color: #f0f2f5;
    padding: 2%;
    border-radius: 3px;
    box-shadow: 10px 10px 10px -10px grey;
    width: 95%;
    margin-left: 45px;
    margin-bottom: 30px;
  }
`;

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      searchVersion: "",
      filteredDocs: []
    };
  }

  handleChanges = e => {
    e.preventDefault();
    let id = e.target.id;
    let val = e.target.value;
    if (id === "search-name") {
      this.setState({ searchName: val });
    } else {
      this.setState({ searchVersion: val });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const files = this.props.docs;
    var filteredFiles = [];
    const name = this.state.searchName;
    const version = this.state.searchVersion;
    for (let file in files) {
      var curr = files[file];
      if (
        (curr.fileName.indexOf(name) > -1) &
        (curr.fileVersion.indexOf(version) > -1)
      ) {
        filteredFiles.push(curr);
      }
    }
    this.setState({ filteredDocs: filteredFiles });
  };

  render() {
    return (
      <Styles>
        <div>
          <div>
            <Header title="Advance Search" />
            <Form className="form-container">
              <Form.Row>
                <Form.Group as={Col} controlId="search-name">
                  <Form.Label>File Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter file name"
                    onChange={this.handleChanges}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="search-version">
                  <Form.Label>File Version</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter file version"
                    onChange={this.handleChanges}
                  />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="button" onClick={this.handleSubmit}>
                Search
              </Button>
            </Form>
          </div>
          <div style={{ margin: 20 }}>
            <DocumentTable docs={this.state.filteredDocs} />
          </div>
        </div>
      </Styles>
    );
  }
}
