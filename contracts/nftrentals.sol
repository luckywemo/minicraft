// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    function safeTransferFrom(address from, address to, uint tokenId) external;
}

contract NFTRental {
    struct Rental {
        address owner;
        address renter;
        address nft;
        uint tokenId;
        uint expiry;
    }

    Rental[] public rentals;

    function rentOut(address nft, uint tokenId, address renter, uint duration) public {
        IERC721(nft).safeTransferFrom(msg.sender, renter, tokenId);
        rentals.push(Rental(msg.sender, renter, nft, tokenId, block.timestamp + duration));
    }

    function reclaim(uint index) public {
        Rental memory r = rentals[index];
        require(block.timestamp >= r.expiry, "Rental not over");
        IERC721(r.nft).safeTransferFrom(r.renter, r.owner, r.tokenId);
    }
}
