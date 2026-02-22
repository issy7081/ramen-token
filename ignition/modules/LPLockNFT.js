const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LPLockNFTModule", (m) => {
    // LP Lock Deployment for NFT (ERC721) based liquidity like Uniswap V3

    // 1. The address of the NFT contract (e.g., NonfungiblePositionManager)
    // You stated: 0x54A0EF7da351cb8fD1998E7945cc51E5825fB233
    const nftContractAddress = m.getParameter("nftContractAddress", "0x54A0EF7da351cb8fD1998E7945cc51E5825fB233");

    // 2. The specific Token ID (NFT ID) of your liquidity position that you want to lock
    // Since we don't know your specific ID, we leave it as a parameter you must provide or change here.
    // For example, if your NFT ID is "123", you can replace 0 with 123.
    const tokenId = m.getParameter("tokenId", 26444);

    // Beneficiary is the deployer
    const deployer = m.getAccount(0);

    // 1 hour lock
    const oneHourInSeconds = 60 * 60;
    const releaseTime = Math.floor(Date.now() / 1000) + oneHourInSeconds;

    // Deploy the contract with these 4 arguments
    const lpLockNFT = m.contract("LPLockNFT", [nftContractAddress, tokenId, deployer, releaseTime]);

    return { lpLockNFT };
});
