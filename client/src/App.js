import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import getWeb3 from "./getWeb3";
import storageContract from "./contracts/SimpleStorage.json";

import { Home } from "./routes/Home";
import { Search } from "./routes/Search";
import { Upload } from "./routes/Upload";
import { Documents } from "./routes/Documents";
import { NotFound } from "./routes/NotFound";
import { Layout } from "./components/Layout";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      documents: []
    };
  }

  getAllFiles = async () => {
    const contract = this.state.contract;
    var docs = [];
    try {
      const numberOfFiles = await contract.methods.getLatestFileIndex().call();
      for (var i = 1; i <= numberOfFiles; i++) {
        var file = {
          fileName: "",
          fileVersion: "",
          fileContent: "",
          fileUrl: ""
        };
        file.fileUrl = await contract.methods.getHash(i).call();
        file.fileVersion = await contract.methods.getFileVersion(i).call();
        file.fileName = await contract.methods.getFileName(i).call();
        file.fileContent = await contract.methods.getFileContent(i).call();
        docs.push(file);
      }
      return docs;
    } catch (error) {
      console.log(error);
      alert("Error at getAllFiles(), check console for error message");
    }
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const account = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await storageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        storageContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      this.setState({
        web3: web3,
        accounts: account,
        contract: instance
      });
      this.setState({
        documents: await this.getAllFiles()
      });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  render() {
    if (this.state.web3) {
      console.log("Loading Web3, accounts, and contract...");
    }
    return (
      <React.Fragment>
        <Layout title="Test">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} title="ArchiLens" />
              <Route
                exact
                path="/documents"
                render={() => (
                  <Documents docs={this.state.documents} isAuthed={true} />
                )}
              />
              <Route
                exact
                path="/search"
                render={() => (
                  <Search docs={this.state.documents} isAuthed={true} />
                )}
              />
              <Route
                exact
                path="/upload"
                render={() => (
                  <Upload
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                    docs={this.state.documents}
                    isAuthed={true}
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}
