// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "./DappToken.sol";
import "./MooNFT15.sol";
//import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//import "./DaiToken.sol";

contract MooStake is Ownable {
    string public name = "Moo Stake";
    //address public owner;
    MooNFT15 public mooNFT15;

    constructor(MooNFT15 _mooNFT15) {
        mooNFT15 = _mooNFT15;
        //owner = msg.sender;
    }

    function callApprove(address to, uint256 tokenId) public {
        mooNFT15.approve(to, tokenId);
    }

    /* Stakes Tokens (Deposit): An investor will deposit the DAI into the smart contracts
	to starting earning rewards.
		
	Core Thing: Transfer the DAI tokens from the investor's wallet to this smart contract. */
    function stakeTokens(
        address from,
        address to,
        uint256 tokenId
    ) public {
        mooNFT15.transferFrom(from, to, tokenId);
        //mooNFT15.approve(address(this), tokenId);
    }
}
