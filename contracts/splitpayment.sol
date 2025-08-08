// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SplitPayment {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function split(address[] calldata recipients) external payable {
        require(msg.value > 0, "No ETH sent");
        uint amount = msg.value / recipients.length;

        for (uint i = 0; i < recipients.length; i++) {
            payable(recipients[i]).transfer(amount);
        }
    }
}
