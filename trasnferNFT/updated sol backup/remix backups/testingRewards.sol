// SPDX-License-Identifier: MIT
// Solidity program to
// demonstrate retrieve
// values from the mapping

pragma solidity ^0.8.0;

contract mapping_example {

	uint256 decayDate;

	//temp

	uint256 nowUpdate;
	uint256 startRewards;

	uint256 partialRewards1;
	uint256 partialRewards2;
	uint256 totalRewards;


	//uint256 decayCliff;
	uint256 rewardsPeriod;

	//temp
	

	// Defining Structure
	struct Staking {

		// Declaring different data types
		//string name;
		uint256 stakingBalance;
		uint256 lastUpdated;
		uint256[] tokenIdArray;
	}
	
	// Creating mapping
	mapping (address => Staking) result;
	address[] Staking_result;
	
	// Function adding values to the mapping
	function adding_values(address addy) public { //uint256 tokenIdDepo - pass in as parameter

		
		Staking storage StakingUser = result[addy];

		StakingUser.stakingBalance = 10;
		StakingUser.lastUpdated = block.timestamp;
		//StakingUser.tokenIdArray.push(tokenIdDepo); //temporarily commented out
		
		Staking_result.push(addy) ;

	}

	// Function to retrieve 
    // values from a mapping, returns array of addresses
    function get_staking_result() view public returns (address[] memory) {
        return Staking_result;
    }

	// returns a staking users lastUpdated time
	function get_user(address addy) view public returns (uint256) {
		Staking memory StakingUser = result[addy];
		return StakingUser.lastUpdated;
	}

	function setDecay() public returns(uint256) {
		decayDate = block.timestamp;
		return decayDate;
	}

	function get_stakingBal(address addy) view public returns (uint256) {
		Staking memory StakingUser = result[addy];
		return StakingUser.stakingBalance;
	}




	function rewards(address stakerAddress) public {

		Staking storage StakingUser = result[stakerAddress];
		

		//does your balance need updating?
		if (block.timestamp - StakingUser.lastUpdated > 20 ) { // > 1 days usually, 1 day reward updates

			nowUpdate = block.timestamp;
			//uint256 startRewards;

			//uint256 partialRewards1;
			//uint256 partialRewards2;
			//uint256 totalRewards;


			//uint256 decayCliff;
			rewardsPeriod = 20; //default is 86400 seconds/1 day




			// loop for calcuting where to start for time based rewards 
			for (uint256 i=0; i < (StakingUser.lastUpdated - decayDate)/rewardsPeriod; i++) {

				if (i == 0) {
					startRewards = 40;
				}

				else if (i > 0) {
					startRewards = (startRewards * 98) / 100;
				}
				
			}


			//now it is time to check the three senarios




			//are we in decay completly? (scenario 1)
			if (nowUpdate - decayDate < 365 days && StakingUser.lastUpdated - decayDate < 365) {

				for (uint256 i=(StakingUser.lastUpdated - decayDate) / rewardsPeriod; i < (nowUpdate - decayDate)/rewardsPeriod; i++) {

					if (i == (StakingUser.lastUpdated - decayDate) / rewardsPeriod) {
						totalRewards = (startRewards * 98) / 100;
					}
					
					else if (i > (StakingUser.lastUpdated - decayDate) / rewardsPeriod){
						totalRewards = totalRewards + ((totalRewards * 98) / 100);
					}

				}
				totalRewards = totalRewards * StakingUser.stakingBalance;
				StakingUser.stakingBalance = StakingUser.stakingBalance + totalRewards;
			}





			//are we passed decay, but sill have to pay out decaying rewards? (scenario 2)
			else if (nowUpdate - decayDate > 365 days && StakingUser.lastUpdated - decayDate < 365) {
				
				// partial 1 rewards for decay 
				for(uint256 i=(StakingUser.lastUpdated-decayDate) / rewardsPeriod; i < 365; i ++) {

					if (i == (StakingUser.lastUpdated - decayDate) / rewardsPeriod) {
						partialRewards1 = (startRewards * 98) / 100;
					}
					
					else if (i > (StakingUser.lastUpdated - decayDate) / rewardsPeriod){
						partialRewards1 = partialRewards1 + ((partialRewards1 * 98) / 100);
					}

				}

				//partial 2 rewards for static 
				for(uint256 i = 366; i < (nowUpdate - decayDate) / rewardsPeriod; i ++) {

					partialRewards2 += 4;

				}
				totalRewards = (partialRewards1 + partialRewards2) * StakingUser.stakingBalance;
				StakingUser.stakingBalance = StakingUser.stakingBalance + totalRewards;
			}





			// we are completly passed the decay period? (scenario 3)
			else if (nowUpdate - decayDate > 365 days && StakingUser.lastUpdated - decayDate > 365) {

				for(uint256 i = (StakingUser.lastUpdated - decayDate) / rewardsPeriod; i < (nowUpdate - decayDate) / rewardsPeriod; i++) {
					
					totalRewards = totalRewards + 4;
				}
				totalRewards = totalRewards * StakingUser.stakingBalance;
				StakingUser.stakingBalance = StakingUser.stakingBalance + totalRewards;
			}

		}
		
		//StakingUser.stakingBalance = StakingUser.stakingBalance + totalRewards; // can try uncommenting to see functionality!
	}




}
