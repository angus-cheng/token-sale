const DappToken = artifacts.require("DappToken.sol")

contract('DappToken', function(accounts) {
    var tokenInstance;

    // initialisation test
    it('initialises the contract with the correct values', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'DAppToken', 'has the correct name');
            return tokenInstance.symbol();        
        }).then(function(symbol) {
            assert.equal(symbol, 'DAPP', 'has the correct symbol');
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, 'DApp Token v1.0', 'has the correct standard');
        });
    });

    // token supply test
    it('allocates the initial supply upon deployment', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin account')
        });
    });

    // transfer token test
    it('transfers token ownership', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            // Test require statement first by transferring amount larger than the sender's balance
            // call does not trigger a transaction
            return tokenInstance.transfer.call(accounts[1], 9999999);
        }).then(assert.fail).catch(function(error) {
            // gets message of error such that it must contain revert
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            // triggers a transaction so a receipt is created
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receieving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
        });
    });

    it('approves tokens for delegated transfer', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            // calls function without writing to blockchain. no logs/receipt
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success) {
            assert.equal(success, true, 'it returns true');
            return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
        }).then(function(receipt) {
            // checks there is a log event
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            // check its an approval event
            assert.equal(receipt.logs[0].event, 'Approval', 'should be the "Approval" event');
            // check it has an owner
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are authorized by');
            // check it has a spender
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are authorized to');
            // check it has a value
            assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount');
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function(allowance) {
            assert.equal(allowance, 100, 'stores the allowance foe delegated transfer');
        });
    });

})
