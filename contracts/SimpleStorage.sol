pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
    struct File {
        string hash;
        string fileVersion;
        string fileName;
        string fileNameAndVersion;
        string fileContent;
    }

    File[] public files;
    uint256 public lastIndex;
    //   string public firstFileNameAndVersion = "";
    //   bool public first = true;

    mapping(uint256 => address) public fileToOwner;
    mapping(string => uint256) public fileNameAndVersionToIndex;

    constructor() public {
        fileToOwner[0] = address(0);
        fileNameAndVersionToIndex["first"] = 0;
        files.push(File("null", "null", "null", "null", "null"));
    }

    function set(
        string memory _hash,
        string memory _version,
        string memory _name,
        string memory _content
    ) public returns (bool) {
        string memory fileNameAndVersion = createNameVersion(_version, _name);
        // if((fileNameAndVersionToIndex[fileNameAndVersion] == 0) && !(stringCmp(firstFileNameAndVersion, fileNameAndVersion))){
        if ((fileNameAndVersionToIndex[fileNameAndVersion] == 0)) {
            uint256 id = files.push(
                File(_hash, _version, _name, fileNameAndVersion, _content)
            );
            lastIndex = id - 1;
            fileToOwner[id - 1] = msg.sender;
            fileNameAndVersionToIndex[fileNameAndVersion] = id - 1;
            // if(first) {
            //     first = false;
            //     firstFileNameAndVersion = fileNameAndVersion;
            // }
            return true;
        } else {
            return false;
        }
    }

    function stringCat(string memory a, string memory b)
        public
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(bytes(a), bytes(b)));
    }

    function stringCmp(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function createNameVersion(string memory _version, string memory _name)
        public
        pure
        returns (string memory)
    {
        return stringCat(stringCat(_name, "_"), string(_version));
    }

    function getOwner(string memory _version, string memory _name)
        public
        view
        returns (address)
    {
        return
            fileToOwner[fileNameAndVersionToIndex[createNameVersion(
                _version,
                _name
            )]];
    }

    function getOwner(uint256 _index) public view returns (address) {
        return fileToOwner[_index];
    }

    function getFileVersion(uint256 _index)
        public
        view
        returns (string memory)
    {
        return files[_index].fileVersion;
    }

    function getFileNameAndVersion(uint256 _index)
        public
        view
        returns (string memory)
    {
        return files[_index].fileNameAndVersion;
    }

    function getHash(uint256 _index) public view returns (string memory) {
        return files[_index].hash;
    }

    function getFileName(uint256 _index) public view returns (string memory) {
        return files[_index].fileName;
    }

    function getFileIndex(string memory _version, string memory _name)
        public
        view
        returns (uint256)
    {
        return fileNameAndVersionToIndex[createNameVersion(_version, _name)];
    }

    function getFileContent(string memory _version, string memory _name)
        public
        view
        returns (string memory)
    {
        return
            files[fileNameAndVersionToIndex[createNameVersion(_version, _name)]]
                .fileContent;
    }

    function getFileContent(uint256 _index)
        public
        view
        returns (string memory)
    {
        return files[_index].fileContent;
    }

    function getLatestFileIndex() public view returns (uint256) {
        return lastIndex;
    }

    function getLatestFileVersion() public view returns (string memory) {
        return files[lastIndex].fileVersion;
    }

    function getLatestFileName() public view returns (string memory) {
        return files[lastIndex].fileName;
    }

    function getLatestFileContent() public view returns (string memory) {
        return files[lastIndex].fileContent;
    }

}
