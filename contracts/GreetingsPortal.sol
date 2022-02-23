// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GreetingsPortal {
    uint256 totalUpVotes;

    event NewUpVote(address indexed from, uint256 timestamp, string message);

    struct Upvote {
        address sender;
        string message;
        uint256 timestamp;
    }

    Upvote[] upVotes;

    constructor() {
        console.log("Feed me ETH");
    }

    function upVote(string memory _message) public {
        totalUpVotes += 1;
        console.log("%s likes your work!", msg.sender, _message);

        // Push data to array
        upVotes.push(Upvote(msg.sender, _message, block.timestamp));

        emit NewUpVote(msg.sender, block.timestamp,  _message);
    }

    function getAllUpVotes() public view returns (Upvote[] memory) {
        return upVotes;
    }

    function getTotalUpVotes() public view returns (uint256) {
        console.log("You have %d total up votes", totalUpVotes);
        return totalUpVotes;
    }
}
