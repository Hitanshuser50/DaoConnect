// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DAONFT1155.sol";

interface IERC20 {
    function transferFrom(address from, address to, uint amount) external returns (bool);
    function transfer(address to, uint amount) external returns (bool);
}

contract DAO {
    address public owner;
    string public daoName;
    string public description;
    string public nftSupply;

    struct Proposal {
        string description;
        uint voteCount;
        mapping(address => bool) voters;
        uint etherDonated;
        mapping(address => uint) tokenDonated;
    }

    Proposal[] public proposals;
    DAONFT1155 public membershipNFT;

    event ProposalCreated(uint indexed proposalId, string description);
    event Voted(uint indexed proposalId, address voter);
    event NFT1155Created(address indexed nftAddress, string uri);
    event Donated(uint indexed proposalId, address donor, uint amount, address token);
    event Rewarded(address indexed recipient, uint indexed proposalId, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not DAO owner");
        _;
    }

    constructor(
        string memory _name,
        string memory _description,
        string memory _nftSupply,
        string memory _uri,
        address _creator
    ) {
        daoName = _name;
        description = _description;
        nftSupply = _nftSupply;
        owner = _creator;

        // Automatically create the membership NFT with the provided URI
        membershipNFT = new DAONFT1155(_uri, address(this));
        emit NFT1155Created(address(membershipNFT), _uri);
    }

    // --- Governance ---
    function createProposal(string memory _description) public {
        Proposal storage newProposal = proposals.push();
        newProposal.description = _description;
        emit ProposalCreated(proposals.length - 1, _description);
    }

    function vote(uint _proposalId) public {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voters[msg.sender], "Already voted");

        proposal.voters[msg.sender] = true;
        proposal.voteCount += 1;
        emit Voted(_proposalId, msg.sender);
    }

    function getProposal(uint _proposalId) public view returns (string memory, uint, uint) {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.description, proposal.voteCount, proposal.etherDonated);
    }

    function getProposalsCount() public view returns (uint) {
        return proposals.length;
    }

    // --- NFT Membership ---
    function createNFT1155(string memory _uri) external onlyOwner {
        require(address(membershipNFT) == address(0), "NFT1155 already deployed");
        membershipNFT = new DAONFT1155(_uri, msg.sender);
        emit NFT1155Created(address(membershipNFT), _uri);
    }

    function isMember(address user) public view returns (bool) {
        if (address(membershipNFT) == address(0)) return false;
        return membershipNFT.balanceOf(user, 1) > 0;
    }

    function mintMembership(address user) internal {
        if (address(membershipNFT) != address(0) && !isMember(user)) {
            membershipNFT.mint(user, 1, 1);
        }
    }

    // --- Donation ---
    function donate(uint proposalId) external payable {
        require(proposalId < proposals.length, "Invalid proposal ID");
        proposals[proposalId].etherDonated += msg.value;
        emit Donated(proposalId, msg.sender, msg.value, address(0));
        mintMembership(msg.sender);
    }

    function donateToken(uint proposalId, address token, uint amount) external {
        require(proposalId < proposals.length, "Invalid proposal ID");
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        proposals[proposalId].tokenDonated[token] += amount;
        emit Donated(proposalId, msg.sender, amount, token);
        mintMembership(msg.sender);
    }

    // --- Reward ---
    function reward(address payable to, uint proposalId, uint amount) external onlyOwner {
        require(proposalId < proposals.length, "Invalid proposal ID");
        require(address(this).balance >= amount, "Insufficient balance");

        (bool success, ) = to.call{value: amount}("");
        require(success, "Ether transfer failed");

        emit Rewarded(to, proposalId, amount);
    }

    function rewardToken(address to, uint proposalId, address token, uint amount) external onlyOwner {
        require(proposalId < proposals.length, "Invalid proposal ID");
        require(IERC20(token).transfer(to, amount), "Token transfer failed");

        emit Rewarded(to, proposalId, amount);
    }

    receive() external payable {}
    fallback() external payable {}
}
