// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Microblog {
    struct Post {
        address author;
        string content;
        uint timestamp;
    }

    Post[] public posts;

    function post(string memory content) public {
        posts.push(Post(msg.sender, content, block.timestamp));
    }

    function getPost(uint index) public view returns (address, string memory, uint) {
        Post memory p = posts[index];
        return (p.author, p.content, p.timestamp);
    }

    function totalPosts() public view returns (uint) {
        return posts.length;
    }
}
