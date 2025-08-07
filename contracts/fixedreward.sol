// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    mapping(address => uint) public balances;
    mapping(address => uint) public timestamps;

    function stake() public payable {
        require(msg.value > 0, "Stake something");
        balances[msg.sender] += msg.value;
        timestamps[msg.sender] = block.timestamp;
    }

    function withdraw() public {
        uint amount = balances[msg.sender];
        require(amount > 0, "Nothing to withdraw");
        uint timeElapsed = block.timestamp - timestamps[msg.sender];
        uint reward = (amount * timeElapsed) / 1 weeks / 10; // 10% per week

        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount + reward);
    }
}
