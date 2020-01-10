# UCL_Blockchain_AR

In order to run the testing env, you would need:
1. node.js and npm
2. truffle and ganache 
3. metamask 
4. Solidity extension on VS code

1. Installing node.js 
  -"sudo apt-get install nodejs"
  -"npm install npm@latest -g"

2. Installing truffle and ganache 
  -"npm i -g truffle"
  -"npm i -g ganache-cli"
  
 3.Installing metamask
  -Metamask can be found as an extension in google chrome.
  
 4.Installing Solidity extension on vsCode
  -Solidity by Juan Blanco
  
<----------------------------------------------------------------------------------------------------------------------------------->
 
If Migration.json and simpleStorage.json not found in client/src/contracts, re-run truffle 
"truffle migrate --reset --network develop"

For testing, get seed phrase from metamask and launch ganache using seed phrase. This allows ganache to connect to metamask, and input ETH into the metamask acc.
"ganache-cli -m "<SEED_PHRASE>"

After ganache is launched, enter the client directory and install the local dependancies and packages. Then start the express server.
"cd client"
"npm install" 
"npm start"

React application should be hosted at localhost:3000, more information can be seen in truffle-config.js

<----------------------------------------------------------------------------------------------------------------------------------->

TODO List:
1. Fetch Section for Frontend Website (Urgent)
2. Connect Frontend to Unity (Urgent)
3. Store models on the blockchain (Urgent)
4. Fix Metamask bug (Urgent)
5. Connect blockchain frontend to report website (optional)
