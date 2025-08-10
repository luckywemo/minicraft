// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Polls {
    struct Poll {
        string question;
        string[] options;
        mapping(uint => uint) votes;
        mapping(address => bool) hasVoted;
    }

    Poll[] public polls;

    function createPoll(string memory question, string[] memory options) public {
        polls.push();
        Poll storage poll = polls[polls.length - 1];
        poll.question = question;
        poll.options = options;
    }

    function vote(uint pollId, uint optionId) public {
        Poll storage poll = polls[pollId];
        require(!poll.hasVoted[msg.sender], "Already voted");
        poll.votes[optionId]++;
        poll.hasVoted[msg.sender] = true;
    }

    function getVotes(uint pollId, uint optionId) public view returns (uint) {
        return polls[pollId].votes[optionId];
    }
}



