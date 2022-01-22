import ship from "./images/lootbox.jpg";
import ship2 from "./images/ship_2.png";
import ship3 from "./images/ship_3.png";
import Popup from "./components/Popup";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import BattleShipNFT from "../artifacts/contracts/BattleShipNFT.sol/BattleShipNFT.json";
import AztecToken from "../artifacts/contracts/AztecToken/StakingAztec.sol/StakingAztec.json";

const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;

const style1 = { outline: "none" };
const style4 = { transform: "translate(0px)" };

function Stake(props) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const tokenContract = new ethers.Contract(
    tokenAddress,
    AztecToken.abi,
    provider.getSigner()
  );

  const [popup, setPopup] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakedAT, setStakedAT] = useState(0);
  const [reward, setReward] = useState(0);
  const [totalStakeReward, setTotalStakeReward] = useState(0);

  async function getStakedInfo() {
    try {
      const t = await tokenContract.getTotalStakeReward();
      const r = await tokenContract.rewardOf(props.userAccount);
      const s = await tokenContract.stakeOf(props.userAccount);

      setReward(parseFloat(r["_hex"], 16) / 1e16);
      setStakedAT(Math.round(parseInt(s["_hex"], 16) / 1e18));
      setTotalStakeReward(parseFloat(t["_hex"], 16) / 1e16);
    } catch (e) {
      console.log(e);
    }
  }

  async function stake() {
    try {
      if (stakeAmount > 0) {
        await tokenContract.createStake(parseInt(stakeAmount));
        const s = await tokenContract.stakeOf(props.userAccount);
        setStakedAT(Math.round(parseInt(s["_hex"], 16) / 1e18));
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function withdrawReward() {
    try {
      const r = await tokenContract.rewardOf(props.userAccount);
      console.log(r);
      await tokenContract.withdrawReward();
    } catch (e) {
      console.log(e);
    }
  }

  async function dist() {
    try {
      await tokenContract.distributeRewards();
    } catch (e) {
      console.log(e);
    }
  }

  getStakedInfo();

  return (
    <div>
      <div className="__gatsby">
        <div style={style1} id="gatsby-focus-wrapper">
          <div className="main">
            <section className="section showroom-txt">
              <div className="sr-txt">
                <span>STAKE</span>
                <h2>
                  <span>GET YOUR</span> <span>FIRST SHIP</span>
                </h2>
                <p>
                  Our showroom is open for sale for 15 minutes, at 14:00 UTC
                  every Friday - Saturday - Sunday
                </p>
                <div className="sr-token-balance">
                  Total Stake Reward: <span>{totalStakeReward} AT</span>
                </div>
              </div>
              <button className="primary-button" onClick={dist}>
                <a>dist</a>
              </button>
            </section>

            <section className="section light news-module">
              <div className="backgroundText-stroke">
                <h2
                  style={style4}
                  className="text-stroke backgroundText-stroke-text"
                >
                  <span>WE ARE</span>
                  <br></br>
                  <span>BU</span>
                </h2>
              </div>
              <div className="news-detail-box"></div>
              <div className="section-wrapper news-section-wrapper">
                <header>
                  <h2>
                    <span>Stake</span>
                  </h2>
                </header>
                <div className="slick-slider news-carousel">
                  <div className="slick-list">
                    <div className="slick-track">
                      <div className="slick-slide">
                        <div className="card">
                          <picture className="card-banner-wrapper">
                            <img
                              className="card-banner"
                              src={ship}
                              alt=""
                              width="1920"
                              height="1080"
                            ></img>
                          </picture>
                          <div className="card-tail">
                            <div className="card-date-and-category-wrapper">
                              <span className="card-category">Your reward</span>
                            </div>
                            <h3 className="card-title">{reward}</h3>
                            <div className="card-detail"></div>
                            <button className="home-hero-button" type="button">
                              <div
                                className="primary-button"
                                onClick={withdrawReward}
                              >
                                <span></span>
                                <span>Claim Reward</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="slick-slide">
                        <div className="card">
                          <picture className="card-banner-wrapper">
                            <img
                              className="card-banner"
                              src={ship}
                              alt=""
                              width="1920"
                              height="1080"
                            ></img>
                          </picture>
                          <div className="card-tail">
                            <div className="card-date-and-category-wrapper">
                              <span className="card-category">
                                Your staked asset
                              </span>
                            </div>
                            <h3 className="card-title">{stakedAT}</h3>
                            <div className="card-detail"></div>
                            <button
                              className="home-hero-button"
                              type="button"
                              //   onClick={buyNewShip}
                            >
                              <div
                                className="primary-button"
                                onClick={() => {
                                  setPopup(true);
                                }}
                              >
                                <span></span>
                                <span>Stake</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Popup trigger={popup} setTrigger={setPopup}>
                      <div style={{ marginBottom: "24px" }}>
                        <h3>Stake</h3>
                        <input
                          placeholder="Amount"
                          onChange={(e) => {
                            setStakeAmount(e.target.value);
                          }}
                        />
                      </div>
                      <div className="nav-account-container">
                        <div className="nav-account-anonymous-link-wrapper">
                          <a onClick={stake}>Confirm</a>
                        </div>
                      </div>
                    </Popup>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="ntm-footer">
        <div className="ntm-footer-content">
          <div className="copyright">
            <h2>&copy; 2021 SE06-24.2</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stake;
