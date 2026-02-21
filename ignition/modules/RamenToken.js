const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RamenTokenModule", (m) => {
    // RamenTokenをデプロイし、デプロイ実行者を初期オーナーとして設定します
    const deployer = m.getAccount(0);

    const ramenToken = m.contract("RamenToken", [deployer]);

    return { ramenToken };
});
