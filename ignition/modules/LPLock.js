const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LPLockModule", (m) => {
    // We need the LP token address. We'll set it as a parameter with a default (the user's provided address)
    const lpTokenAddress = m.getParameter("lpTokenAddress", "0x54A0EF7da351cb8fD1998E7945cc51E5825fB233");

    // Beneficiary is the deployer (the user who will get the tokens back)
    const deployer = m.getAccount(0);

    // Set the release time to 1 hour from now (in seconds)
    // Hardhat Ignition runs off the current time of deployment
    const oneHourInSeconds = 60 * 60;
    const releaseTime = Math.floor(Date.now() / 1000) + oneHourInSeconds;

    // Deploy the lock contract
    const lpLock = m.contract("LPLock", [lpTokenAddress, deployer, releaseTime]);

    return { lpLock };
});
