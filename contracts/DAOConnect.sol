// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Dao.sol";

contract DAOConnect {
    address[] public daos;
    uint256 public daoCount = 0;
    uint256 public amountRequired = 0;

    event AmountRequiredUpdated(uint256 newAmount);
    event DAOCreated(address indexed daoAddress, string name, address creator);

    constructor(uint256 _amountRequired) {
        amountRequired = _amountRequired;
    }

    function amountRequiredToCreateDao(uint256 _amt) external onlyOwner {
        amountRequired = _amt;
        emit AmountRequiredUpdated(_amt);
    }

    function createDAO(string memory _name) public {
        require(msg.value >= amountRequired, "Insufficient funds provided to create DAO");
        DAO dao = new DAO(_name, msg.sender);
        daos.push(address(dao));
        daoCount+=1;
        emit DAOCreated(address(dao), _name, msg.sender);
    }

    function getAllDAOs() public view returns (address[] memory) {
        return daos;
    }
}
