import React, { Component } from "react";
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
    getVersion: 0,
    owner: "",
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
    if (fileName === "" || content === "" || value === "") {
      alert("Fields cannot be left empty!");
    } else {
      try {
        await contract.methods
          .set(value, fileName, content)
          .send({ from: accounts[0] });
        // Update state with the result.
        this.setState({
          value: "",
          content: "",
          fileName: ""
        });
      } catch (error) {
        alert("Submission: " + error);
      }
    }
  };

  //TODO: IMPLEMENT GET METHODS
  handleVersionSubmit = async e => {
    e.preventDefault();
    const contract = this.state.contract;
    const val = this.state.getVersion;
    try {
      const response = await contract.methods.getOwner(val).call();
      console.log(response)
      this.setState({ owner: response });
    } catch (error) {
      console.log("Call: " + error);
    }
  };

  //Handles version input
  handleInput = e => {
    let val = e.target.value;
    this.setState({ value: val });
  };

  //Handles getVersion input
  handleInputGet = e => {
    let val = e.target.value;
    this.setState({ getVersion: val });
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
    this.setState({
      value: "",
      content: "",
      fileName: ""
    });
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
                name={"fileName"}
                value={this.state.fileName}
                placeholder={"Enter File Name"}
                handleChange={this.handleName}
              />
              <TextBox
                inputType={"text"}
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
                name={"getValue"}
                value={this.state.getVersion}
                placeholder={"Enter File Version"}
                handleChange={this.handleInputGet}
              />
              <Button
                action={this.handleVersionSubmit}
                class={"btnSubmit"}
                title={"Submit"}
              />
              <p>The Owner's Address is: {this.state.owner}</p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}

export default App;
