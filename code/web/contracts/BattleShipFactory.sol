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
        uint shipType;
        uint256 exp;
        uint32 level;
        uint health;
        uint damage;
    }

    BattleShip[] public battleShips;

    mapping(uint256 => address) battleShipToOwner;
    mapping(address => uint256) ownerShipCount;

    function _generateRandomNumber()
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        // 3 types of ship
        return rand % 3 + 1;
    }
    
    function _generateRandomNumber(string memory prop)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, prop)));
        return rand % 20;
    }

    function createRandomBattleShip(address tokenAddress) external {

        require(AztecToken(tokenAddress).balanceOf(msg.sender) > 4000, "Insufficient balance!");

        uint256 rand = _generateRandomNumber();

        uint dmg = _generateRandomNumber("dmg") + 3**rand;
        uint hp = _generateRandomNumber("hp") + 3**rand;

        battleShips.push(BattleShip(rand, 0, 1, hp, dmg));

        uint id = battleShips.length;
        ownerShipCount[msg.sender] += 1;
        battleShipToOwner[id] = msg.sender;

        AztecToken(tokenAddress).burn(msg.sender, 4000);

        emit NewBattleShip(id);
    }
}
