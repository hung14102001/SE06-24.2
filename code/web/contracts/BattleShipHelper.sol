// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BattleShipFactory.sol";

contract BattleShipHelper is BattleShipFactory {

    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    uint256 levelUpFee = 0.00001 ether;

    modifier aboveLevel(uint256 _level, uint256 _shipId) {
        require(battleShips[_shipId].level >= _level);
        _;
    }

    modifier onlyOwnerOf(uint256 _shipId) {
        require(
            battleShipToOwner[_shipId] == msg.sender,
            "You dont possess this ship"
        );
        _;
    }

    function withdraw() external onlyOwner {
        address _owner = owner();
        payable(_owner).transfer(address(this).balance);
    }

    function setLevelUpFee(uint256 _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    function shipLevelUp(uint256 _shipId) external payable {
        require(msg.value == levelUpFee);
        battleShips[_shipId].level = battleShips[_shipId].level.add(1);
    }

    function changeName(uint256 _shipId, string memory _newName)
        external
        aboveLevel(10, _shipId)
        onlyOwnerOf(_shipId)
    {
        battleShips[_shipId].name = _newName;
    }

    function getShipsByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](ownerShipCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < battleShips.length; i++) {
            if (battleShipToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}
