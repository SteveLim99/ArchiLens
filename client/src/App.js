import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import "bootstrap/dist/css/bootstrap.css";
import getWeb3 from "./getWeb3";

import "./App.css";
import TextBox from "./components/TextBox.jsx";
import Button from "./components/Button.jsx";
import TextArea from "./components/TextArea.jsx";

class App extends Component {
  state = {
    latestVersion: 0,
    fileName: "",
    value: "",
    content: "",
    web3: null,
    accounts: null,
    contract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.\
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  submitForm = async () => {
    const { accounts, contract, value, fileName, content } = this.state;

    // Stores the given value.
    await contract.methods
      .set(value, fileName, content)
      .send({ from: accounts[0] });

    //TODO: IMPLEMENT GET METHODS
    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ latestVersion: value });
  };

  //Handles version input
  handleInput = e => {
    let val = e.target.value;
    this.setState({ value: val });
  };

  //Handles file name input
  handleName = e => {
    let newName = e.target.value;
    this.setState({ fileName: newName });
  };

  //Handles file content
  handleContent = e => {
    let newContent = e.target.value;
    this.setState({ content: newContent });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.submitForm();
    console.log("pushed");
  };

  handleClearForm = e => {
    e.preventDefault();
    this.setState({
      value: ""
    });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      // <div className="App">
      <div class="container contact-form">
        <h1> Create new File </h1>
        <div class="row">
          <div class="col-md-6">
            <TextBox
              inputType={"int"}
              title={"Insert File Name"}
              name={"fileName"}
              value={this.state.fileName}
              placeholder={"Enter File Name"}
              handleChange={this.handleName}
            />
            <TextBox
              inputType={"text"}
              title={"Insert File Version"}
              name={"value"}
              value={this.state.value}
              placeholder={"Enter File Version"}
              handleChange={this.handleInput}
            />
            <Button
              action={this.handleFormSubmit}
              class={"btnSubmit"}
              title={"Submit"}
              style={{ marginRight: 1 + "em" }}
            />
            <Button
              action={this.handleClearForm}
              class={"btnClear"}
              title={"Clear"}
              style={{ marginRight: 1 + "em" }}
            />
          </div>
          <div class="col-md-6">
            <TextArea
              title={"File Content"}
              value={this.state.content}
              name={"currentFileInfo"}
              handleChange={this.handleContent}
              placeholder={"File Key Contents and Highlights"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
