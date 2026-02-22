// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title LPLock
 * @dev A simple time-lock contract to lock tokens (like LP tokens) until a specific time.
 */
contract LPLock {
    using SafeERC20 for IERC20;

    // The ERC20 token being locked (in this case, the LP Token address)
    IERC20 public immutable token;
    
    // The address of the beneficiary who will receive the tokens after the lock
    address public immutable beneficiary;
    
    // The timestamp when the tokens can be released
    uint256 public immutable releaseTime;

    constructor(IERC20 _token, address _beneficiary, uint256 _releaseTime) {
        require(_releaseTime > block.timestamp, "LPLock: release time is before current time");
        token = _token;
        beneficiary = _beneficiary;
        releaseTime = _releaseTime;
    }

    /**
     * @notice Transfers tokens held by timelock to beneficiary.
     * @dev Will only succeed if the releaseTime has passed.
     */
    function release() public virtual {
        require(block.timestamp >= releaseTime, "LPLock: current time is before release time");

        uint256 amount = token.balanceOf(address(this));
        require(amount > 0, "LPLock: no tokens to release");

        token.safeTransfer(beneficiary, amount);
    }
}
