// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DAONFT1155.sol";

interface IERC20 {
    function transferFrom(address from, address to, uint amount) external returns (bool);
    function transfer(address to, uint amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract DAO {
    address public owner;
    string public daoName;
    string public description;
    uint256 public nftSupply;

    struct Proposal {
        string description;
        uint voteCount;
        mapping(address => bool) voters;
        uint etherDonated;
        mapping(address => uint) tokenDonated;
        bool exists;
    }

    mapping(uint => Proposal) public proposals;
    uint public proposalCount = 0;
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

    modifier validProposal(uint _proposalId) {
        require(_proposalId < proposalCount && proposals[_proposalId].exists, "Invalid proposal ID");
        _;
    }

    constructor(
        string memory _name,
        string memory _description,
        uint256 _nftSupply,
        address _creator
    ) {
        require(bytes(_name).length > 0, "DAO name cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_creator != address(0), "Invalid creator address");

        daoName = _name;
        description = _description;
        nftSupply = _nftSupply;
        owner = _creator;
    }

    // Initialize NFT after deployment to save gas
    function initializeNFT(string memory _uri) external onlyOwner {
        require(address(membershipNFT) == address(0), "NFT already initialized");
        membershipNFT = new DAONFT1155(_uri, address(this));
        emit NFT1155Created(address(membershipNFT), _uri);
    }

    // --- Governance ---
    function createProposal(string calldata _description) external {
        require(bytes(_description).length > 0, "Proposal description cannot be empty");

        Proposal storage newProposal = proposals[proposalCount];
        newProposal.description = _description;
        newProposal.exists = true;

        emit ProposalCreated(proposalCount, _description);
        unchecked {
            proposalCount++;
        }
    }

    function vote(uint _proposalId) external validProposal(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voters[msg.sender], "Already voted");

        proposal.voters[msg.sender] = true;
        unchecked {
            proposal.voteCount += 1;
        }
        emit Voted(_proposalId, msg.sender);
    }

    function getProposal(uint _proposalId) external view validProposal(_proposalId) returns (string memory, uint, uint) {
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.description, proposal.voteCount, proposal.etherDonated);
    }

    function getProposalsCount() external view returns (uint) {
        return proposalCount;
    }

    // --- NFT Membership ---
    function isMember(address user) public view returns (bool) {
        if (address(membershipNFT) == address(0)) return false;
        return membershipNFT.balanceOf(user, membershipNFT.MEMBER_NFT_ID()) > 0;
    }

    function mintMembership(address user) internal {
        if (address(membershipNFT) != address(0) && !isMember(user)) {
            membershipNFT.mintMembership(user);
        }
    }

    // --- Donation ---
    function donate(uint proposalId) external payable validProposal(proposalId) {
        require(msg.value > 0, "Donation amount must be greater than 0");

        proposals[proposalId].etherDonated += msg.value;
        emit Donated(proposalId, msg.sender, msg.value, address(0));
        mintMembership(msg.sender);
    }

    function donateToken(uint proposalId, address token, uint amount) external validProposal(proposalId) {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        proposals[proposalId].tokenDonated[token] += amount;
        emit Donated(proposalId, msg.sender, amount, token);
        mintMembership(msg.sender);
    }

    // --- Reward ---
    function reward(address payable to, uint proposalId, uint amount) external onlyOwner validProposal(proposalId) {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= amount, "Insufficient balance");

        (bool success, ) = to.call{value: amount}("");
        require(success, "Ether transfer failed");

        emit Rewarded(to, proposalId, amount);
    }

    function rewardToken(address to, uint proposalId, address token, uint amount) external onlyOwner validProposal(proposalId) {
        require(to != address(0), "Invalid recipient address");
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        require(IERC20(token).transfer(to, amount), "Token transfer failed");

        emit Rewarded(to, proposalId, amount);
    }

    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function emergencyWithdrawToken(address token) external onlyOwner {
        IERC20 tokenContract = IERC20(token);
        tokenContract.transfer(owner, tokenContract.balanceOf(address(this)));
    }

    receive() external payable {}
    fallback() external payable {}
}
