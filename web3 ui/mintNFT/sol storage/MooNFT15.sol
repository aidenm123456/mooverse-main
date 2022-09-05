// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MooNFT15 is ERC721("MooNFT15", "MOO15"), Ownable {
    uint256 public tokenCounter;
    uint256 public price = 10000000000000000; // 0.01 AVAX
    uint256 public MAX_TOKENS = 100; // maximum supply
    string public baseURI =
        "https://gateway.pinata.cloud/ipfs/QmNgD8iXt3HWxPazLvv5xNz8d1GYreTuMyp58AAc3PBenB/";

    using Strings for uint256;

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721)
        returns (bool)
    {
        return
            interfaceId == type(IERC721Enumerable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _baseURI()
        internal
        view
        virtual
        override(ERC721)
        returns (string memory)
    {
        return baseURI;
    }

    function totalSupply() external view returns (uint256) {
        return tokenCounter;
    }

    function mint() public payable {
        require(tokenCounter < MAX_TOKENS, "ERC721: Max supply");

        if (tokenCounter > 2) {
            price = 20000000000000000; // 0.02 AVAX
        } else {
            price = 10000000000000000; // 0.01 AVAX
        }

        require(msg.value == price, "The price of the NFT is 0.01 AVAX");
        _safeMint(_msgSender(), tokenCounter);
        tokenCounter = tokenCounter + 1;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
