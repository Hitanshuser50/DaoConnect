// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Dao.sol";

contract DAOConnect {
    address[] public daos;
    uint256 public daoCount = 0;

    event DAOCreated(address indexed daoAddress, string name, address creator);

    function createDAO(string memory _name) public {
        DAO dao = new DAO(_name, msg.sender);
        daos.push(address(dao));
        daoCount+=1;
        emit DAOCreated(address(dao), _name, msg.sender);

    }

    function getAllDAOs() public view returns (address[] memory) {
        return daos;
    }
}
