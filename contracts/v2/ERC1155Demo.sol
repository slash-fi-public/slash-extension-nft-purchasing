// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC1155Demo is ERC1155, Ownable {
    using Counters for Counters.Counter;

    string baseURI = "http://localhost/nft/metadata/";
    string baseExt = ".json";
    string _name = "Slash NFT1155 Demo";
    string _symbol = "SNFTD";

    constructor() ERC1155("") {

    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function uri(uint256 _id) public view override returns (string memory _uri) {
        _uri = string(abi.encodePacked(baseURI, Strings.toString(_id), baseExt));
    }

    function mint(uint256 _tokenId, uint256 _amount) public onlyOwner {
        _mint(msg.sender, _tokenId, _amount, "");
    }

    function mintBatch(uint256[] memory _tokenIds, uint256[] memory _amounts) public onlyOwner {
        _mintBatch(msg.sender, _tokenIds, _amounts, "");
    }

}