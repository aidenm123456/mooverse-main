window.web3 = new Web3(window.ethereum)
var account;

const requestConnect = async () => {
    try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await ethereum.request({ method: 'eth_requestAccounts' });
        //console.log("requesting connection")

        web3.eth.getAccounts(function (err, accounts) {
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
        });


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
var contractAddress = '0x16A6Fa73b70DD1592C5C66cda56B4536b313fC97';
var abi = JSON.parse('[ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_TOKENS", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "price", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" } ]');

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
// var account;

// web3.eth.getAccounts(function (err, accounts) {
//     if (err != null) {
//         alert("Error retrieving accounts.");
//         return;
//     }
//     if (accounts.length == 0) {
//         alert("No account found! Make sure the Ethereum client is configured properly.");
//         return;
//     }
//     account = accounts[0];
//     console.log('Account: ' + account);
//     web3.eth.defaultAccount = account;
// });

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

    console.log("about to call mint")
    contract.methods.mint().send({ from: account, value: contract.methods.mint().tokenCounter });
    //contract.methods.mint().send({ from: account, value: 10000000000000000 });
    console.log("called mint")

    // contract.methods.mint().call().then(function (info) {
    //     console.log("info: ", info);
    // });

    // contract.methods._beforeTokenTransfer(contractAddress, account, 10)
    // contract.methods._baseURI()
    // contract.methods.mint().send(_safeMint())
}