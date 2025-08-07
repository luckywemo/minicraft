// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Linktree {
    struct Profile {
        string username;
        string bio;
        string[] links;
    }

    mapping(address => Profile) public profiles;

    function setProfile(string memory username, string memory bio, string[] memory links) public {
        profiles[msg.sender] = Profile(username, bio, links);
    }

    function getLinks(address user) public view returns (string[] memory) {
        return profiles[user].links;
    }
}
