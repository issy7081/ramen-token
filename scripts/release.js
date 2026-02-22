const hre = require("hardhat");

async function main() {
    const lpLockNFTAddress = "0x6DE7C31CD5EEF5d03cF64e6e0cA330dAee90F062";
    console.log("Releasing tokens from LPLockNFT at:", lpLockNFTAddress);

    const LPLockNFT = await hre.ethers.getContractFactory("LPLockNFT");
    const lpLockNFT = LPLockNFT.attach(lpLockNFTAddress);

    try {
        console.log("Sending release transaction...");
        const tx = await lpLockNFT.release();
        console.log("Tx hash:", tx.hash);
        console.log("Waiting for confirmation...");
        await tx.wait();
        console.log("Successfully released the locked NFT/Tokens!");
    } catch (error) {
        console.error("\nFailed to release. Error details:", error.message);
        console.error("This usually means it's not time yet, or no tokens are locked.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
