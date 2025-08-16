// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PaymentSplitter {
    address payable public recipient1;
    address payable public recipient2;

    constructor(address payable _r1, address payable _r2) {
        recipient1 = _r1;
        recipient2 = _r2;
    }

    receive() external payable {
        uint half = msg.value / 2;
        recipient1.transfer(half);
        recipient2.transfer(msg.value - half);
    }
}
