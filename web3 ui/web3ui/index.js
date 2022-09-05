// METAMASK CONNECT - START

window.web3 = new Web3(window.ethereum)
var account;

const requestConnect = async () => {
    try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!

        console.log("about to request access")
        await ethereum.request({ method: 'eth_requestAccounts' });

        if (web3.currentProvider.chainId != "0xA869") { // mumbai 0x13881 // fuji 0xA869
            await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xA869" }] });
        }
        //console.log(web3.eth.chainId)
        //console.log("requesting connection")

        await (web3.eth.getAccounts(function (err, accounts) {
            if (err != null) {
                alert("Error retrieving accounts.");
                return;
            }
            if (accounts.length == 0) {
                alert("No account found! Make sure the Ethereum client is configured properly.");
                return;
            }
            account = accounts[0];
            console.log('Account: ' + account);
            web3.eth.defaultAccount = account;
        }));


    } catch (error) {
        console.error(error);
    }
}


const requestNeeded = async () => {
    try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!

        //console.log("about to request access")
        //await ethereum.request({ method: 'eth_requestAccounts' }); // i guess this is needed to rerender content on reload of webpage

        // if (web3.currentProvider.chainId != "0x13881") {
        // await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x13881" }] });
        // }
        //console.log(web3.eth.chainId)
        //console.log("requesting connection")

        await (web3.eth.getAccounts(function (err, accounts) {
            if (err != null) {
                alert("Error retrieving accounts.");
                return;
            }
            if (accounts.length == 0) {
                alert("No account found! Make sure the Ethereum client is configured properly.");
                return;
            }
            account = accounts[0];
            console.log('Account: ' + account);
            web3.eth.defaultAccount = account;
        }));


    } catch (error) {
        console.error(error);
    }
}


// METAMASK CONNECT - END





// MINTING NFT JAVASCRIPT - START

// contractAddress and abi are setted after contract deploy
var contractAddress = '0xe63c5Dac54a8e41c0E7643933d51De8974172582';
var abi = JSON.parse('[ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "mintTeam", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_TOKENS", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "price", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenCounter", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]');

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

//var products = contract.methods.totalSupply().call() // promise result is correct! This is a testcase
//console.log(contract.methods.totalSupply().call())


// check what the front end price in wei should be, used in minterNFT()
var supplyStor = 0;
var methodPrice = 0;
// var p = Promise.resolve(contract.methods.totalSupply().call());
// p.then(function (v) {
//     //console.log(v[0], typeof v[0]); // 1
//     supplyStor = v[0]
//     supplyStor = Number(supplyStor)
//     console.log(supplyStor, typeof supplyStor, v, typeof v)
//     if (supplyStor > 2) {
//         methodPrice = 20000000000000000
//     } else {
//         methodPrice = 10000000000000000
//     }
//     console.log(methodPrice)
// });

async function checkPrice() {
    var p = Promise.resolve(contract.methods.totalSupply().call());
    p.then(function (v) {
        //console.log(v[0], typeof v[0]); // 1
        supplyStor = v[0]
        supplyStor = Number(supplyStor)
        //console.log(supplyStor, typeof supplyStor, v, typeof v)
        if (supplyStor > 2) {
            methodPrice = 20000000000000000
        } else {
            methodPrice = 10000000000000000
        }
        //console.log(methodPrice)
    });
}


checkPrice();



//console.log(contract.methods.ownerOf(0).call()) // promise result is correct! This is a testcase


var someOwners = []; // [ 0, 1]

async function populateTokenIdArray() {
    for (let stepID = 0; stepID < supplyStor; stepID++) {
        someOwners.push(stepID)
    }
    console.log(someOwners)
}

var ownerIds = [];

async function totalID3() {

    for (let stepID = 0; stepID < supplyStor; stepID++) { //supplyStor holds the total supply varible in memory

        var p = Promise.resolve(contract.methods.ownerOf(stepID).call());
        await (p.then(function (v) {
            //console.log(v[0], typeof v[0]); // 1
            if (account == v) {
                ownerIds.push(stepID)
            }

            //console.log(someOwners)
            //console.log("this is the address for tokendId 1: ", someOwners[1])
        }));
    }
    console.log(ownerIds)

}


var imageArray = [];

async function getImage() {

    var stepperLimit = ownerIds.length

    for (let stepID = 0; stepID < stepperLimit; stepID++) {

        //console.log(contract.methods.tokenURI(accountTokenIds[stepID]).call())
        var p = Promise.resolve(contract.methods.tokenURI(ownerIds[stepID]).call());
        await (p.then(function (v) {
            //console.log(v[0], typeof v[0]); // 1
            //console.log("Owners tokenID: ", accountTokenIds[stepID], "  -  Owners Token URI: ", v)
            imageArray.push(v)

            //console.log("this is the tokenURI for owned NFT's : ", imageArray[stepID])
        }))
        //console.log("THis is loop iteration: ", stepID)
    }
    console.log(imageArray)
    //console.log(imageArray)
    // for (let stepID = 0; stepID < stepperLimit; stepID++) {

    //     let response = await fetch(imageArray[stepperLimit])
    //     let story = await response.json()
    //     //console.log(story)

    //     // fetch(imageArray[stepperLimit])
    //     //     .then(response => response.json())
    //     //     .then(data => console.log(data['image']));
    // }


}



var imageArray2 = [];

async function getImage2() { //this is one example of 

    //let url = 'http://query.yahooapis.com/v1/publ...';
    let obj = null;
    var stepperLimit = imageArray.length

    for (let stepID = 0; stepID < stepperLimit; stepID++)
        try {
            obj = await (await fetch(imageArray[stepID])).json();
            imageArray2.push(obj['image'])
            //console.log(obj['image']);
        } catch (e) {
            console.log('error');
        }
    console.log(imageArray2)
    //console.log(account)
    //console.log(obj['image']);
    //applyImages();

}





//Smart contract functions
function registerSetInfo() {
    info = $("#newInfo").val();
    contract.methods.setInfo(info).send({ from: account }).then(function (tx) {
        console.log("Transaction: ", tx);
    });
    $("#newInfo").val('');
}

function registerGetInfo() {
    contract.methods.getInfo().call().then(function (info) {
        console.log("info: ", info);
        document.getElementById('lastInfo').innerHTML = info;
    });
}

async function minterNFT() {

    //checkPrice()
    console.log(methodPrice)
    contract.methods.mint().send({ from: account, value: methodPrice });
    //contract.methods.mint().send({ from: account, value: 10000000000000000 });
    console.log("called mint")

    // contract.methods.mint().call().then(function (info) {
    //     console.log("info: ", info);
    // });

    // contract.methods._beforeTokenTransfer(contractAddress, account, 10)
    // contract.methods._baseURI()
    // contract.methods.mint().send(_safeMint())

    // totalID3();
    // checkTotalId();
    // getImage();
    // getImage2();
    // applyImages();
}


// DOM realted functions (HTML)
async function applyImages() {

    var container = document.getElementById('imageContainer');
    var docFrag = document.createDocumentFragment();

    imageArray2.forEach(function (url, index, originalArray) {
        var img = document.createElement('img');
        img.src = url;
        docFrag.appendChild(img);
    });


    container.appendChild(docFrag);
}

async function onButton() {

    await requestConnect();
    await populateTokenIdArray();
    await totalID3();
    await getImage();
    await getImage2();
    applyImages();

}

// async function onButton2() {

//     await requestNeeded();
//     await populateTokenIdArray();
//     await totalID3();
//     await getImage();
//     await getImage2();
//     applyImages();

// }

async function onButton2() {

    await requestNeeded();
    //await populateTokenIdArray();

    setTimeout(async function () {
        //your code to be executed after 1 second
        await populateTokenIdArray();;
    }, 275);

    setTimeout(async function () {
        //your code to be executed after 1 second
        await totalID3();
        await getImage();
        await getImage2();
        applyImages();
    }, 275);

    // await totalID3();
    // await getImage();
    // await getImage2();
    // applyImages();

}



//auto for metamask.
// if (window.web3.currentProvider.selectedAddress == null) {

//     onButton2();

// } else {

//     onButton();

// }

onButton2();

// MINTING NFT JAVASCRIPT - END




// MOO STAKING JAVASCRIPT - START

// contractAddress and abi are setted after contract deploy
var contractAddress2 = '0xaC5e6D3a69De60aB7504c22A9C5d51885b20d55C';
var abi2 = JSON.parse('[ { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "callApprove", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract MooNFT15", "name": "_mooNFT15", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "stakeTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "mooNFT15", "outputs": [ { "internalType": "contract MooNFT15", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ]');

//contract instance
contract2 = new web3.eth.Contract(abi2, contractAddress2);



async function trasnferNFT() {


    contract.methods.setApprovalForAll(contractAddress2, true).send({ from: account });
    //contract2.methods.stakeTokens(account, contractAddress2, tokenId).send({ from: account }); // remix allos transffer of nft without approve function

}

async function trasnferNFT2(tokenId) {


    //contract.methods.setApprovalForAll(contractAddress2, true).send({ from: account });
    contract2.methods.stakeTokens(account, contractAddress2, tokenId).send({ from: account }); // remix allos transffer of nft without approve function

}

async function trasnferNFT3(tokenId) {


    //contract.methods.setApprovalForAll(contractAddress2, true).send({ from: account });
    contract2.methods.stakeTokens(contractAddress2, account, tokenId).send({ from: account }); // remix allos transffer of nft without approve function

}


async function cake() {
    await trasnferNFT()
    await trasnferNFT2(0)
}

// MOO STAKING JAVASCRIPT - END






// MELK JAVASCRIPT - START

// MELK JAVASCRIPT _ END