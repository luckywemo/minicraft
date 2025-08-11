// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Item {
        uint256 id;
        uint256 price;
        uint256 timestamp;
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;

    function addItem(uint256 _price) public {
        itemCount++;
        items[itemCount] = Item({
            id: itemCount,
            price: _price,
            timestamp: block.timestamp
        });
    }

    function getItem(uint256 _id) public view returns (Item memory) {
        return items[_id];
    }
}