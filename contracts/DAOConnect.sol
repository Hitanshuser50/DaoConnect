// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Dao.sol";

contract DAOConnect {
    address[] public daos;
    uint256 public daoCount = 0;
    uint256 public amountRequired = 0;
    address public factoryOwner;

    event AmountRequiredUpdated(uint256 newAmount);
    event DAOCreated(address indexed daoAddress, string name, address creator);

    modifier onlyOwner() {
        require(msg.sender == factoryOwner, "Not the owner/governance of DaoConnect");
        _;
    }

    constructor(uint256 _amountRequired) {
        factoryOwner = msg.sender;
        amountRequired = _amountRequired;
    }

    function setAmountRequiredToCreateDao(uint256 _amt) external onlyOwner {
        amountRequired = _amt;
        emit AmountRequiredUpdated(_amt);
    }

    function createDAO(string memory _name) external payable {
        require(msg.value >= amountRequired, "Insufficient funds provided to create DAO");

        DAO dao = new Dao(_name, msg.sender);
        daos.push(address(dao));
        daoCount++;

        emit DAOCreated(address(dao), _name, msg.sender);
    }

    function getAllDAOs() public view returns (address[] memory) {
        return daos;
    }
}
