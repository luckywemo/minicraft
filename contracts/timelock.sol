// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimelockVault {
    struct Deposit {
        uint amount;
        uint unlockTime;
    }

    mapping(address => Deposit) public deposits;

    function lock(uint _timeInSeconds) public payable {
        require(msg.value > 0, "Need ETH");
        deposits[msg.sender] = Deposit(msg.value, block.timestamp + _timeInSeconds);
    }

    function withdraw() public {
        Deposit storage dep = deposits[msg.sender];
        require(block.timestamp >= dep.unlockTime, "Locked");
        uint amount = dep.amount;
        dep.amount = 0;
        payable(msg.sender).transfer(amount);
    }
}
