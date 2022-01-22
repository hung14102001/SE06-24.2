import ship1 from "./images/ship_1.png";
import ship2 from "./images/ship_2.png";
import ship3 from "./images/ship_3.png";
import Popup from "./components/Popup";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Marketplace from "../artifacts/contracts/Marketplace.sol/Marketplace.json";
import BattleShipNFT from "../artifacts/contracts/BattleShipNFT.sol/BattleShipNFT.json";
import AztecToken from "../artifacts/contracts/AztecToken/AztecToken.sol/AztecToken.json";

const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;
const marketAddress = process.env.REACT_APP_MARKET_ADDRESS;
const nftAddress = process.env.REACT_APP_NFT_ADDRESS;

const style1 = { outline: "none" };
const style4 = { transform: "translate(0px)" };

function MarketplacePage(props) {
  const uris = [ship1, ship2, ship3];

  const [pageOrder, setPageOrder] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [itemCount, setItemCount] = useState(0);
  const [marketItems, setMarketItems] = useState([]);
  const marketContract = new ethers.Contract(
    marketAddress,
    Marketplace.abi,
    provider.getSigner()
  );
  const tokenContract = new ethers.Contract(
    tokenAddress,
    AztecToken.abi,
    provider.getSigner()
  );
  const nftContract = new ethers.Contract(
    nftAddress,
    BattleShipNFT.abi,
    provider
  );

  async function getItemInfo() {
    if (provider) {
      try {
        let count = await marketContract.getUnsoldItemCount();
        count = parseInt(count["_hex"], 16);
        const itemForSale = await marketContract.fetchMarketItems();

        setPageCount(Math.ceil(count / 6));
        setItemCount(count);

        const items = await Promise.all(
          itemForSale.map(async (i) => {
            const tokenId = parseInt(i.tokenId["_hex"], 16);
            const ship = await nftContract.battleShips(tokenId);
            const type = parseInt(ship.shipType["_hex"], 16);

            let item = {
              itemId: parseInt(i.itemId["_hex"], 16),
              tokenId: tokenId,
              seller: i.seller,
              price: parseInt(i.price["_hex"], 16),
              type: type,
              level: ship.level,
              hp: parseInt(ship.health["_hex"], 16),
              dmg: parseInt(ship.damage["_hex"], 16),
              image: uris[type - 1],
            };
            return item;
          })
        );

        const res = items.filter((i) => !/^0x0+$/.test(i.seller));
        console.log(res);
        setMarketItems(res);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    getItemInfo();
  }, []);

  const [popup, setPopup] = useState(false);
  const [chosenItem, setChosenItem] = useState({});

  let indexItems = marketItems.map((item) => (
    <div className="slick-slide" key={item.tokenId}>
      <div className="card">
        <picture className="card-banner-wrapper">
          <img
            className="card-banner"
            src={item.image}
            alt=""
            width="1920"
            height="1080"
          ></img>
        </picture>
        <div className="card-tail">
          <div className="card-date-and-category-wrapper">
            <span className="card-category">Wellington</span>
          </div>
          <h3 className="card-title">#{item.tokenId}</h3>
          <div className="card-detail">
            <span>
              <a>
                Seller:{" "}
                {item.seller.substring(0, 4) + "..." + item.seller.slice(-4)}
              </a>
            </span>
            <div className="card-prop">
              <p>Type: {item.type}</p>
              <p>Level: {item.level}</p>
              <p>Health: {item.hp}</p>
              <p>Damage: {item.dmg}</p>
            </div>
          </div>
          <button className="home-hero-button" type="button">
            <div
              className="primary-button"
              onClick={() => {
                setChosenItem({
                  itemId: item.itemId,
                  tokenId: item.tokenId,
                  seller: item.seller,
                  type: item.type,
                  level: item.level,
                  price: item.price,
                });
                setPopup(true);
                setPriceNote("");
              }}
            >
              <span></span>
              <span>{item.price} AT</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  ));
  const [priceNote, setPriceNote] = useState("");

  async function buyAnItem() {
    if (props.userAccount == chosenItem.seller.toLowerCase())
      setPriceNote("You cannot buy your own item");
    else if (props.userTokenAmount < chosenItem.price)
      setPriceNote("Insufficient asset");
    else {
      setPriceNote("Waiting for user signing transaction");
      let approvedAT = await tokenContract.allowance(
        props.userAccount,
        marketAddress
      );

      if (approvedAT < chosenItem.price) {
        await tokenContract.approve(
          marketAddress,
          chosenItem.price - approvedAT
        );
      } else {
        await marketContract.createMarketSale(
          tokenAddress,
          nftAddress,
          chosenItem.itemId
        );
      }
    }
  }

  return (
    <div>
      <div className="__gatsby">
        <div style={style1} id="gatsby-focus-wrapper">
          <div className="main">
            <section className="section showroom-txt">
              <div className="sr-txt">
                <span>MARKETPLACE</span>
                <h2>
                  <span>{itemCount} items</span> <span>for sale</span>
                </h2>
              </div>
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
                <div className="slick-slider news-carousel">
                  <div className="slick-list">
                    <div className="slick-track">{indexItems}</div>
                    <Popup trigger={popup} setTrigger={setPopup}>
                      <div style={{ marginBottom: "24px" }}>
                        <h3>Buy an item</h3>
                        <p>ID - {chosenItem.tokenId}</p>
                        <p>Type - {chosenItem.type}</p>
                        <p>level - {chosenItem.level}</p>
                        <p>price - {chosenItem.price} AT</p>
                        <span>{priceNote}</span>
                      </div>
                      <div className="nav-account-container">
                        <div className="nav-account-anonymous-link-wrapper">
                          <a onClick={buyAnItem}>Confirm</a>
                        </div>
                      </div>
                    </Popup>
                  </div>
                </div>
                <div className="list-page">
                  <ul>
                    <li className="active">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="ntm-footer">
        <div className="ntm-footer-content">
          <div className="copyright">
            <h2>&copy; 2021 ntm, Inc.</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketplacePage;
