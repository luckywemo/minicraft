// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTipJar {
    mapping(address => uint) public tips;

    event Tipped(address indexed to, address indexed from, uint amount);

    function tip(address to) public payable {
        require(msg.value > 0, "Send ETH");
        tips[to] += msg.value;
        emit Tipped(to, msg.sender, msg.value);
    }

    function myTips() public view returns (uint) {
        return tips[msg.sender];
    }
}
