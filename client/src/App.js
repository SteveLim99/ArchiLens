import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import "bootstrap/dist/css/bootstrap.css";
import "react-router-dom";
import getWeb3 from "./getWeb3";
import axios from "axios";

import "./App.css";
import TextBox from "./components/TextBox.jsx";
import Button from "./components/Button.jsx";
import TextArea from "./components/TextArea.jsx";
import { Nav, Tab } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestVersion: 0,
      getVersion: 0,
      owner: "",
      fileName: "",
      value: "",
      content: "",
      apiResponse: "",
      web3: null,
      accounts: null,
      contract: null,
      selectedFiles: null,
      files: [
        { fileNameAndVersion: 'fileNameAndVersion', hash: 'hash', fileVersion: 'fileVersion', fileName: 'fileName', fileContent: 'fileContent' },
      ]
    };
  }

  //TODO: JSON PARSER TO PROPERLY PARSE BLOB OBJECT
  //CURRENT PLACEHOLDER RETURNS STRING OF ALL BLOB
  callAPI() {
    axios
      .get("http://localhost:9000/")
      .then(res => this.setState({ apiResponse: res.data }))
      .catch(err => {
        alert(err);
      });
  }

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
      this.callAPI();
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  //Blockchain submission and file upload
  submitForm = async () => {
    const { accounts, contract, value, fileName, content } = this.state;
    const formData = new FormData();
    //The hashedFileName to be used with the upadate contract
    var hashedFileName = "";
    formData.append("file", this.state.selectedFiles);
    axios
      .post("http://localhost:9000/upload", formData, {})
      .then(res => {
        hashedFileName = res.data;
      })
      .catch(e => {
        alert(e);
      });

    // Stores the given value.
    if (fileName === "" || content === "" || value === "") {
      alert("Fields cannot be left empty!");
    } else {
      try {
        await contract.methods
          .set("test", this.state.value, this.state.fileName, this.state.content)
          .send({ from: accounts[0] });
        //File-name hashing output
        // alert(hashedFileName);
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
      console.log(response);
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

  handleFileOnChange = e => {
    // console.log(e.target.files[0]);
    this.setState({
      selectedFiles: e.target.files[0]
    });
  };

  //UPLOAD FUNCTION
  //TODO: INTERGRATE UPLOAD FUNCTION WITH BUTTON COMPONENT
  //BEN
  handleFileOnClick = () => {
    const formData = new FormData();
    formData.append("file", this.state.selectedFiles);
    axios
      .post("http://localhost:9000/upload", formData, {})
      .then(res => {
        alert(res.statusText);
      })
      .catch(e => {
        alert(e);
      });
    this.submitForm();
  };

  handleFormSubmit = e => {
    e.preventDefault();
    alert(this.state.fileName);
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

  handleSearch = async e => {
    e.preventDefault();
    var contract = this.state.contract;
    var version = this.state.getVersion;
    var fileName = this.state.fileName;
    alert(version + fileName);
    this.setState({
      files: [
        { fileNameAndVersion: 'fileNameAndVersion', hash: 'hash', fileVersion: 'fileVersion', fileName: 'fileName', fileContent: 'fileContent' },
      ],
    });
    try {
      var indexNo = await contract.methods.getFileIndex(version, fileName).call();
      console.log(indexNo);
      alert(indexNo);
      this.state.files.push({
        fileNameAndVersion: await contract.methods.getFileNameAndVersion(indexNo).call(),
        hash: await contract.methods.getHash(indexNo).call(),
        fileVersion: await contract.methods.getFileVersion(indexNo).call(),
        fileName: await contract.methods.getFileName(indexNo).call(),
        fileContent: await contract.methods.getFileContent(indexNo).call()
    });
    } catch (error) {
      console.log("Call: " + error);
    }
    this.forceUpdate();
  };

  handleShowAll = async e => {
    e.preventDefault();
    const contract = this.state.contract;
    this.setState({
      files: [
        { fileNameAndVersion: 'fileNameAndVersion', hash: 'hash', fileVersion: 'fileVersion', fileName: 'fileName', fileContent: 'fileContent' },
      ],
    });
    try {
      const noOfFiles = await contract.methods.getLatestFileIndex().call();
      console.log(noOfFiles);
      for (let i = 1; i <= noOfFiles; i++) {
        this.state.files.push({
            fileNameAndVersion: await contract.methods.getFileNameAndVersion(i).call(),
            hash: await contract.methods.getHash(i).call(),
            fileVersion: await contract.methods.getFileVersion(i).call(),
            fileName: await contract.methods.getFileName(i).call(),
            fileContent: await contract.methods.getFileContent(i).call()
        });
      }
    } catch (error) {
      console.log("Call: " + error);
    }
    this.forceUpdate();
  }

  renderTableData() {
    return this.state.files.map((file, index) => {
       const { fileNameAndVersion, fileName, fileVersion, fileContent} = file
       return (
          <tr key={fileNameAndVersion}>
             <td>{fileNameAndVersion}</td>
             <td>{fileName}</td>
             <td>{fileVersion}</td>
             <td>{fileContent}</td>
          </tr>
       )
    })
 }

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
              <h1 className="title"> Test platform v 0.1.2 </h1>
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
              <div class="upload-container">
                <input
                  id="file-picker"
                  type="file"
                  name="image"
                  enctype="multipart/form-data"
                  onChange={this.handleFileOnChange}
                ></input>
              </div>
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
              <h1 className="title"> Retrieval Testing TODO: DS.js </h1>
              <form class="form">
                <p className="mb-1">Refine your results</p>
                <div style={{ marginBottom: "5px" }}>
                  <div style={{ float: "left", width: "30%" }}>
                    <label htmlFor="price-from">File Version</label>
                    <input type="text" value={this.state.getVersion} onChange={ e => this.setState({ getVersion : e.target.value }) }
                    />
                  </div>
                  {/* <div style={{ float: "left", width: "30%" }}>
                    <label htmlFor="postcode">File Type</label>
                    <select className="form-select" id="postcode">
                      <option value="">Choose...</option>
                    </select>
                  </div> */}
                  <div style={{ float: "right" }}>
                    <label htmlFor="sortorder">File Name</label>
                    <input type="text" value={this.state.fileName} onChange={ e => this.setState({ fileName : e.target.value }) }/>
                  </div>
                </div>
                {/* <Button
                  action={this.handleFormSubmit}
                  class={"filterBtn"}
                  title={"Filter"}
                />
                <Button
                  action={this.handleClearForm}
                  class={"searchBtn"}
                  title={"Search"}
                /> */}
                
                {/* <p>here : {this.state.apiResponse}</p> */}
              </form>
              <Button
                  action={this.handleShowAll}
                  class={"filterBtn"}
                  title={"Show All"}
                />
                <Button
                  action={this.handleSearch}
                  class={"searchBtn"}
                  title={"Search"}
                />
         
            <h1 id='title'>Table</h1>
            <table>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}

export default App;
