// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {
    address public highestBidder;
    uint public highestBid;

    function bid() public payable {
        require(msg.value > highestBid, "Bid too low");
        payable(highestBidder).transfer(highestBid);
        highestBid = msg.value;
        highestBidder = msg.sender;
    }
}
