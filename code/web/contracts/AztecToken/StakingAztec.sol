// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AztecToken.sol";
import "../SafeMath.sol";
import "../Ownable.sol";

contract StakingAztec is AztecToken, Ownable {
    using SafeMath for uint256;
    uint256 private _timeToGetReward;
    uint256 private _maxStakeReward;
    uint256 private _totalStakeReward;

    constructor(string memory name_, string memory symbol_)
        AztecToken(name_, symbol_)
        Ownable()
    {
        _maxStakeReward = _maxSupply / 10;
        _totalStakeReward = 0;
        _timeToGetReward = 20;
    }

    function getMaxStakeReward() public view returns (uint256) {
        return _maxStakeReward;
    }

    function getTotalStakeReward() public view returns (uint256) {
        return _totalStakeReward;
    }

    address[] internal stakeholders;
    mapping(address => uint256) internal startTimes;

    /**
     * @notice A method to check if an address is a stakeholder.
     * @param _address The address to verify.
     * @return bool, uint256 Whether the address is a stakeholder,
     * and if so its position in the stakeholders array.
     */
    function isStakeholder(address _address)
        public
        view
        returns (bool, uint256)
    {
        for (uint256 s = 0; s < stakeholders.length; s += 1) {
            if (_address == stakeholders[s]) return (true, s);
        }
        return (false, 0);
    }

    /**
     * @notice A method to add a stakeholder.
     * @param _stakeholder The stakeholder to add.
     */
    function addStakeholder(address _stakeholder, uint256 _time) private {
        (bool _isStakeholder, ) = isStakeholder(_stakeholder);
        if (!_isStakeholder) {
            stakeholders.push(_stakeholder);
            startTimes[_stakeholder] = _time;
        }
    }

    /**
     * @notice A method to remove a stakeholder.
     * @param _stakeholder The stakeholder to remove.
     */
    function removeStakeholder(address _stakeholder) public {
        (bool _isStakeholder, uint256 s) = isStakeholder(_stakeholder);
        if (_isStakeholder) {
            stakeholders[s] = stakeholders[stakeholders.length - 1];
            stakeholders.pop();
        }
    }

    mapping(address => uint256) internal stakes;

    /**
     * @notice A method to retrieve the stake for a stakeholder.
     * @param _stakeholder The stakeholder to retrieve the stake for.
     * @return uint256 The amount of wei staked.
     */
    function stakeOf(address _stakeholder) public view returns (uint256) {
        return stakes[_stakeholder];
    }

    /**
     * @notice A method to the aggregated stakes from all stakeholders.
     * @return uint256 The aggregated stakes from all stakeholders.
     */
    function totalStakes() public view returns (uint256) {
        uint256 _totalStakes = 0;
        for (uint256 s = 0; s < stakeholders.length; s += 1) {
            _totalStakes = _totalStakes.add(stakes[stakeholders[s]]);
        }
        return _totalStakes;
    }

    /**
     * @notice A method for a stakeholder to create a stake.
     * @param _stake The size of the stake to be created.
     */
    function createStake(uint256 _stake) public {
        _stake = _stake * 1_000_000_000_000_000_000;
        _burn(msg.sender, _stake);
        if (stakes[msg.sender] == 0)
            addStakeholder(msg.sender, block.timestamp);
        else
            require(
                block.timestamp > startTimes[msg.sender] + _timeToGetReward,
                "Please wait 20s for stake more"
            );
        stakes[msg.sender] = stakes[msg.sender].add(_stake);
    }

    /**
     * @notice A method for a stakeholder to remove a stake.
     * @param _stake The size of the stake to be removed.
     */
    function removeStake(uint256 _stake) public {
        _stake = _stake * 1_000_000_000_000_000_000;
        stakes[msg.sender] = stakes[msg.sender].sub(_stake);
        if (stakes[msg.sender] == 0) removeStakeholder(msg.sender);
        _mint(msg.sender, _stake);
    }

    mapping(address => uint256) internal rewards;

    /**
     * @notice A method to allow a stakeholder to check his rewards.
     * @param _stakeholder The stakeholder to check rewards for.
     */
    function rewardOf(address _stakeholder) public view returns (uint256) {
        return rewards[_stakeholder];
    }

    /**
     * @notice A method to the aggregated rewards from all stakeholders.
     * @return uint256 The aggregated rewards from all stakeholders.
     */
    function totalRewards() public view returns (uint256) {
        uint256 _totalRewards = 0;
        for (uint256 s = 0; s < stakeholders.length; s += 1) {
            _totalRewards = _totalRewards.add(rewards[stakeholders[s]]);
        }
        return _totalRewards;
    }

    /**
     * @notice A simple method that calculates the rewards for each stakeholder.
     * @param _stakeholder The stakeholder to calculate rewards for.
     */
    function calculateReward(address _stakeholder) public returns (uint256) {
        if (block.timestamp > startTimes[_stakeholder] + 20) {
            startTimes[_stakeholder] = block.timestamp;
            uint256 r = _totalStakeReward + stakes[_stakeholder] / 100;
            if (r > _maxStakeReward) return r - _maxStakeReward;
            return r;
        }
        return 0;
    }

    /**
     * @notice A method to distribute rewards to all stakeholders.
     */
    function distributeRewards() public onlyOwner {
        for (uint256 s = 0; s < stakeholders.length; s += 1) {
            address stakeholder = stakeholders[s];
            uint256 reward = calculateReward(stakeholder);
            rewards[stakeholder] = rewards[stakeholder].add(reward);
        }
    }

    /**
     * @notice A method to allow a stakeholder to withdraw his rewards.
     */
    function withdrawReward() public {
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        _mint(msg.sender, reward);
        _totalStakeReward.add(reward);
    }
}
