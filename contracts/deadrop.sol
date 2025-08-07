// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeadDrop {
    struct Drop {
        string encryptedData; // e.g. IPFS CID or AES encrypted string
        address uploader;
        uint timestamp;
    }

    Drop[] public drops;

    function upload(string memory encryptedData) public {
        drops.push(Drop(encryptedData, msg.sender, block.timestamp));
    }

    function get(uint index) public view returns (string memory, address, uint) {
        Drop memory d = drops[index];
        return (d.encryptedData, d.uploader, d.timestamp);
    }

    function count() public view returns (uint) {
        return drops.length;
    }
}
