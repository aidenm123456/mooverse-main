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


    //Moo Stakiong Contract vars
    uint256 decayDate;
    


    // Defining Staking Structure
	struct Staking {

		// Declaring different data types
		//string name;
		uint256 stakingBalance;
		uint256 lastUpdated;
		uint256[] tokenIdArray;
		bool isCurrentlyStaking;
		bool hasStakedBefore;
	}
	
	// Creating mapping for Staking Structure
	mapping (address => Staking) result;
	address[] Staking_result;





    MooNFT15 public mooNFT15;

    constructor(MooNFT15 _mooNFT15) {
        mooNFT15 = _mooNFT15;
        //owner = msg.sender;
    }




    /* STAKING AND UNSTAKING FUNCTIONS 
    Core Thing: Transfer the MOO NFT from the holders wallet to this smart contract. */
    function stakeTokens(address from, address to, uint256 tokenId) public {
        
		Staking storage StakingUser = result[from];	
		
		
		if (StakingUser.hasStakedBefore == false) {
		
			mooNFT15.transferFrom(from, to, tokenId);
			
			StakingUser.stakingBalance = 0;
			StakingUser.lastUpdated = block.timestamp;
			StakingUser.tokenIdArray.push(tokenId); //temporarily commented out
			
			Staking_result.push(from);
			StakingUser.hasStakedBefore = true;
			StakingUser.isCurrentlyStaking = true;
		
		}
		
		else if (StakingUser.isCurrentlyStaking == true) {
		
			rewards(from);
			mooNFT15.transferFrom(from, to, tokenId);
			
			//StakingUser.lastUpdated = block.timestamp;
			StakingUser.tokenIdArray.push(tokenId); //temporarily commented out
			//rewards(from);
		
		}
		
		
		else if (StakingUser.isCurrentlyStaking == false && StakingUser.hasStakedBefore == true) {
		
			mooNFT15.transferFrom(from, to, tokenId);
			
			StakingUser.stakingBalance = 0;
			StakingUser.lastUpdated = block.timestamp;
			StakingUser.tokenIdArray.push(tokenId); //temporarily commented out
			StakingUser.isCurrentlyStaking = true;
		
		}
    }


    function unstakeTokens(address from, address to, uint256 tokenId) public {

		Staking storage StakingUser = result[to];
		//uint256 temp;

        require(unstakeOwner(to, tokenId) == true); // do they own staked moo in the mapping?

		if (StakingUser.tokenIdArray.length == 1) { // is this thier last moo to unstake?

			//make sure thier balance is equal to 0 before unstaking final moo.
			require(StakingUser.stakingBalance == 0, "Your rewards balance must be equal to 0 if you are unstaking your only moo.");
			mooNFT15.transferFrom(from, to, tokenId); // transfer moo
			//StakingUser.tokenIdArray =  new uint256[](0);
			StakingUser.isCurrentlyStaking = false; // setting the current staking flag to false
			StakingUser.lastUpdated = 0; // setting the last time they have upadted thier rewards to never!
			//delete StakingUser.tokenIdArray;
			StakingUser.tokenIdArray =  new uint256[](0); // since this is thier last moo we are over writing the tokenIdArray to be empty
		}

		else if (StakingUser.tokenIdArray.length > 1) { // this is not thier final moo, so staking balance does not need to be 0.
			
			rewards(to); // update rewards before any unstake happens
			mooNFT15.transferFrom(from, to, tokenId);

			StakingUser.isCurrentlyStaking = false;

			// is the last element in the array the tokenId we want to remove? 
			if (StakingUser.tokenIdArray[StakingUser.tokenIdArray.length - 1] == tokenId) {
				StakingUser.tokenIdArray.pop(); // if so pop it
				//StakingUser.isCurrentlyStaking = false;
			}

			// is the last element in the array not the tokenId we want to remove?
			else if (StakingUser.tokenIdArray[StakingUser.tokenIdArray.length - 1] != tokenId) {

				// loop  through the array of tokenIds that the stakers "owns"
				for (uint256 i=0; i < StakingUser.tokenIdArray.length; i ++) {

					// is the tokenId we are on is equal to the tokenId we are trying to remove?
					if (StakingUser.tokenIdArray[i] == tokenId) {

						// if so set this tokenId equal to the last element in the array
						StakingUser.tokenIdArray[i] = StakingUser.tokenIdArray[StakingUser.tokenIdArray.length - 1];
						//now that the tokenId we want to remove has been over riden, pop last element in array
						StakingUser.tokenIdArray.pop();
						//StakingUser.isCurrentlyStaking = false;
						break;
					}
				}

			}

			//rewards(to); // i think i need this idk yet?

		}
        
    }

    function unstakeOwner(address unstakingOwner, uint256 unStakeTokenId) public view returns(bool tokenIdFlag) {
        Staking storage StakingUser = result[unstakingOwner];
        
        for (uint256 i=0; i < StakingUser.tokenIdArray.length;i++) {
            
            if (StakingUser.tokenIdArray[i] == unStakeTokenId) {
                return true;
            }

            else {
                continue;
            }

        }
    }


    // return functions needed to mint $MELK
    function isBalanceCorrect(address clamingAddress) public view returns(uint256 stakedBalance){
        Staking storage StakingUser = result[clamingAddress];
        return StakingUser.stakingBalance;

    }

    function decreaseBalance(address clamingAddress) external returns(bool isFinished) {
        Staking storage StakingUser = result[clamingAddress];
        StakingUser.stakingBalance = 0;
        return true;
    }




    //ONCE STAKED FUNCTIONS
    // THIS IS VERY IMPORTANT

    // Function adding values to the mapping
	function adding_values(address addy, uint256 tokenIdDepo) public { //uint256 tokenIdDepo - pass in as parameter

		
		Staking storage StakingUser = result[addy];

		StakingUser.stakingBalance = 0;
		StakingUser.lastUpdated = block.timestamp;
		StakingUser.tokenIdArray.push(tokenIdDepo); //temporarily commented out
		
		Staking_result.push(addy) ;

	}

	// Function to retrieve 
    // values from a mapping, returns array of addresses
    function get_staking_result() view public returns (address[] memory) {
        return Staking_result;
    }

	// returns a staking users lastUpdated time
	function get_user(address addy) view public returns (uint256) {
		Staking storage StakingUser = result[addy];
		return StakingUser.lastUpdated;
	}

	function setDecay() public returns(uint256) {
		decayDate = block.timestamp;
		return decayDate;
	}

	function get_stakingBal(address addy) view public returns (uint256) {
		Staking storage StakingUser = result[addy];
		return StakingUser.stakingBalance;
	}




    //rewards calulation function
    //EXTRA IMPORTANT

    function rewards(address stakerAddress) public {

        uint256 nowUpdate;
        uint256 startRewards;

        uint256 partialRewards1;
        uint256 partialRewards2;
        uint256 totalRewards;

	    uint256 rewardsPeriod;

		Staking storage StakingUser = result[stakerAddress];
		

		//does your balance need updating?
		if (block.timestamp - StakingUser.lastUpdated > 20 seconds) { // > 1 days usually, 1 day reward updates

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
					startRewards = 10000000000000000000;
				}

				else if (i != 0) {
					startRewards = (startRewards * 98) / 100;
				}
				
			}


			//now it is time to check the three senarios




			//are we in decay completly? (scenario 1)
			if (nowUpdate - decayDate < 31536000 && StakingUser.lastUpdated - decayDate < 31536000) {

				for (uint256 i=(StakingUser.lastUpdated - decayDate) / rewardsPeriod; i < (nowUpdate - decayDate)/rewardsPeriod; i++) {

                    //right here add startRewards and calculater each new day

					if (i == (StakingUser.lastUpdated - decayDate) / rewardsPeriod) {
						//totalRewards = (startRewards * 98) / 100;
                        totalRewards = startRewards;
					}
					
					else if (i > (StakingUser.lastUpdated - decayDate) / rewardsPeriod){
                        startRewards = ((startRewards * 98) / 100);
						totalRewards = totalRewards + startRewards; // remove multiplying by itself messing up rewards calc
					}

				}
				//totalRewards = totalRewards * StakingUser.stakingBalance;
				StakingUser.stakingBalance = StakingUser.stakingBalance + totalRewards;
                StakingUser.lastUpdated = nowUpdate;
			}





			//are we passed decay, but sill have to pay out decaying rewards? (scenario 2)
			else if (nowUpdate - decayDate > 365 days && StakingUser.lastUpdated - decayDate < 365 days) {
				
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
				for(uint256 i = 365; i < (nowUpdate - decayDate) / rewardsPeriod; i ++) {

					partialRewards2 += 4;

				}
				totalRewards = (partialRewards1 + partialRewards2);
				StakingUser.stakingBalance = StakingUser.stakingBalance + totalRewards;
                StakingUser.lastUpdated = nowUpdate;
			}





			// we are completly passed the decay period? (scenario 3)
			else if (nowUpdate - decayDate > 365 days && StakingUser.lastUpdated - decayDate > 365) {

				for(uint256 i = (StakingUser.lastUpdated - decayDate) / rewardsPeriod; i < (nowUpdate - decayDate) / rewardsPeriod; i++) {
					
					totalRewards = totalRewards + 4;
				}
				StakingUser.stakingBalance = StakingUser.stakingBalance + totalRewards;
                StakingUser.lastUpdated = nowUpdate;
			}

		}
		//StakingUser.lastUpdated = nowUpdate;
		//StakingUser.stakingBalance = StakingUser.stakingBalance + totalRewards; // can try uncommenting to see functionality!
	}





}
