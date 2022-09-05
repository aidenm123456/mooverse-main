// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";

contract Melk is ERC20 {

    uint256 public MAX_TOKENS = 100;

    constructor(uint256 initialSupply) ERC20("Melk", "MELK") {
        _mint(msg.sender, initialSupply);
    }


    function mintClaim(address claimer, uint256 reward) public {
    
        //require(claimer == msg.sender), require(stakingBalance == rewards)
        _mint(claimer, reward);
    
    }

}