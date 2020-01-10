import React, { Component, useCallback } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import "bootstrap/dist/css/bootstrap.css";
import "react-router-dom";
import getWeb3 from "./getWeb3";

import "./App.css";
import TextBox from "./components/TextBox.jsx";
import Button from "./components/Button.jsx";
import TextArea from "./components/TextArea.jsx";
import { Nav, Tab } from "react-bootstrap";

class App extends Component {
  state = {
    latestVersion: 0,
    getVersion: "",
    getValue: "",
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
    if (fileName == "" || content == "" || value == "") {
      alert("Fields cannot be left empty!");
    } else {
      try {
        await contract.methods
          .set(value, fileName, content)
          .send({ from: accounts[0] });
        // Update state with the result.
        this.setState({ latestVersion: value });
        this.setState({
          value: "",
          content: "",
          fileName: ""
        });
      } catch (error) {
        alert("Error");
      }
    }
    //TODO: IMPLEMENT GET METHODS
    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
  };

  handleVersionInput = async e => {
    const { contract, address } = this.state;
    const val = e.target.value;
    this.setState({ getVersion: val });
    if (contract == null || address == null) {
      alert("Not Connected");
    } else {
      if (val == "") {
        alert("Fields cannot be left empty");
      } else {
        const response = await contract.methods.get(val).call();
        this.setState({ getValue: response });
      }
    }
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
  };

  handleClearForm = e => {
    e.preventDefault();
    this.setState({
      value: "",
      content: "",
      fileName: ""
    });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="contact-form">
        <Tab.Container defaultActiveKey="home">
          <Nav defaultActiveKey="/home" justify variant="tabs" as="ul">
            <Nav.Item as="li">
              <Nav.Link eventKey="home">Submit</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="profile">Retrieve</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content defaultActiveKey="home">
            <Tab.Pane eventKey="home">
              <h1 className="title"> Create new File </h1>
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
              <TextArea
                title={"File Content"}
                value={this.state.content}
                name={"currentFileInfo"}
                handleChange={this.handleContent}
                placeholder={"File Key Contents and Highlights"}
              />
              <div>
                <Button
                  action={this.handleFormSubmit}
                  class={"btnSubmit"}
                  title={"Submit"}
                />
                <Button
                  action={this.handleClearForm}
                  class={"btnClear"}
                  title={"Clear"}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="profile">
              <h1 className="title"> Retrieve File </h1>
              <TextBox
                inputType={"text"}
                title={"Insert File Version"}
                name={"value"}
                value={this.state.getVersion}
                placeholder={"Enter File Version"}
                handleChange={this.handleVersionInput}
              />
              <Button
                action={this.handleFormSubmit}
                class={"btnSubmit"}
                title={"Submit"}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}

export default App;
