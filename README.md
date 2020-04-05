# UCL_Avanade_Blockchain_AR_Concept

## 1. Technologies Required

  1. Ensure that node.js and npm is installed.
  2. Metamask Extension on your browser
  3. Solidity extension on VS code
  4. Truffle

## 2. Setting up

  1. git clone the repository.
  2.The code is essentially splitted into 4 parts:
  
    - `The React front-end` 
    - `The back-end`  
    - `The blockchain`
    - `The Unity front-end`

  2.1 If Migration.json and simpleStorage.json not found in client/src/contracts, re-run truffle, otherwise jump to 3. There are 3 networks we can deploy our contracts to. You can add your own networks in truffle-config.js.
    - `live - the Ropsten Test Network`
    - `azure - the Azure Blockchain Service`
    - `develop - our local blockchain hosted through Ganache`
  
  2.2 We deploy the contract through truffle, at the root directory.
  
    - `truffle migrate --reset --network live`
    
  3. At the root directory.
  
     - `npm install`
     
  4. cd into api folder and npm install
  
     - `cd api`
     - `npm install`
  
  5. cd into client folder and npm install
  
     - `cd ../client`
     - `npm install`

## 2. Starting the Nodejs Backend

  - In the api directory 
    - `npm start`

## 3. Starting the React Frontend

  - In the client directory 
    - `npm start`
    
## 4. Nodejs Backend Endpoints

- `/` -- Homepage, gets list of all the blobs currentony on the Azure Blob Storage.
- `/upload` -- Hashes files and upload them to the Azure Blob Storage, server should respond with the file download URL link.

## 5. React Frontend Functionalities

The dashboard can be used to display a list of datas stored on the blockchain, (name, version, content and the download url link for the attached file). There is also a search bar that allows users to search through the document list on the homepage to find for a specific document on the blockchain.

Clicking on the upload tab will allow users to upload data onto the blockchain. Upon upload, the form first goes through two validation checks, then the file will first be uploaded, the blockchain upload will wait for a response from the server before it continues its upload to the blockchain.

