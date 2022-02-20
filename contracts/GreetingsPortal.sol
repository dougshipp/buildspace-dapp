// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GreetingsPortal {
    uint256 totalUpVotes;

    constructor() {
        console.log("I want ETH");
    }

    function upVote() public {
        totalUpVotes += 1;
        console.log("%s likes your work!", msg.sender);
    }

    function getTotalUpVotes() public view returns (uint256) {
        console.log("You have %d total up votes", totalUpVotes);
        return totalUpVotes;
    }
}