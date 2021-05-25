// implement ERC-20, govern crypto behaviour
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.16;

contract DappToken {
    string public name = 'DAppToken'; // public gives getter function for each variable
    string public symbol = 'DAPP';
    string public standard = 'DApp Token v1.0';
    uint256 public totalSupply; // state variables - accessible to entire contract

    // loged and accessible to all
    event Transfer(
        address indexed _from, 
        address indexed _to,
        uint256 _value
    );

    // owner account a approves spender b to transfer c tokens
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // mapping: key-value pair
    // address = user-address in blockchain
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Constructor - set the total numberof tokens
    // underscores for local variables
    constructor (uint256 initialSupply) public {
        balanceOf[msg.sender] = initialSupply; // msg = global variable. sender = address/account that deployed the contract
        totalSupply = initialSupply;
        
        // allocate the initial supply
    }

    // Transfer function
    // public because we want people to be able to call this function
    function transfer(address _to, uint256 _value) public returns (bool success) {

        // Exception thrown if account has less than value
        // require() ? true (continue) : false (stop & throw error). 
        require(balanceOf[msg.sender] >= _value);

        // Transfer the balance
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        // Transfer Event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    // approve
    function approve(address _spender, uint256 _value) public returns (bool success) {
            // handle allowance
            allowance[msg.sender][_spender] = _value;

            // handle approve event
            emit Approval(msg.sender, _spender, _value);
        
        return true;
    }

    // transferFrom

    // allowance
    
    // transfer
}
