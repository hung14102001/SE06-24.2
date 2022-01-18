// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SafeMath.sol";
import "./Ownable.sol";
import "./AztecToken/AztecToken.sol";

contract BattleShipFactory is Ownable {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event NewBattleShip(uint256 shipId);

    struct BattleShip {
        uint id;
        uint shipType;
        uint256 exp;
        uint32 level;
        uint health;
        uint damage;
    }

    BattleShip[] public battleShips;
    uint16 lootboxPrice = 30;

    mapping(uint256 => address) battleShipToOwner;
    mapping(address => uint256) ownerShipCount;

    function _generateRandomNumber()
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        // 3 types of ship
        if (rand%100 < 60) return 1;
        if (rand%100 < 90) return 2;
        return 3;
    }
    
    function _generateRandomNumber(string memory prop, uint _type)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, prop)));
        return rand % 10*_type + 10*_type;
    }

    function createRandomBattleShip(address tokenAddress) external {

        require(AztecToken(tokenAddress).balanceOf(msg.sender) > lootboxPrice, "Insufficient balance!");

        uint256 shipType = _generateRandomNumber();

        uint dmg = _generateRandomNumber("dmg", shipType);
        uint hp = _generateRandomNumber("hp", shipType) + dmg*3;

        uint id = battleShips.length;
        ownerShipCount[msg.sender] += 1;
        battleShipToOwner[id] = msg.sender;
        battleShips.push(BattleShip(id, shipType, 0, 1, hp, dmg));


        AztecToken(tokenAddress).burn(msg.sender, lootboxPrice);

        emit NewBattleShip(id);
    }
}
