import phoenix from './images/VALORANT_Phoenix_Dark_thumbnail.jpg';
import Popup from './components/Popup';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// import axios from 'axios';
import Marketplace from '../artifacts/contracts/Marketplace.sol/Marketplace.json';
import BattleShipNFT from '../artifacts/contracts/BattleShipNFT.sol/BattleShipNFT.json';
import Web3Modal from 'web3modal'
// require('dotenv').config()

const marketAddress = process.env.REACT_APP_MARKET_ADDRESS
const nftAddress = process.env.REACT_APP_NFT_ADDRESS

const style1 = {outline: 'none'};
const style4 = {transform: 'translate(0px)'};

function Storage(props) {

    const [pageOrder, setPageOrder] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const [ itemCount, setItemCount ] = useState(0);
    const [ userItems, setUserItems ] = useState([]);
    const [ userItemsSale, setUserItemsSale] = useState([]);

    const marketContract = new ethers.Contract(marketAddress, Marketplace.abi, provider.getSigner());
    const nftContract = new ethers.Contract(nftAddress, BattleShipNFT.abi, provider);
    
    async function getUserItemInfo() {
        if (provider !== undefined) {
            try {
                let userShipIds = await nftContract.getShipsByOwner(props.userAccount)

                setItemCount(userShipIds.length)
                
                // const userItemsForSale = await marketContract.fetchItemsCreated()
                // console.log(userItemsForSale)
                
                setPageCount(Math.ceil(userShipIds/6))
                
                // const saleItems = await Promise.all(userItemsForSale.map(async i => {
                //     // const shipUri = await nftContract.shipURI(i)
                //     const tokenId = parseInt(i.tokenId["_hex"], 16)
                //     const ship = await nftContract.battleShips(tokenId)
                //     // const meta = await axios.get(shipUri)
                //     let item = {
                //         seller: i.seller,
                //         price: parseInt(i.price["_hex"], 16),
                //         tokenId: tokenId,
                //         level: ship.level,
                //         type: parseInt(ship.shipType["_hex"], 16),
                //         hp: parseInt(ship.health["_hex"], 16),
                //         dmg: parseInt(ship.damage["_hex"], 16),
                //         //   image: meta.data.image,
                //     }
                //     return item
                // }))
                // setUserItemsSale(saleItems)
            
                const items = await Promise.all(userShipIds.map(async i => {
                    // const shipUri = await nftContract.shipURI(i)
                    const ship = await nftContract.battleShips(i)
                    // const meta = await axios.get(shipUri)
                    let item = {
                        tokenId: parseInt(i, 16),
                        level: ship.level,
                        exp: parseInt(ship.exp["_hex"], 16),
                        hp: parseInt(ship.health["_hex"], 16),
                        dmg: parseInt(ship.damage["_hex"], 16),
                        type: parseInt(ship.shipType["_hex"], 16),
                    //   image: meta.data.image,
                    }
                    return item
                }))
                
                setUserItems(items)
            } catch (err) {
                console.log(err)
            }
        }

    }

    useEffect(() => {
        getUserItemInfo()
    }, [])

    const [popup, setPopup] = useState(false)
    const [ chosenItem, setChosenItem ] = useState({
        id: -1,
        type: -1,
        level: -1,
        exp: -1,
        hp: -1,
        dmg: -1,
    })
    const [ itemPrice, setItemPrice ] = useState(0)

    async function sellItem() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const pprovider = new ethers.providers.Web3Provider(connection)    
        const signer = pprovider.getSigner()
        
        /* next, create the item */
        let tokenId = chosenItem.id
    
        /* then list the item for sale on the marketplace */
        let contract = new ethers.Contract(marketAddress, Marketplace.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        let transaction = await contract.createMarketItem(nftAddress, tokenId, itemPrice, { value: listingPrice })
        await transaction.wait()
    }
    
    let indexItems = userItems.map((item) => 
        <div className="slick-slide" key={item.tokenId}>
            <div className="card">
                <picture className="card-banner-wrapper">
                    <img className="card-banner" src={phoenix} alt="" width="1920" height="1080"></img>
                </picture>
                <div className="card-tail">
                    <div className="card-date-and-category-wrapper">
                        <span className="card-category">Wellington</span>
                    </div>
                    <h3 className="card-title">#{item.tokenId}</h3>
                    <div className="card-detail">
                        <div id='storage-card-prop' className="card-prop">
                            <p>Type: {item.type}</p>
                            <p>Level: {item.level}</p>
                            <p>Exp: {item.exp}</p>
                            <p>Health: {item.hp}</p>
                            <p>Damage: {item.dmg}</p>
                        </div>
                    </div>
                    <button className="home-hero-button" type="button">
                        <div className="primary-button" onClick={ () => {
                            setChosenItem({
                                id: item.tokenId,
                                type: item.type,
                                level: item.level,
                                exp: item.exp,
                                hp: item.hp,
                                dmg: item.dmg,
                            })
                            setPopup(true)
                        }}> 
                            <span></span>
                            <span>
                                SELL
                            </span>
                        </div>
                    </button>
                    
                </div>
            </div>
        </div>
    )
    let indexSaleItems = userItemsSale.map((item) => 
        <div className="slick-slide" key={item.tokenId}>
            <div className="card">
                <picture className="card-banner-wrapper">
                    <img className="card-banner" src={phoenix} alt="" width="1920" height="1080"></img>
                </picture>
                <div className="card-tail">
                    <div className="card-date-and-category-wrapper">
                        <span className="card-category">Wellington</span>
                    </div>
                    <h3 className="card-title">#{item.tokenId}</h3>
                    <div className="card-detail">
                        <div id='storage-card-prop' className="card-prop">
                            <p>Type: {item.type}</p>
                            <p>Level: {item.level}</p>
                            <p>Health: {item.hp}</p>
                            <p>Damage: {item.dmg}</p>
                        </div>
                    </div>
                    <button className="home-hero-button" type="button">
                        <div className="primary-button" onClick={ () => {
                            setChosenItem({
                                id: item.tokenId,
                                type: item.type,
                                level: item.level,
                                exp: item.exp,
                                hp: item.hp,
                                dmg: item.dmg,
                            })
                            setPopup(true)
                        }}> 
                            <span></span>
                            <span>
                                Cancel
                            </span>
                        </div>
                    </button>
                    
                </div>
            </div>
        </div>
    )
   
    return (
        <div>            
            <div className="__gatsby">
                <div style={style1} id="gatsby-focus-wrapper">
                    <div className="main">
                        <section className="section showroom-txt">
                            <div className="sr-txt">                                
                                <span>STORAGE</span>
                                <h2>
                                    <span>your</span>
                                    {' '}
                                    <span>{itemCount} items</span>
                                </h2>
                            </div>
                        </section>
                        <section className="section light news-module">
                            <div className="backgroundText-stroke">
                                <h2 style={style4} className="text-stroke backgroundText-stroke-text">
                                    <span>WE ARE</span><br></br>
                                    <span>BU</span>
                                </h2>
                            </div>
                            <div className="news-detail-box"></div>
                            <div className="section-wrapper news-section-wrapper">
                                <div className="slick-slider news-carousel">                                    
                                    <div className="slick-list">
                                        <div className='slick-track'>
                                            {indexItems}
                                        </div>
                                        {/* <h3>Item in the market</h3>
                                        <div className='slick-track'>
                                            {indexSaleItems}
                                        </div> */}
                                    </div>
                                    <Popup trigger={popup} setTrigger={setPopup}>
                                        <div style={{marginBottom: '24px'}}>
                                            <h3>sell item</h3>
                                            <p>ID-{chosenItem.id}</p>
                                            <p>Type-{chosenItem.type}</p>
                                            <p>level-{chosenItem.level}</p>
                                            <input
                                                placeholder="Price"
                                                onChange={e => {setItemPrice(e.target.value);}}
                                            />
                                        </div>
                                        <div className="nav-account-container">
                                            <div className="nav-account-anonymous-link-wrapper">
                                                <a onClick={sellItem}>Confirm</a>
                                            </div>
                                        </div>
                                    </Popup>
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
                        <h2>
                            &copy; 2021 ntm, Inc.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Storage;