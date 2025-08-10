// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Journal {
    mapping(address => string[]) public entries;

    function write(string memory content) public {
        entries[msg.sender].push(content);
    }

    function read(uint index) public view returns (string memory) {
        return entries[msg.sender][index];
    }

    function count() public view returns (uint) {
        return entries[msg.sender].length;
    }
}
