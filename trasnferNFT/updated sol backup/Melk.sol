// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MooStaking.sol";

contract Melk is ERC20, Ownable {

    MooStake public mooStake;

    uint256 public MAX_TOKENS = 150000000000000000000000000; // 150,000,000,000,000,000,000,000,000 / 1,000,000,000,000,000,000 = 150,000,000 - max supply is 150 million tokens

    constructor(uint256 initialSupply, MooStake _mooStake) ERC20("Melk", "MELK") {
        _mint(msg.sender, initialSupply);
        mooStake = _mooStake;
    }


    function mintClaim() public {
    
        //uint256 tempTotalSupply = totalSupply();

        //require(msg.sender == claimer); // make sure whoever is trying to claim is the msg.sender
        require(totalSupply() < MAX_TOKENS, "tokens are no longer being distributed at this time :(");

        //require(mooStake.isBalanceCorrect(msg.sender) == reward); // make sure that the msg.sender/claimer has the correct balance in mapping 
        //require(claimer == msg.sender), require(stakingBalance == rewards)
        
        _mint(msg.sender, mooStake.isBalanceCorrect(msg.sender));
        require(mooStake.decreaseBalance(msg.sender));
    
    }

}