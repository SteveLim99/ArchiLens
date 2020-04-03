import React, { Component } from "react";
import { Header } from "../components/Header";
import { DocumentTable } from "../components/DocumentTable";

export class Documents extends Component {
  render() {
    return (
      <div>
        <Header title="Document List" />
        <div style={{ margin: 20 }}>
          <DocumentTable docs={this.props.docs} />
        </div>
      </div>
    );
  }
}
