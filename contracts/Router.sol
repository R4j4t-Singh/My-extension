//SPDX-License-Identifier: MIT
pragma solidity 0.8.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
}

contract Router is OwnableUpgradeable {
    struct Call {
        address target;
        bytes callData;
    }

    uint256 public fee;
    address public treasury;

    function initialize(address _treasury) initializer public {
        __Ownable_init();
        treasury = _treasury;
        fee = 0.01 ether;
    }
    
    function router(Call[] memory calls) public payable returns (uint256 blockNumber, bytes[] memory returnData) {
        // uint256 currentBal1 = address(this).balance;
        // require(msg.value >= fee, "Not enough ETH sent");
        // unable to send to actual treasury address. as its proxy and not payable
        // payable(treasury).transfer(msg.value);
        
        blockNumber = block.number;
        returnData = new bytes[](calls.length);
        for(uint256 i = 0; i < calls.length; i++) {         
            (bool success, bytes memory ret) = calls[i].target.call(calls[i].callData);
            require(success);
            returnData[i] = ret;
        }

        // uint256 currentBal = address(this).balance;
        // require(currentBal == 0, "Router: ETH left over");
    }

    function approveToken(address spender, uint256 amount, address tokenAddress) public onlyOwner {
        IERC20 Token = IERC20(tokenAddress);
        Token.approve(spender, amount);
    }

    function setFee(uint256 _fee) public onlyOwner {
        uint256 currentBal = address(this).balance;
        console.log('currentBal2: %s', currentBal);
        fee = _fee;
    }

    function setTreasury(address _treasury) public onlyOwner {
        treasury = _treasury;
    }
}