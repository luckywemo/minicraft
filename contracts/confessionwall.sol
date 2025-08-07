// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConfessionWall {
    string[] public confessions;

    function confess(string memory msgContent) public {
        confessions.push(msgContent);
    }

    function read(uint index) public view returns (string memory) {
        return confessions[index];
    }

    function total() public view returns (uint) {
        return confessions.length;
    }
}
