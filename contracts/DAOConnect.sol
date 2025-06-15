// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title DaoConnect - Advanced DAO Governance Contract
 * @dev Comprehensive DAO contract supporting proposal creation, voting, and treasury management
 * @author DaoConnect Team
 */
contract DaoConnect is Ownable, ReentrancyGuard, Pausable {
    
    // ============ STRUCTS ============
    
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        string category;
        uint256 amount;           // Amount to transfer (if treasury proposal)
        address recipient;        // Recipient address (if treasury proposal)
        address tokenAddress;     // Token contract address (address(0) for ETH)
        uint256 startTime;
        uint256 endTime;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 totalVotes;
        bool executed;
        bool cancelled;
        ProposalType proposalType;
        mapping(address => bool) hasVoted;
        mapping(address => VoteChoice) votes;
    }
    
    struct Member {
        bool isActive;
        uint256 joinedAt;
        uint256 proposalsCreated;
        uint256 votesCount;
        uint256 reputation;
    }
    
    // ============ ENUMS ============
    
    enum ProposalType {
        GENERAL,        // General governance proposal
        TREASURY,       // Treasury fund transfer
        MEMBERSHIP,     // Add/remove members
        PARAMETER       // Change DAO parameters
    }
    
    enum VoteChoice {
        NONE,
        FOR,
        AGAINST
    }
    
    enum ProposalStatus {
        PENDING,
        ACTIVE,
        SUCCEEDED,
        DEFEATED,
        EXECUTED,
        CANCELLED,
        EXPIRED
    }
    
    // ============ STATE VARIABLES ============
    
    string public daoName;
    string public daoDescription;
    uint256 public proposalCount;
    uint256 public memberCount;
    
    // Governance Parameters
    uint256 public votingDelay = 1 hours;           // Delay before voting starts
    uint256 public votingPeriod = 7 days;           // Voting duration
    uint256 public quorumPercentage = 20;           // 20% quorum required
    uint256 public proposalThreshold = 1;           // Min reputation to create proposal
    uint256 public executionDelay = 2 days;         // Delay before execution
    
    // Treasury
    uint256 public treasuryBalance;
    
    // Mappings
    mapping(uint256 => Proposal) public proposals;
    mapping(address => Member) public members;
    mapping(address => bool) public isMember;
    mapping(uint256 => address[]) public proposalVoters;
    
    // Arrays for iteration
    address[] public memberList;
    uint256[] public activeProposals;
    
    // ============ EVENTS ============
    
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        string description,
        ProposalType proposalType,
        uint256 startTime,
        uint256 endTime
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        VoteChoice choice,
        uint256 timestamp
    );
    
    event ProposalExecuted(
        uint256 indexed proposalId,
        bool success,
        uint256 timestamp
    );
    
    event ProposalCancelled(
        uint256 indexed proposalId,
        address indexed canceller,
        uint256 timestamp
    );
    
    event MemberAdded(
        address indexed member,
        uint256 timestamp
    );
    
    event MemberRemoved(
        address indexed member,
        uint256 timestamp
    );
    
    event TreasuryDeposit(
        address indexed depositor,
        uint256 amount,
        address tokenAddress,
        uint256 timestamp
    );
    
    event TreasuryWithdrawal(
        uint256 indexed proposalId,
        address indexed recipient,
        uint256 amount,
        address tokenAddress,
        uint256 timestamp
    );
    
    event ParameterUpdated(
        string parameter,
        uint256 oldValue,
        uint256 newValue,
        uint256 timestamp
    );
    
    // ============ MODIFIERS ============
    
    modifier onlyMember() {
        require(isMember[msg.sender], "Not a DAO member");
        _;
    }
    
    modifier proposalExists(uint256 proposalId) {
        require(proposalId > 0 && proposalId <= proposalCount, "Proposal does not exist");
        _;
    }
    
    modifier canVote(uint256 proposalId) {
        require(isMember[msg.sender], "Not a DAO member");
        require(!proposals[proposalId].hasVoted[msg.sender], "Already voted");
        require(block.timestamp >= proposals[proposalId].startTime, "Voting not started");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting ended");
        require(!proposals[proposalId].executed, "Proposal already executed");
        require(!proposals[proposalId].cancelled, "Proposal cancelled");
        _;
    }
    
    // ============ CONSTRUCTOR ============
    
    constructor(
        string memory _daoName,
        string memory _daoDescription,
        address[] memory _initialMembers
    ) {
        daoName = _daoName;
        daoDescription = _daoDescription;
        
        // Add initial members
        for (uint256 i = 0; i < _initialMembers.length; i++) {
            _addMember(_initialMembers[i]);
        }
        
        // Add contract deployer as member if not already included
        if (!isMember[msg.sender]) {
            _addMember(msg.sender);
        }
    }
    
    // ============ PROPOSAL FUNCTIONS ============
    
    /**
     * @dev Create a new proposal
     */
    function createProposal(
        string memory _title,
        string memory _description,
        string memory _category,
        ProposalType _proposalType,
        uint256 _amount,
        address _recipient,
        address _tokenAddress
    ) external onlyMember whenNotPaused returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(members[msg.sender].reputation >= proposalThreshold, "Insufficient reputation");
        
        // Validate treasury proposals
        if (_proposalType == ProposalType.TREASURY) {
            require(_amount > 0, "Amount must be greater than 0");
            require(_recipient != address(0), "Invalid recipient");
            
            if (_tokenAddress == address(0)) {
                require(address(this).balance >= _amount, "Insufficient ETH balance");
            } else {
                require(
                    IERC20(_tokenAddress).balanceOf(address(this)) >= _amount,
                    "Insufficient token balance"
                );
            }
        }
        
        proposalCount++;
        uint256 proposalId = proposalCount;
        
        Proposal storage newProposal = proposals[proposalId];
        newProposal.id = proposalId;
        newProposal.proposer = msg.sender;
        newProposal.title = _title;
        newProposal.description = _description;
        newProposal.category = _category;
        newProposal.amount = _amount;
        newProposal.recipient = _recipient;
        newProposal.tokenAddress = _tokenAddress;
        newProposal.startTime = block.timestamp + votingDelay;
        newProposal.endTime = block.timestamp + votingDelay + votingPeriod;
        newProposal.proposalType = _proposalType;
        
        activeProposals.push(proposalId);
        members[msg.sender].proposalsCreated++;
        
        emit ProposalCreated(
            proposalId,
            msg.sender,
            _title,
            _description,
            _proposalType,
            newProposal.startTime,
            newProposal.endTime
        );
        
        return proposalId;
    }
    
    /**
     * @dev Cast a vote on a proposal
     */
    function vote(uint256 proposalId, VoteChoice choice) 
        external 
        proposalExists(proposalId) 
        canVote(proposalId) 
        whenNotPaused 
    {
        require(choice == VoteChoice.FOR || choice == VoteChoice.AGAINST, "Invalid vote choice");
        
        Proposal storage proposal = proposals[proposalId];
        proposal.hasVoted[msg.sender] = true;
        proposal.votes[msg.sender] = choice;
        proposal.totalVotes++;
        
        if (choice == VoteChoice.FOR) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }
        
        proposalVoters[proposalId].push(msg.sender);
        members[msg.sender].votesCount++;
        members[msg.sender].reputation++; // Reward voting participation
        
        emit VoteCast(proposalId, msg.sender, choice, block.timestamp);
    }
    
    /**
     * @dev Execute a proposal if it has passed
     */
    function executeProposal(uint256 proposalId) 
        external 
        proposalExists(proposalId) 
        nonReentrant 
        whenNotPaused 
    {
        Proposal storage proposal = proposals[proposalId];
        
        require(!proposal.executed, "Proposal already executed");
        require(!proposal.cancelled, "Proposal cancelled");
        require(block.timestamp > proposal.endTime, "Voting still active");
        require(
            block.timestamp <= proposal.endTime + executionDelay + 7 days,
            "Execution window expired"
        );
        
        // Check if proposal passed
        require(_hasProposalPassed(proposalId), "Proposal did not pass");
        
        proposal.executed = true;
        
        bool success = true;
        
        // Execute based on proposal type
        if (proposal.proposalType == ProposalType.TREASURY) {
            success = _executeTreasuryProposal(proposal);
        } else if (proposal.proposalType == ProposalType.MEMBERSHIP) {
            success = _executeMembershipProposal(proposal);
        }
        
        // Remove from active proposals
        _removeFromActiveProposals(proposalId);
        
        // Reward proposer for successful proposal
        if (success) {
            members[proposal.proposer].reputation += 5;
        }
        
        emit ProposalExecuted(proposalId, success, block.timestamp);
    }
    
    /**
     * @dev Cancel a proposal (only by proposer or owner)
     */
    function cancelProposal(uint256 proposalId) 
        external 
        proposalExists(proposalId) 
        whenNotPaused 
    {
        Proposal storage proposal = proposals[proposalId];
        
        require(
            msg.sender == proposal.proposer || msg.sender == owner(),
            "Not authorized to cancel"
        );
        require(!proposal.executed, "Proposal already executed");
        require(!proposal.cancelled, "Proposal already cancelled");
        
        proposal.cancelled = true;
        _removeFromActiveProposals(proposalId);
        
        emit ProposalCancelled(proposalId, msg.sender, block.timestamp);
    }
    
    // ============ TREASURY FUNCTIONS ============
    
    /**
     * @dev Deposit ETH to treasury
     */
    function depositToTreasury() external payable {
        require(msg.value > 0, "Must send ETH");
        treasuryBalance += msg.value;
        
        emit TreasuryDeposit(msg.sender, msg.value, address(0), block.timestamp);
    }
    
    /**
     * @dev Deposit ERC20 tokens to treasury
     */
    function depositTokensToTreasury(address tokenAddress, uint256 amount) external {
        require(tokenAddress != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        
        emit TreasuryDeposit(msg.sender, amount, tokenAddress, block.timestamp);
    }
    
    /**
     * @dev Get treasury balance for a specific token
     */
    function getTreasuryBalance(address tokenAddress) external view returns (uint256) {
        if (tokenAddress == address(0)) {
            return address(this).balance;
        } else {
            return IERC20(tokenAddress).balanceOf(address(this));
        }
    }
    
    // ============ MEMBER MANAGEMENT ============
    
    /**
     * @dev Add a new member (only through governance or owner)
     */
    function addMember(address newMember) external onlyOwner {
        _addMember(newMember);
    }
    
    /**
     * @dev Remove a member (only through governance or owner)
     */
    function removeMember(address member) external onlyOwner {
        _removeMember(member);
    }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @dev Get proposal status
     */
    function getProposalStatus(uint256 proposalId) 
        external 
        view 
        proposalExists(proposalId) 
        returns (ProposalStatus) 
    {
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.cancelled) return ProposalStatus.CANCELLED;
        if (proposal.executed) return ProposalStatus.EXECUTED;
        if (block.timestamp < proposal.startTime) return ProposalStatus.PENDING;
        if (block.timestamp <= proposal.endTime) return ProposalStatus.ACTIVE;
        if (block.timestamp > proposal.endTime + executionDelay + 7 days) return ProposalStatus.EXPIRED;
        if (_hasProposalPassed(proposalId)) return ProposalStatus.SUCCEEDED;
        return ProposalStatus.DEFEATED;
    }
    
    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 proposalId) 
        external 
        view 
        proposalExists(proposalId) 
        returns (
            uint256 id,
            address proposer,
            string memory title,
            string memory description,
            string memory category,
            uint256 amount,
            address recipient,
            address tokenAddress,
            uint256 startTime,
            uint256 endTime,
            uint256 votesFor,
            uint256 votesAgainst,
            uint256 totalVotes,
            bool executed,
            bool cancelled,
            ProposalType proposalType
        ) 
    {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.id,
            proposal.proposer,
            proposal.title,
            proposal.description,
            proposal.category,
            proposal.amount,
            proposal.recipient,
            proposal.tokenAddress,
            proposal.startTime,
            proposal.endTime,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.totalVotes,
            proposal.executed,
            proposal.cancelled,
            proposal.proposalType
        );
    }
    
    /**
     * @dev Check if user has voted on a proposal
     */
    function hasVoted(uint256 proposalId, address voter) 
        external 
        view 
        proposalExists(proposalId) 
        returns (bool) 
    {
        return proposals[proposalId].hasVoted[voter];
    }
    
    /**
     * @dev Get user's vote on a proposal
     */
    function getVote(uint256 proposalId, address voter) 
        external 
        view 
        proposalExists(proposalId) 
        returns (VoteChoice) 
    {
        return proposals[proposalId].votes[voter];
    }
    
    /**
     * @dev Get all active proposal IDs
     */
    function getActiveProposals() external view returns (uint256[] memory) {
        return activeProposals;
    }
    
    /**
     * @dev Get member information
     */
    function getMember(address memberAddress) 
        external 
        view 
        returns (
            bool isActive,
            uint256 joinedAt,
            uint256 proposalsCreated,
            uint256 votesCount,
            uint256 reputation
        ) 
    {
        Member storage member = members[memberAddress];
        return (
            member.isActive,
            member.joinedAt,
            member.proposalsCreated,
            member.votesCount,
            member.reputation
        );
    }
    
    /**
     * @dev Get all members
     */
    function getAllMembers() external view returns (address[] memory) {
        return memberList;
    }
    
    /**
     * @dev Calculate required quorum for a proposal
     */
    function getRequiredQuorum() public view returns (uint256) {
        return (memberCount * quorumPercentage) / 100;
    }
    
    // ============ GOVERNANCE PARAMETER FUNCTIONS ============
    
    /**
     * @dev Update governance parameters (only through governance)
     */
    function updateVotingDelay(uint256 newDelay) external onlyOwner {
        uint256 oldDelay = votingDelay;
        votingDelay = newDelay;
        emit ParameterUpdated("votingDelay", oldDelay, newDelay, block.timestamp);
    }
    
    function updateVotingPeriod(uint256 newPeriod) external onlyOwner {
        uint256 oldPeriod = votingPeriod;
        votingPeriod = newPeriod;
        emit ParameterUpdated("votingPeriod", oldPeriod, newPeriod, block.timestamp);
    }
    
    function updateQuorumPercentage(uint256 newPercentage) external onlyOwner {
        require(newPercentage > 0 && newPercentage <= 100, "Invalid percentage");
        uint256 oldPercentage = quorumPercentage;
        quorumPercentage = newPercentage;
        emit ParameterUpdated("quorumPercentage", oldPercentage, newPercentage, block.timestamp);
    }
    
    // ============ INTERNAL FUNCTIONS ============
    
    function _addMember(address newMember) internal {
        require(newMember != address(0), "Invalid address");
        require(!isMember[newMember], "Already a member");
        
        isMember[newMember] = true;
        members[newMember] = Member({
            isActive: true,
            joinedAt: block.timestamp,
            proposalsCreated: 0,
            votesCount: 0,
            reputation: 1
        });
        
        memberList.push(newMember);
        memberCount++;
        
        emit MemberAdded(newMember, block.timestamp);
    }
    
    function _removeMember(address member) internal {
        require(isMember[member], "Not a member");
        
        isMember[member] = false;
        members[member].isActive = false;
        memberCount--;
        
        // Remove from memberList
        for (uint256 i = 0; i < memberList.length; i++) {
            if (memberList[i] == member) {
                memberList[i] = memberList[memberList.length - 1];
                memberList.pop();
                break;
            }
        }
        
        emit MemberRemoved(member, block.timestamp);
    }
    
    function _hasProposalPassed(uint256 proposalId) internal view returns (bool) {
        Proposal storage proposal = proposals[proposalId];
        uint256 requiredQuorum = getRequiredQuorum();
        
        return proposal.totalVotes >= requiredQuorum && 
               proposal.votesFor > proposal.votesAgainst;
    }
    
    function _executeTreasuryProposal(Proposal storage proposal) internal returns (bool) {
        if (proposal.tokenAddress == address(0)) {
            // ETH transfer
            (bool success, ) = proposal.recipient.call{value: proposal.amount}("");
            if (success) {
                treasuryBalance -= proposal.amount;
                emit TreasuryWithdrawal(
                    proposal.id,
                    proposal.recipient,
                    proposal.amount,
                    address(0),
                    block.timestamp
                );
            }
            return success;
        } else {
            // ERC20 transfer
            try IERC20(proposal.tokenAddress).transfer(proposal.recipient, proposal.amount) returns (bool success) {
                if (success) {
                    emit TreasuryWithdrawal(
                        proposal.id,
                        proposal.recipient,
                        proposal.amount,
                        proposal.tokenAddress,
                        block.timestamp
                    );
                }
                return success;
            } catch {
                return false;
            }
        }
    }
    
    function _executeMembershipProposal(Proposal storage proposal) internal returns (bool) {
        // Implementation for membership proposals would go here
        // This is a placeholder for membership-related proposal execution
        return true;
    }
    
    function _removeFromActiveProposals(uint256 proposalId) internal {
        for (uint256 i = 0; i < activeProposals.length; i++) {
            if (activeProposals[i] == proposalId) {
                activeProposals[i] = activeProposals[activeProposals.length - 1];
                activeProposals.pop();
                break;
            }
        }
    }
    
    // ============ EMERGENCY FUNCTIONS ============
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // ============ RECEIVE FUNCTION ============
    
    receive() external payable {
        treasuryBalance += msg.value;
        emit TreasuryDeposit(msg.sender, msg.value, address(0), block.timestamp);
    }
}
