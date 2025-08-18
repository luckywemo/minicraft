// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleDAO {
    mapping(address => uint) public balances;
    mapping(address => mapping(uint => bool)) public voted;
    uint public proposalCount;

    struct Proposal {
        string description;
        uint votes;
    }

    Proposal[] public proposals;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function createProposal(string calldata desc) external {
        proposals.push(Proposal(desc, 0));
        proposalCount++;
    }

    function vote(uint proposalId) external {
        require(balances[msg.sender] > 0, "No balance");
        require(!voted[msg.sender][proposalId], "Already voted");
        proposals[proposalId].votes += balances[msg.sender];
        voted[msg.sender][proposalId] = true;
    }
}
