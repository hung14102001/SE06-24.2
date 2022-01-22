const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("staking", function () {
  it("Should return the stake of ", async function () {
    const [owner] = await ethers.getSigners();
    const Aztec = await ethers.getContractFactory("StakingAztec");
    const aztec = await Aztec.deploy("Name", "label");

    console.log(await aztec.balanceOf(owner.address));
    console.log(await aztec.createStake(100));
    console.log(await aztec.stakeOf(owner.address));
    console.log(await aztec.balanceOf(owner.address));

    let i = 0;
    while (i < 210000) i += 1;
    await aztec.distributeRewards();
    await aztec.withdrawReward();
    console.log(await aztec.balanceOf(owner.address));

    expect(await aztec.rewardOf(owner.address)).to.equal(0);
  });
});
