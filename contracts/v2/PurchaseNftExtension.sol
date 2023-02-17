// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

import "./interfaces/ISlashCustomPlugin.sol";
import "./libs/UniversalERC20.sol";

contract PurchaseNftExtension is ISlashCustomPlugin, Ownable, IERC1155Receiver {
    using UniversalERC20 for IERC20;

    struct PurchaseInfo {
        address nftContractAddress;
        uint256 nftTokenId;
        address recipient;
        uint256 amount;
    }

    function receivePayment(
        address receiveToken,
        uint256 amount,
        bytes calldata,
        string calldata,
        bytes calldata  reserved
    ) external payable override {
        require(amount > 0, "invalid amount");
        
        IERC20(receiveToken).universalTransferFrom(msg.sender, owner(), amount);
        // do something
        purchaseNft(reserved);
    }

    function purchaseNft(bytes memory reserved) internal {
        PurchaseInfo memory info = abi.decode(reserved, (PurchaseInfo));
        require(info.nftContractAddress != address(0), "invalid nft address");
        require(info.recipient != address(0), "invalid recipient address");
        require(info.amount > 0, "invalid purchase amount");

        IERC1155 nft = IERC1155(info.nftContractAddress);
        require(
            info.amount <= nft.balanceOf(address(this), info.nftTokenId), "no stocks"
        );

        nft.safeTransferFrom(
            address(this), 
            info.recipient, 
            info.nftTokenId, 
            info.amount, 
            "0x"
        );

    }

    function withdrawToken(address tokenContract) external onlyOwner {
        require(
            IERC20(tokenContract).universalBalanceOf(address(this)) > 0,
            "balance is zero"
        );

        IERC20(tokenContract).universalTransfer(
            msg.sender,
            IERC20(tokenContract).universalBalanceOf(address(this))
        );

        emit TokenWithdrawn(
            tokenContract,
            IERC20(tokenContract).universalBalanceOf(address(this))
        );
    }

    event TokenWithdrawn(address tokenContract, uint256 amount);

    /**
     * @dev Check if the contract is Slash Plugin
     *
     * Requirement
     * - Implement this function in the contract
     * - Return true
     */
    function supportSlashExtensionInterface()
        external
        pure
        override
        returns (uint8)
    {
        return 2;
    }
    

    // ERC1155 related functions
    function onERC1155Received(
        address, /*operator*/
        address, /*from*/
        uint256, /*id*/
        uint256, /*value*/
        bytes calldata /*data*/
    ) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address, /*operator*/
        address, /*from*/
        uint256[] calldata, /*ids*/
        uint256[] calldata, /*values*/
        bytes calldata /*data*/
    ) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(
        bytes4 /*interfaceId*/
    ) public view virtual override returns (bool) {
        return false;
    }

}