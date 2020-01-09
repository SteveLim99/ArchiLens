# UCL_Blockchain_AR

If Migration.json and simpleStorage.json not found in client/src/contracts, re-run truffle 
truffle migrate --reset --network develop 

For testing, get seed phrase from metamask and launch ganache using seed phrase. This allows ganache to connect to metamask, and input ETH into the metamask acc.
ganache-cli -m "<SEED_PHRASE>

After ganache is launched, enter the client directory and install the local dependancies and packages. Then start the express server.
cd client 
npm install 
npm start 

React application should be hosted at localhost:3000, more information can be seen in truffle-config.js
