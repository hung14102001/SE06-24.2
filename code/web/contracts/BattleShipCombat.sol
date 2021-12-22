// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BattleShipHelper.sol";

contract BattleShipCombat is BattleShipHelper {

    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    function slainEnemies(
        uint256 _shipId,
        uint16 killCount
    ) external onlyOwnerOf(_shipId) {
        BattleShip storage myShip = battleShips[_shipId];

        if (myShip.level < 10) {
            if (myShip.exp + killCount > myShip.level * 10) {
                myShip.exp = (myShip.exp + killCount) % (myShip.level * 10);
                myShip.level = myShip.level.add(1);

                myShip.damage = myShip.damage.add(5);
            } else {
                myShip.exp = myShip.exp + killCount;
            }
        }

        myShip.level = myShip.level.add(1);
        myShip.damage = myShip.level.mul(10);
    }
}
