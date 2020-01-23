# UCL_Blockchain_AR
# 1 Technologies Required
In order to run the testing env, you would need:
1. node.js and npm
2. Metamask Extension 
3. Solidity extension on VS code
4. Truffle

1. Installing node.js 
  -"sudo apt-get install nodejs"
  -"npm install npm@latest -g"

2. Installing truffle 
  -"npm i -g truffle"
  
 3.Installing metamask
  -Metamask can be found as an extension in google chrome, Mozilla etc.
  
 4.Installing Solidity extension on vsCode
  -Solidity by Juan Blanco
  
<----------------------------------------------------------------------------------------------------------------------------------->
# 2 Setting up
# 2.1 If Migration.json and simpleStorage.json not found in client/src/contracts, re-run truffle, otherwise jump to 2.2.
"truffle migrate --reset --network ropsten"

# 2.2 Install dependancies and packages, channge directory to "client" and carry out installation of packages found in node_modules.
cd client 
npm i 

# 2.3 Launch React App from the same directory 
npm start 

# 2.4 React application should be hosted at localhost:3000, more information can be seen in truffle-config.js
