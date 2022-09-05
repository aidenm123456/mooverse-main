window.web3 = new Web3(window.ethereum)
var account;


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


const requestConnect = async () => {
    try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!

        console.log("about to request access")
        await ethereum.request({ method: 'eth_requestAccounts' });

        if (web3.currentProvider.chainId != "0x3") { // was 0x13881 
            await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x3" }] });
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




// // Source code to interact with smart contract

// // web3 provider with fallback for old version
// if (window.ethereum) {
//     window.web3 = new Web3(window.ethereum)
//     try {
//         // ask user for permission
//         ethereum.request({ method: 'eth_requestAccounts' }) //ethereum.enable()
//         // user approved permission
//     } catch (error) {
//         // user rejected permission
//         console.log('user rejected permission')
//     }
// }
// // else if (window.web3) {
// //     window.web3 = new Web3(window.web3.currentProvider)
// //     // no need to ask for permission
// // }
// else {
//     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
// }
// console.log(window.web3.currentProvider)

// contractAddress and abi are setted after contract deploy
var contractAddress = '0xeF5f076DCDaac051ED459009B4018FC342c936Aa';
var abi = JSON.parse('[ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "MAX_TOKENS", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "price", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenCounter", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]');

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

function checkPrice() {
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


checkPrice()



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

// depreicated for testing can uncomment if failed

// var accountTokenIds = [];

// async function checkTotalId() {

//     for (let stepID = 0; stepID < supplyStor; stepID++) {
//         //console.log(stepID)

//         if (someOwners[stepID] == account) {
//             //console.log("hello there from func number 1")
//             accountTokenIds.push(stepID)
//         } else {
//             continue //console.log("hello there from func")
//         }
//     }
//     console.log(accountTokenIds)
//     console.log(account)

// }


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

function minterNFT() {

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
function applyImages() {

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

async function onButton2() {

    await requestNeeded();
    await populateTokenIdArray();
    await totalID3();
    await getImage();
    await getImage2();
    applyImages();

}


if (window.web3.currentProvider.selectedAddress == null) {

    onButton2();

} else {

    onButton();

}




// function trasnferNFT(tokenId) {
//     //console.log(contr)
//     //contract.methods.stakeTokens(tokenId, account).call()x
//     //contract.methods.setApprovalForAll(contractAddress, true).call()
//     //contract.methods.approve(contractAddress, tokenId).call()
//     contract.methods.transferFrom(account, contractAddress, tokenId).send({ from: account })
// }
