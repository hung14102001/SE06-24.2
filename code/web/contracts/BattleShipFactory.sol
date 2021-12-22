// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SafeMath.sol";
import "./Ownable.sol";

contract BattleShipFactory is Ownable {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event NewBattleShip(uint256 shipId, string name);

    struct BattleShip {
        string name;
        uint shipType;
        uint256 exp;
        uint32 level;
        uint16 health;
        uint32 damage;
    }

    BattleShip[] public battleShips;

    mapping(uint256 => address) battleShipToOwner;
    mapping(address => uint256) ownerShipCount;

    function _generateRandomNumber(string memory _str)
        private
        pure
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % 5;
    }

    function createRandomBattleShip(string memory _name) internal {
        uint256 rand = _generateRandomNumber(_name);
        rand = rand - (rand % 10);
        battleShips.push(BattleShip(_name, rand, 0, 1, 30, 10));

        uint id = battleShips.length;
        ownerShipCount[msg.sender] += 1;
        battleShipToOwner[id] = msg.sender;

        emit NewBattleShip(id, _name);
    }
}
