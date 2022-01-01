import phoenix from './images/VALORANT_Phoenix_Dark_thumbnail.jpg';
import Popup from './components/Popup';

import {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import Marketplace from '../artifacts/contracts/Marketplace.sol/Marketplace.json';
import BattleShipNFT from '../artifacts/contracts/BattleShipNFT.sol/BattleShipNFT.json';

const tokenAddress = "0xbD046C9F4feBf0891f77d7e1a8Eb01e96AEf84fA"
const marketAddress = "0x0Cc6F82771AeD6A6c0F5D82f045b592e81A6AE2A"
// const nftAddress = '0x54Ab0265b80699390d4E9C26404aEFF473Aa266C'
const nftAddress = '0x0E20B533C66D8870618297D0b46558aBF0DAEE20'

const style1 = {outline: 'none'};
const style4 = {transform: 'translate(0px)'};

function MarketplacePage(props) {

    const [pageOrder, setPageOrder] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const [ itemCount, setItemCount ] = useState(0);
    const [ marketItems, setMarketItems ] = useState([])
    const marketContract = new ethers.Contract(marketAddress, Marketplace.abi, provider.getSigner());
    const nftContract = new ethers.Contract(nftAddress, BattleShipNFT.abi, provider);
    
    async function getItemInfo() {
        if (provider) {
            try {
                let count = await marketContract.getUnsoldItemCount()
                count = parseInt(count["_hex"], 16)
                const itemForSale = await marketContract.fetchMarketItems()

                setPageCount(Math.ceil(count/6))
                setItemCount(count)

                const items = await Promise.all(itemForSale.map(async i => {
                    // const shipUri = await nftContract.shipURI(i)
                    const tokenId = parseInt(i.tokenId["_hex"], 16)
                    const ship = await nftContract.battleShips(tokenId)
                    // const meta = await axios.get(shipUri)
                    let item = {
                        itemId: parseInt(i.itemId["_hex"], 16),
                        tokenId: tokenId,
                        seller: i.seller,
                        price: parseInt(i.price["_hex"], 16),
                        type: parseInt(ship.shipType["_hex"], 16),
                        level: ship.level,
                        hp: parseInt(ship.health["_hex"], 16),
                        dmg: parseInt(ship.damage["_hex"], 16),
                    //   image: meta.data.image,
                    }
                    return item
                }))

                setMarketItems(items);
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        getItemInfo()
    }, [])    

    const [popup, setPopup] = useState(false)
    const [ chosenItem, setChosenItem ] = useState({})
    
    let indexItems = marketItems.map((item) => 
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
                        <span><a>Seller: {item.seller.substring(0,4) + '...' + item.seller.slice(-4)}</a></span>
                        <div className="card-prop">
                            <p>Type: {item.type}</p>
                            <p>Level: {item.level}</p>
                            <p>Health: {item.hp}</p>
                            <p>Damage: {item.dmg}</p>
                        </div>
                    </div>
                    <button className="home-hero-button" type="button">
                        <div className="primary-button" onClick={ () => {
                            setChosenItem({
                                itemId: item.itemId,
                                tokenId: item.tokenId,
                                seller: item.seller,
                                type: item.type,
                                level: item.level,
                                price: item.price,
                            })
                            setPopup(true)
                        }}> 
                            <span></span>
                            <span>
                                {item.price} AT
                            </span>
                        </div>
                    </button>
                    
                </div>
            </div>
        </div>
    )
    const [ itemPrice, setItemPrice ] = useState(0)
    const [ priceNote, setPriceNote ] = useState('')

    async function buyAnItem() {
        if (props.userAccount == chosenItem.seller) setPriceNote('You cannot buy your own item') 
        else {
            await marketContract.createMarketSale(tokenAddress, nftAddress, chosenItem.itemId)
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
                                    <span>{itemCount} items</span>
                                    {' '}
                                    <span>for sale</span>
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
                                        <Popup trigger={popup} setTrigger={setPopup}>
                                            <div style={{marginBottom: '24px'}}>
                                                <h1>Buy an item</h1>
                                                <h3>ID - {chosenItem.tokenId}</h3>
                                                <h3>Type - {chosenItem.type}</h3>
                                                <h3>level - {chosenItem.level}</h3>
                                                <h3>price - {chosenItem.price} AT</h3>
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
                        <h2>
                            &copy; 2021 ntm, Inc.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketplacePage;