// implement ERC-20, govern crypto behaviour
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.16;

contract DappToken {
    string public name = 'DAppToken';
    string public symbol = 'DAPP';
    string public standard = 'DApp Token v1.0';
    uint256 public totalSupply; // state variable

    // mapping: key-value pair
    mapping(address => uint256) public balanceOf;

    // Constructor - set the total numberof tokens
    // underscores for local variables
    constructor (uint256 initialSupply) public {
        balanceOf[msg.sender] = initialSupply; // msg = global variable. sender = address/account that deployed the contract
        totalSupply = initialSupply;
        
        // allocate the initial supply
    }
}