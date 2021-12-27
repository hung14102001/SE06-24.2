import './styles/showroom.css';
import phoenix from './images/VALORANT_Phoenix_Dark_thumbnail.jpg';
import {useState} from 'react';
import { ethers } from 'ethers';
import AztecToken from '../artifacts/contracts/AztecToken/AztecToken.sol/AztecToken.json';

const tokenAddress = "0x75Cc9967fdD3340ad17034b4c0A4C8e47058D2f4"

const style1 = {outline: 'none'};
const style2 = {margin: 'auto', marginTop:'10px'};

const style3 = {backgroundColor: 'rgb(255, 70, 85)'};
const style4 = {transform: 'translate(0px)'};


function Showroom() {
    const [ownerTokenAmount, setOwnerTokenAmount] = useState('0');
    const [ownerAccount, setOwnerAccount] = useState('Connect Wallet');

    async function requestAccount() {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts)=> {
                console.log('account: ',accounts[0])
                setOwnerAccount(accounts[0])
                fetchOwnerTokenAmount()
        });
    }

    async function fetchOwnerTokenAmount() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(tokenAddress, AztecToken.abi, provider)
            try {
                const data = await contract.balanceOf(ownerAccount)
                setOwnerTokenAmount(parseInt(data['_hex'], 16))
            } catch (err) {
                console.log(err)
            }
        }

    }


    return (
        <body>
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
                                        
                                        <div className="nav-mid-logo-outer">
                                            <div className="nav-mid-logo">
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="35"
                                                        viewBox="0 0 100 100" width="35">
                                                        <path
                                                            d="M99.25 48.66V10.28c0-.59-.75-.86-1.12-.39l-41.92 52.4a.627.627 0 00.49 1.02h30.29c.82 0 1.59-.37 2.1-1.01l9.57-11.96c.38-.48.59-1.07.59-1.68zM1.17 50.34L32.66 89.7c.51.64 1.28 1.01 2.1 1.01h30.29c.53 0 .82-.61.49-1.02L1.7 9.89c-.37-.46-1.12-.2-1.12.39v38.38c0 .61.21 1.2.59 1.68z"
                                                            fill="#fff"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="nav-link-wrapper">
                                            <div className="nav-link-container">
                                                <a className="nav-link" href="#" >SHOWROOM</a>
                                            </div>
                                            <div className="nav-link-container">
                                                <a className="nav-link" href="./marketplace.html">MARKETPLACE</a>
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
                                            <span>{' '} AT</span>
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
                                
                                <span>SHOWROOM</span>
                                <h2>
                                    <span>GET YOUR</span>
                                    {' '}
                                    <span>FIRST SHIP</span>
                                </h2>
                                <p>Our showroom is open for sale for 15 minutes,
                                    at 14:00 UTC every Friday - Saturday - Sunday</p>
                                <div className="sr-token-balance">
                                    Balance:
                                    {' '} 
                                    <span>{ownerTokenAmount} Token</span>
                                </div>
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
                                <header>
                                    <h2>
                                        <span>LOOT BOXES</span>
                                    </h2>
                                </header>
                                <div className="slick-slider news-carousel">
                                    
                                    <div className="slick-list">
                                        <div className="slick-track">
                                            <div className="slick-slide">
                                                <div>
                                                    <a className="card">
                                                        <picture className="card-banner-wrapper">
                                                            <img className="card-banner" src={phoenix} alt="" width="1920" height="1080"></img>
                                                        </picture>
                                                        <div className="card-tail">
                                                            <div className="card-date-and-category-wrapper">
                                                                <span className="card-category">dev track</span>
                                                            </div>
                                                            <h3 className="card-title">title</h3>
                                                            <button className="home-hero-button" type="button">
                                                                <div className="primary-button">
                                                                    <span></span>
                                                                    <span>
                                                                        PLAY
                                                                    </span>
                                                                </div>
                                                            </button>
                                                            
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="slick-slide">
                                                <div>
                                                    <a className="card">
                                                        <picture className="card-banner-wrapper">
                                                            <img className="card-banner" src={phoenix} alt="" width="1920" height="1080"></img>
                                                        </picture>
                                                        <div className="card-tail">
                                                            <div className="card-date-and-category-wrapper">
                                                                <span className="card-category">dev track</span>
                                                            </div>
                                                            <h3 className="card-title">title</h3>
                                                            <button className="home-hero-button" type="button">
                                                                <div className="primary-button">
                                                                    <span></span>
                                                                    <span>
                                                                        PLAY
                                                                    </span>
                                                                </div>
                                                            </button>
                                                            
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="slick-slide">
                                                <div>
                                                    <a className="card">
                                                        <picture className="card-banner-wrapper">
                                                            <img className="card-banner" src={phoenix} alt="" width="1920" height="1080"></img>
                                                        </picture>
                                                        <div className="card-tail">
                                                            <div className="card-date-and-category-wrapper">
                                                                <span className="card-category">dev track</span>
                                                            </div>
                                                            <h3 className="card-title">title</h3>
                                                            <button className="home-hero-button" type="button">
                                                                <div className="primary-button">
                                                                    <span></span>
                                                                    <span>
                                                                        PLAY
                                                                    </span>
                                                                </div>
                                                            </button>
                                                            
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>   
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
        </body>
    )
}

export default Showroom;