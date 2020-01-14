pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint latestVersion;
  struct File{
    uint fileVersion;
    string fileName;
    string fileContent;
  }

  File[] public files;

  mapping (uint => string) public versionToName;

  function set(uint _version, string memory _name, string memory _content) public {
    latestVersion = _version;
    files.push(File(_version,_name,_content));
  }

  function getLatestVersion() public view returns (uint) {
    return latestVersion;
  }
}
