import './styles/marketplace.css';
import phoenix from './images/VALORANT_Phoenix_Dark_thumbnail.jpg';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// import axios from 'axios';
import AztecToken from '../artifacts/contracts/AztecToken/AztecToken.sol/AztecToken.json';
import Marketplace from '../artifacts/contracts/Marketplace.sol/Marketplace.json';
import BattleShipNFT from '../artifacts/contracts/BattleShipNFT.sol/BattleShipNFT.json';

const tokenAddress = "0x287DE3ba64fdE0cc6DCeD06Ec425012397219361"
const marketAddress = "0x7611d076A48979Fefbf5B9C048910C61cB397a6e"
const nftAddress = '0x0E20B533C66D8870618297D0b46558aBF0DAEE20'

const style1 = {outline: 'none'};
const style2 = {margin: 'auto', marginTop:'10px'};

const style3 = {backgroundColor: 'rgb(255, 70, 85)'};
const style4 = {transform: 'translate(0px)'};

function MarketplacePage() {

    const [pageOrder, setPageOrder] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const [ownerTokenAmount, setOwnerTokenAmount] = useState('0');
    const [ownerAccount, setOwnerAccount] = useState('Connect Wallet');
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(tokenAddress, AztecToken.abi, provider);
    
    async function requestAccount() {
        window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
            console.log('account: ',accounts[0])
            setOwnerAccount(accounts[0].substring(0,4) + '...' + accounts[0].slice(-4))
            fetchOwnerTokenAmount()
            getUserItemInfo()
        });
    }
    
    async function fetchOwnerTokenAmount() {
        if (window.ethereum) {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            try {
                const data = await tokenContract.balanceOf(account)
                setOwnerTokenAmount(parseInt(data['_hex'], 16))
            } catch (err) {
                console.log(err)
            }
        }
        
    }
    const [ itemCount, setItemCount ] = useState(0);
    const [ userItems, setUserItems ] = useState([]);
    const [ userItemsSale, setUserItemsSale] = useState([]);

    const marketContract = new ethers.Contract(marketAddress, Marketplace.abi, provider);
    const nftContract = new ethers.Contract(nftAddress, BattleShipNFT.abi, provider);
    
    async function getUserItemInfo() {
        try {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            let userShipIds = await nftContract.getShipsByOwner(account)
            
            setItemCount(userShipIds.length)
            
            const userItemsForSale = await marketContract.fetchItemsCreated()
            
            setPageCount(Math.ceil(userShipIds/6))
            setUserItemsSale(userItemsForSale)
        
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
                console.log(item)
                return item
            }))
            
            setUserItems(items)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getUserItemInfo()
    }, [])

    let userItemRowCount = Math.ceil(userItems.length/3)
    let userItemRows = [...Array(userItemRowCount).keys()]

    let liItems = userItems.map((item) => 
        <div className="slick-slide" key={item.tokenId}>
            <div>
                <a className="card">
                    <picture className="card-banner-wrapper">
                        <img className="card-banner" src={phoenix} alt="" width="1920" height="1080"></img>
                    </picture>
                    <div className="card-tail">
                        <div className="card-date-and-category-wrapper">
                            <span className="card-category">Wellington</span>
                        </div>
                        <h3 className="card-title">#{item.tokenId}</h3>
                        <div className="card-detail">
                            <div className="card-prop">
                                <p>Level: {item.level}</p>
                                <p>Health: {item.hp}</p>
                                <p>Damage: {item.dmg}</p>
                            </div>
                        </div>
                        <button className="home-hero-button" type="button">
                            <div className="primary-button">
                                <span></span>
                                <span>
                                    SELL
                                </span>
                            </div>
                        </button>
                        
                    </div>
                </a>
            </div>
        </div>
    )
    let ulItems = userItemRows.map((row) => 
        <div className='slick-track' key={row.toString()}>
            {liItems}
        </div>
    )

    
    return (
        


        <div>
            
            <div className="__gatsby">
                <div style={style1} id="gatsby-focus-wrapper">
                    <header>
                        <div className="position-static">
                            <div id="nav-wrapper">
                                <div id="navbar">
                                    <div className="nav-left-content">
                                        <div className="nav-branding-switcher">
                                            <div className="nav-logo">
                                                <svg width="32" height="32" style={style2} className="" viewBox="0 0 16 16">
                                                    <title>globeIcon</title>
                                                    <path
                                                        d="M7.992 0C3.576 0 0 3.584 0 8s3.576 8 7.992 8C12.416 16 16 12.416 16 8s-3.584-8-8.008-8zm5.544 4.8h-2.36c-.256-1-.624-1.96-1.104-2.848A6.424 6.424 0 0113.536 4.8zM8 1.632A11.27 11.27 0 019.528 4.8H6.472A11.27 11.27 0 018 1.632zM1.808 9.6A6.594 6.594 0 011.6 8c0-.552.08-1.088.208-1.6h2.704A13.212 13.212 0 004.4 8c0 .544.048 1.072.112 1.6H1.808zm.656 1.6h2.36c.256 1 .624 1.96 1.104 2.848A6.39 6.39 0 012.464 11.2zm2.36-6.4h-2.36a6.39 6.39 0 013.464-2.848A12.52 12.52 0 004.824 4.8zM8 14.368A11.27 11.27 0 016.472 11.2h3.056A11.27 11.27 0 018 14.368zM9.872 9.6H6.128A11.77 11.77 0 016 8c0-.544.056-1.08.128-1.6h3.744C9.944 6.92 10 7.456 10 8s-.056 1.072-.128 1.6zm.2 4.448a12.52 12.52 0 001.104-2.848h2.36a6.424 6.424 0 01-3.464 2.848zM11.488 9.6c.064-.528.112-1.056.112-1.6s-.048-1.072-.112-1.6h2.704c.128.512.208 1.048.208 1.6s-.08 1.088-.208 1.6h-2.704z"
                                                        fill="#E8E8E8"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="__5DQWEsdWf"></div>
                                    </div>
                                    <div className="nav-mid-content">
                                        <div className="nav-link-wrapper">
                                            <div className="nav-link-container">
                                                <a className="nav-link" href="./showroom.html">SHOWROOM</a>
                                            </div>
                                            <div className="nav-link-container">
                                                <a className="nav-link" href="#">MARKETPLACE</a>
                                            </div>
                                            <div className="nav-link-container">
                                                <a className="nav-link" href="#">STORAGE</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nav-right-content">
                                        <div className="locale-switcher">
                                            <div className="locale-switcher-icon">
                                                <div className="locale-switch-trigger">
                                                    <svg width="14" height="14" className="" viewBox="0 0 16 16">
                                                        <title>globeIcon</title>
                                                        <path
                                                            d="M7.992 0C3.576 0 0 3.584 0 8s3.576 8 7.992 8C12.416 16 16 12.416 16 8s-3.584-8-8.008-8zm5.544 4.8h-2.36c-.256-1-.624-1.96-1.104-2.848A6.424 6.424 0 0113.536 4.8zM8 1.632A11.27 11.27 0 019.528 4.8H6.472A11.27 11.27 0 018 1.632zM1.808 9.6A6.594 6.594 0 011.6 8c0-.552.08-1.088.208-1.6h2.704A13.212 13.212 0 004.4 8c0 .544.048 1.072.112 1.6H1.808zm.656 1.6h2.36c.256 1 .624 1.96 1.104 2.848A6.39 6.39 0 012.464 11.2zm2.36-6.4h-2.36a6.39 6.39 0 013.464-2.848A12.52 12.52 0 004.824 4.8zM8 14.368A11.27 11.27 0 016.472 11.2h3.056A11.27 11.27 0 018 14.368zM9.872 9.6H6.128A11.77 11.77 0 016 8c0-.544.056-1.08.128-1.6h3.744C9.944 6.92 10 7.456 10 8s-.056 1.072-.128 1.6zm.2 4.448a12.52 12.52 0 001.104-2.848h2.36a6.424 6.424 0 01-3.464 2.848zM11.488 9.6c.064-.528.112-1.056.112-1.6s-.048-1.072-.112-1.6h2.704c.128.512.208 1.048.208 1.6s-.08 1.088-.208 1.6h-2.704z"
                                                            fill="#E8E8E8"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="nav-balance">{ownerTokenAmount}
                                            {' '}
                                            <span>AT</span>
                                        </div>
                                        <div className="navbar-mobile-reset">
                                            <div className="menu-icon">
                                                <svg width="32" height="32" className="" viewBox="0 0 32 32">
                                                    <title>burgerNav</title>
                                                    <circle opacity=".07" cx="16" cy="16" r="16" fill="#F9F9F9"></circle>
                                                    <path fill="#C7C7C7" d="M22 10v2H10v-2zm0 5v2H10v-2zm0 5v2H10v-2z"></path>
                                                </svg>
                                            </div>
                                            <div id="nav-mobile-menu" className="nav-mobile-menu">
                                                <div className="nav-mobile-menu-header">
                                                    
                                                    <a className="nav-mobile-menu-close">
                                                        <svg width="32" height="32" className="" viewBox="0 0 32 32">
                                                            <title>burgerNavClose</title>
                                                            <circle opacity=".07" cx="16" cy="16" r="16" fill="#F9F9F9">
                                                            </circle>
                                                            <path d="M12.007 11.973l8.132 8.132m-8.146-.012l8.131-8.132"
                                                                stroke="#C7C7C7" strokeWidth="2"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                                <div className="nav-mobile-play-now">
                                                    <div className="nav-mobile-menu-anonymous-link">
                                                        <a className="nav-mobile-menu-link" href="">
                                                            CONNECT WALLET
                                                        </a>
                                                    </div>
                                                    <div className="nav-mobile-menu-link-list">
                                                        <a className="nav-mobile-menu-link" href="">
                                                            CONNECT WALLET
                                                        </a>
                                                        <a className="nav-mobile-menu-link" href="">
                                                            CONNECT WALLET
                                                        </a>
                                                        <a className="nav-mobile-menu-link" href="">
                                                            CONNECT WALLET
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="nav-account-container">
                                            <div className="nav-account-anonymous-link-wrapper">
                                                <a style={style3} onClick={requestAccount}>{ownerAccount}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="main">

                        <section className="section showroom-txt">
                            <div className="sr-txt">
                                
                                <span>STORAGE</span>
                                <h2>
                                    <span>your {itemCount}</span>
                                    {' '}
                                    <span>items</span>
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
                                        {ulItems}
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
            {/* <script>
                $(document).ready(function () {
                    $(".menu-icon").click(function () {
                        $("#nav-mobile-menu").addClass("mobile-visible");

                    })
                    $(".nav-mobile-menu-close").click(function () {
                        $("#nav-mobile-menu").removeClass("mobile-visible");

                    });
                });
            </script> */}
        </div>
    )
}

export default MarketplacePage;