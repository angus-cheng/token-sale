// implement ERC-20, govern crypto behaviour
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0;

contract DappToken {
    // Constructor - 
    // Set the total numberof tokens
    // Read the total number of tokens
    uint256 public totalSupply;

    constructor () public {
        totalSupply = 1000000;
    }
}