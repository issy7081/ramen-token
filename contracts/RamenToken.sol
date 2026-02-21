// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RamenToken is ERC20, ERC20Burnable, Ownable {
    constructor(address initialOwner)
        ERC20("Ramen", "RAMEN")
        Ownable(initialOwner)
    {
        // デプロイした人（作成者）宛に、初期供給量として10億(1,000,000,000)トークンを発行 (Mint) する
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}
