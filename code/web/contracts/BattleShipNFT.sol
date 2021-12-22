// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BattleShipHelper.sol";
import "./interfaces/IERC721.sol";

abstract contract BattleShipNFT is BattleShipHelper, IERC721 {

    using SafeMath for uint256;

    mapping (uint => address) shipAprrovals;

    function balanceOf(address _owner) override external view returns (uint256) {
        return ownerShipCount[_owner];
    }

    function ownerOf(uint256 _tokenId) override external view returns (address) {
        return battleShipToOwner[_tokenId];
    }

    // function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) external payable;
    // function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;

    function _transferFrom(address _from, address _to, uint256 _tokenId) private {
        battleShipToOwner[_tokenId] = _to;
        ownerShipCount[_to] = ownerShipCount[_to].add(1);
        ownerShipCount[_from] = ownerShipCount[_from].sub(1);

        emit Transfer(_from, _to, _tokenId);

    }

    // transfer token if msg.sender owns this one or get approval
    function transferFrom(address _from, address _to, uint256 _tokenId) override external payable {
        require(battleShipToOwner[_tokenId] == msg.sender || shipAprrovals[_tokenId] == msg.sender);
        _transferFrom(_from, _to, _tokenId);

    }
    
    function approve(address _approved, uint256 _tokenId) override external payable {
        shipAprrovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    // function setApprovalForAll(address _operator, bool _approved) external;
    // function getApproved(uint256 _tokenId) external view returns (address);
    // function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}
