// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BaseNFT is ERC721 {
    uint256 public tokenCount;

    constructor() ERC721("BaseNFT", "BNFT") {}

    function mint() public {
        _safeMint(msg.sender, tokenCount);
        tokenCount++;
    }
}
