pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  struct File{
    uint fileVersion;
    string fileName;
    string fileContent;
  }

  File[] public files;

  mapping (uint => address) public fileToOwner;

  function set(uint _version, string memory _name, string memory _content) public {
    uint id = files.push(File(_version,_name,_content));
    fileToOwner[id] = msg.sender;

  }

  function getOwner(uint _index) public view returns (address) {
    return fileToOwner[_index];
  }
}
