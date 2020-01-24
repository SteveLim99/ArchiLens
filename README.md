# UCL_Blockchain_AR
# 1 Technologies Required
In order to run the testing env, you would need:  
1. node.js and npm  
2. Metamask Extension  
3. Solidity extension on VS code  
4. Truffle  

# 2 Technologies Installation
2.1 Installing node.js   
- "sudo apt-get install nodejs"  
- "npm install npm@latest -g"  

2.2 Installing truffle   
- "npm i -g truffle"  
  
2.3 Installing metamask  
- Metamask can be found as an extension in google chrome, Mozilla etc.  
  
2.4 Installing Solidity extension on vsCode  
- Solidity by Juan Blanco  
  
# 3 Setting up  
3.1 If Migration.json and simpleStorage.json not found in client/src/contracts, re-run truffle, otherwise jump to 3.2.  
- "truffle migrate --reset --network live"  

3.2 Install dependancies and packages, channge directory to "client" and launch React App from the same directory.  
- cd client  
- npm start

3.4 React application should be hosted at localhost:3000, more information can be seen in truffle-config.js  

# 4 Unity Application 
4.1 Install Unity APK 

4.2 Open "Archi-Lens" applications, please have a 5 pounds or 10 pounds note on standby as we utilized it as an object anchor.

4.3 Point your camera towards the dollar bill and click "Toggle Model". 

4.4 A 3D Model should be placed on the dollar bill. 
- If not, refer to the Prototype tab on our website.
