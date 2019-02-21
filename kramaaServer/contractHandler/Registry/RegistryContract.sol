pragma solidity ^0.5.4;

contract RegistryContract {

    constructor() public {
        owner = msg.sender;

    }

    struct Organization {
        string name;
        address[] managerAddresses;
        address ownerAddress;

    }

    struct Project {
        address contractAddress;
        string name;
        string description;
        string organizationName;
    }
    mapping (string => Organization) private organizationRegistries;
    mapping (string => address[]) private organizationProjectRegistries;
    mapping (string => Project) private projectRegistries;
    mapping (address => Project) public projectAddressMapping;
    address public owner;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function addNewProject(address contractAddress, string memory name, string memory description, string memory organizationName) public onlyOwner{
        Project memory project;
        project.contractAddress = contractAddress;
        project.name = name;
        project.description = description;
        project.organizationName = organizationName;
        projectRegistries[name] = project;
        projectAddressMapping[contractAddress] = project;
        organizationProjectRegistries[organizationName].push(contractAddress);
    }

    function addOrganizationDetails(string memory organizationName, address[] memory managerAddresses, address ownerAddress) public onlyOwner {
        organizationRegistries[organizationName].managerAddresses = managerAddresses;
        organizationRegistries[organizationName].ownerAddress = ownerAddress;
    }

    function getProjectFromProjectName(string memory projectName) public view returns (address, string memory) {
        return (projectRegistries[projectName].contractAddress, projectRegistries[projectName].description);
    }

    function getProjectAddressesFromOrganizationName(string memory organizationName) public view returns (address[] memory) {
        return (organizationProjectRegistries[organizationName]);
    }

}
