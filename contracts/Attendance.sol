// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attendance {
    address public owner;
    mapping(address => bool) public hasAttended;
    address[] public attendees;

    event Attended(address indexed attendee);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function markAttendance() external {
        require(!hasAttended[msg.sender], "Already marked attendance");
        hasAttended[msg.sender] = true;
        attendees.push(msg.sender);
        emit Attended(msg.sender);
    }

    function getAttendees() external view onlyOwner returns (address[] memory) {
        return attendees;
    }
} 