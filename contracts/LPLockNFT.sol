// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/**
 * @title LPLockNFT
 * @dev A time-lock contract specifically for Uniswap V3 style NFT LP tokens (ERC721).
 */
contract LPLockNFT is IERC721Receiver {
    // The ERC721 contract (e.g., Uniswap V3 NonfungiblePositionManager)
    IERC721 public immutable nftContract;
    
    // The ID of the specific NFT being locked
    uint256 public immutable tokenId;
    
    // The address of the beneficiary who will receive the NFT after the lock
    address public immutable beneficiary;
    
    // The timestamp when the NFT can be released
    uint256 public immutable releaseTime;

    constructor(
        IERC721 _nftContract,
        uint256 _tokenId,
        address _beneficiary,
        uint256 _releaseTime
    ) {
        require(_releaseTime > block.timestamp, "LPLockNFT: release time is before current time");
        nftContract = _nftContract;
        tokenId = _tokenId;
        beneficiary = _beneficiary;
        releaseTime = _releaseTime;
    }

    /**
     * @notice Transfers the locked NFT back to the beneficiary.
     */
    function release() public {
        require(block.timestamp >= releaseTime, "LPLockNFT: current time is before release time");
        
        // Ensure the contract actually owns the NFT
        require(nftContract.ownerOf(tokenId) == address(this), "LPLockNFT: this contract does not own the NFT");

        // Transfer the NFT back
        nftContract.safeTransferFrom(address(this), beneficiary, tokenId);
    }

    /**
     * @notice Allows the contract to safely receive an ERC721 token
     */
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
