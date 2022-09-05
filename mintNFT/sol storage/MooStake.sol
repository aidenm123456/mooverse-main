// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "./DappToken.sol";
import "./MelkToken.sol";
import "./MooNFT15.sol";

//import "./DaiToken.sol";

contract MooStake {
    string public name = "Moo Stake";
    address public owner;
    MelkToken public melkToken;
    MooNFT15 public mooNFT15;
    //uint256 public tokenCounter;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(MelkToken _melkToken, MooNFT15 _mooNFT15) {
        melkToken = _melkToken;
        mooNFT15 = _mooNFT15;
        owner = msg.sender;
    }

    /* Stakes Tokens (Deposit): An investor will deposit the DAI into the smart contracts
	to starting earning rewards.
		
	Core Thing: Transfer the DAI tokens from the investor's wallet to this smart contract. */
    function stakeTokens() public {
        // transfer Mock DAI tokens to this contract for staking
        mooNFT15.transferFrom(msg.sender, address(this), 0);

        //mooNFT15.transferFrom(msg.sender, address(this), tokenCounter);

        // // update staking balance
        // stakingBalance[msg.sender] = stakingBalance[msg.sender] + 1;

        // // add user to stakers array *only* if they haven't staked already
        // if(!hasStaked[msg.sender]) {
        // 	stakers.push(msg.sender);
        // }

        // // update stakng status
        // isStaking[msg.sender] = true;
        // hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw): Withdraw money from DApp.
    function unstakeTokens(uint256 tokenCounter) public {
        // fetch staking balance
        uint256 balance = stakingBalance[msg.sender];

        // require amount greter than 0
        require(balance > 0, "staking balance cannot be 0");

        // transfer Mock Dai tokens to this contract for staking
        mooNFT15.transferFrom(address(this), msg.sender, tokenCounter);

        // reset staking balance
        stakingBalance[msg.sender] = 0;

        // update staking status
        isStaking[msg.sender] = false;
    }

    // /* Issuing Tokens: Earning interest which is issuing tokens for people who stake them.
    // Core Thing: Distribute DApp tokens as interes and also allow the investor to unstake their tokens
    // from the app so give them interest using the app. */
    // function issueTokens() public {
    // 	// only owner can call this function
    // 	require(msg.sender == owner, "caller must be the owner");

    // 	// issue tokens to all stakers
    // 	for (uint i=0; i<stakers.length; i++) {
    // 		address recipient = stakers[i];
    // 		uint balance = stakingBalance[recipient];
    // 		if(balance > 0) {
    // 			dappToken.transfer(recipient, balance);
    // 		}
    // 	}
    // }
}
