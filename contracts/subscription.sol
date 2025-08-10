// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Subscription {
    mapping(address => uint) public expiry;

    function subscribe() public payable {
        require(msg.value == 0.01 ether, "Must pay 0.01 ETH");
        expiry[msg.sender] = block.timestamp + 30 days;
    }

    function isSubscribed(address user) public view returns (bool) {
        return expiry[user] > block.timestamp;
    }
}
