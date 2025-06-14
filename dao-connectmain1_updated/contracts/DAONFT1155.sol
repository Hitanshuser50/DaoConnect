// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAONFT1155 is ERC1155, Ownable {
    uint256 public constant MEMBER_NFT_ID = 1;

    constructor(string memory _uri, address _owner)
        ERC1155(_uri)
        Ownable(_owner)
    {}

    function mint(address to, uint256 id, uint256 amount) public onlyOwner {
        require(to != address(0), "Invalid address");
        _mint(to, id, amount, "");
    }

    function mintMembership(address to) public onlyOwner {
        require(balanceOf(to, MEMBER_NFT_ID) == 0, "Already a member");
        _mint(to, MEMBER_NFT_ID, 1, "");
    }
}
