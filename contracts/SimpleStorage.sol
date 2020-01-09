pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  struct File{
    uint fileVersion;
    string fileName;
    string fileContent;
  }

  File[] public files;

  mapping (uint => string) public versionToName;

  function set(uint _version, string memory _name, string memory _content) public {
    files.push(File(_version,_name,_content));
  }

  function get(uint _version) public view returns (string memory) {
    return versionToName[_version];
  }
}
