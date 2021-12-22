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

function Marketplace() {
    return (
        <body>
            <div class="__gatsby">
                <div style={style1} id="gatsby-focus-wrapper">
                    <header>
                        <div class="position-static">
                            <div id="nav-wrapper">
                                <div id="navbar">
                                    <div class="nav-left-content">
                                        <div class="nav-branding-switcher">
                                            <div class="nav-logo">
                                                <svg width="32" height="32" style={style2} class="" viewBox="0 0 16 16">
                                                    <title>globeIcon</title>
                                                    <path
                                                        d="M7.992 0C3.576 0 0 3.584 0 8s3.576 8 7.992 8C12.416 16 16 12.416 16 8s-3.584-8-8.008-8zm5.544 4.8h-2.36c-.256-1-.624-1.96-1.104-2.848A6.424 6.424 0 0113.536 4.8zM8 1.632A11.27 11.27 0 019.528 4.8H6.472A11.27 11.27 0 018 1.632zM1.808 9.6A6.594 6.594 0 011.6 8c0-.552.08-1.088.208-1.6h2.704A13.212 13.212 0 004.4 8c0 .544.048 1.072.112 1.6H1.808zm.656 1.6h2.36c.256 1 .624 1.96 1.104 2.848A6.39 6.39 0 012.464 11.2zm2.36-6.4h-2.36a6.39 6.39 0 013.464-2.848A12.52 12.52 0 004.824 4.8zM8 14.368A11.27 11.27 0 016.472 11.2h3.056A11.27 11.27 0 018 14.368zM9.872 9.6H6.128A11.77 11.77 0 016 8c0-.544.056-1.08.128-1.6h3.744C9.944 6.92 10 7.456 10 8s-.056 1.072-.128 1.6zm.2 4.448a12.52 12.52 0 001.104-2.848h2.36a6.424 6.424 0 01-3.464 2.848zM11.488 9.6c.064-.528.112-1.056.112-1.6s-.048-1.072-.112-1.6h2.704c.128.512.208 1.048.208 1.6s-.08 1.088-.208 1.6h-2.704z"
                                                        fill="#E8E8E8"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="__5DQWEsdWf"></div>
                                    </div>
                                    <div class="nav-mid-content">
                                        <div class="nav-mid-logo-outer">
                                            <div class="nav-mid-logo">
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
                                        <div class="nav-link-wrapper">
                                            <div class="nav-link-container">
                                                <a class="nav-link" href="./showroom.html">SHOWROOM</a>
                                            </div>
                                            <div class="nav-link-container">
                                                <a class="nav-link" href="#">MARKETPLACE</a>
                                            </div>
                                            <div class="nav-link-container">
                                                <a class="nav-link" href="#">STORAGE</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nav-right-content">
                                        <div class="locale-switcher">
                                            <div class="locale-switcher-icon">
                                                <div class="locale-switch-trigger">
                                                    <svg width="14" height="14" class="" viewBox="0 0 16 16">
                                                        <title>globeIcon</title>
                                                        <path
                                                            d="M7.992 0C3.576 0 0 3.584 0 8s3.576 8 7.992 8C12.416 16 16 12.416 16 8s-3.584-8-8.008-8zm5.544 4.8h-2.36c-.256-1-.624-1.96-1.104-2.848A6.424 6.424 0 0113.536 4.8zM8 1.632A11.27 11.27 0 019.528 4.8H6.472A11.27 11.27 0 018 1.632zM1.808 9.6A6.594 6.594 0 011.6 8c0-.552.08-1.088.208-1.6h2.704A13.212 13.212 0 004.4 8c0 .544.048 1.072.112 1.6H1.808zm.656 1.6h2.36c.256 1 .624 1.96 1.104 2.848A6.39 6.39 0 012.464 11.2zm2.36-6.4h-2.36a6.39 6.39 0 013.464-2.848A12.52 12.52 0 004.824 4.8zM8 14.368A11.27 11.27 0 016.472 11.2h3.056A11.27 11.27 0 018 14.368zM9.872 9.6H6.128A11.77 11.77 0 016 8c0-.544.056-1.08.128-1.6h3.744C9.944 6.92 10 7.456 10 8s-.056 1.072-.128 1.6zm.2 4.448a12.52 12.52 0 001.104-2.848h2.36a6.424 6.424 0 01-3.464 2.848zM11.488 9.6c.064-.528.112-1.056.112-1.6s-.048-1.072-.112-1.6h2.704c.128.512.208 1.048.208 1.6s-.08 1.088-.208 1.6h-2.704z"
                                                            fill="#E8E8E8"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="nav-balance">2000
                                            <span>TOKEN</span>
                                        </div>
                                        <div class="navbar-mobile-reset">
                                            <div class="menu-icon">
                                                <svg width="32" height="32" class="" viewBox="0 0 32 32">
                                                    <title>burgerNav</title>
                                                    <circle opacity=".07" cx="16" cy="16" r="16" fill="#F9F9F9"></circle>
                                                    <path fill="#C7C7C7" d="M22 10v2H10v-2zm0 5v2H10v-2zm0 5v2H10v-2z"></path>
                                                </svg>
                                            </div>
                                            <div id="nav-mobile-menu" class="nav-mobile-menu">
                                                <div class="nav-mobile-menu-header">
                                                    
                                                    <a class="nav-mobile-menu-close">
                                                        <svg width="32" height="32" class="" viewBox="0 0 32 32">
                                                            <title>burgerNavClose</title>
                                                            <circle opacity=".07" cx="16" cy="16" r="16" fill="#F9F9F9">
                                                            </circle>
                                                            <path d="M12.007 11.973l8.132 8.132m-8.146-.012l8.131-8.132"
                                                                stroke="#C7C7C7" stroke-width="2"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                                <div class="nav-mobile-play-now">
                                                    <div class="nav-mobile-menu-anonymous-link">
                                                        <a class="nav-mobile-menu-link" href="">
                                                            CONNECT WALLET
                                                        </a>
                                                    </div>
                                                    <div class="nav-mobile-menu-link-list">
                                                        <a class="nav-mobile-menu-link" href="">
                                                            CONNECT WALLET
                                                        </a>
                                                        <a class="nav-mobile-menu-link" href="">
                                                            CONNECT WALLET
                                                        </a>
                                                        <a class="nav-mobile-menu-link" href="">
                                                            CONNECT WALLET
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="nav-account-container">
                                            <div class="nav-account-anonymous-link-wrapper">
                                                <a href="" style={style3}>CONNECT WALLET</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div class="main">

                        <section class="section showroom-txt">
                            <div class="sr-txt">
                                
                                <span>MARKETPLACE</span>
                                <h2>
                                    <span>414 items</span>
                                    <span>for sale</span>
                                </h2>
                                
                            </div>

                        </section>

                        <section class="section light news-module">
                            <div class="backgroundText-stroke">
                                <h2 style={style4} class="text-stroke backgroundText-stroke-text">
                                    <span>WE ARE</span><br></br>
                                    <span>BU</span>
                                </h2>
                            </div>
                            <div class="news-detail-box"></div>
                            <div class="section-wrapper news-section-wrapper">
                                <div class="slick-slider news-carousel">
                                    
                                    <div class="slick-list">
                                        <div class="slick-track">
                                            <div class="slick-slide">
                                                <div>
                                                    <a class="card">
                                                        <picture class="card-banner-wrapper">
                                                            <img class="card-banner" src="./images/VALORANT_Phoenix_Dark_thumbnail.jpg" alt="" width="1920" height="1080"></img>
                                                        </picture>
                                                        <div class="card-tail">
                                                            <div class="card-date-and-category-wrapper">
                                                                <span class="card-category">Wellington</span>
                                                            </div>
                                                            <h3 class="card-title">#666</h3>
                                                            <div class="card-detail">
                                                                <span>Seller:0xd...3j2</span>
                                                                <div class="card-prop">
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                </div>
                                                            </div>
                                                            <button class="home-hero-button" type="button">
                                                                <div class="primary-button">
                                                                    <span></span>
                                                                    <span>
                                                                        1000 TOKEN
                                                                    </span>
                                                                </div>
                                                            </button>
                                                            
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="slick-slide">
                                                <div>
                                                    <a class="card">
                                                        <picture class="card-banner-wrapper">
                                                            <img class="card-banner" src="./images/VALORANT_Phoenix_Dark_thumbnail.jpg" alt="" width="1920" height="1080"></img>
                                                        </picture>
                                                        <div class="card-tail">
                                                            <div class="card-date-and-category-wrapper">
                                                                <span class="card-category">Wellington</span>
                                                            </div>
                                                            <h3 class="card-title">#777</h3>
                                                            <div class="card-detail">
                                                                <span>Seller:0xd...3j2</span>
                                                                <div class="card-prop">
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                </div>
                                                            </div>
                                                            <button class="home-hero-button" type="button">
                                                                <div class="primary-button">
                                                                    <span></span>
                                                                    <span>
                                                                        2000 TOKEN
                                                                    </span>
                                                                </div>
                                                            </button>
                                                            
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="slick-slide">
                                                <div>
                                                    <a class="card">
                                                        <picture class="card-banner-wrapper">
                                                            <img class="card-banner" src="./images/VALORANT_Phoenix_Dark_thumbnail.jpg" alt="" width="1920" height="1080"></img>
                                                        </picture>
                                                        <div class="card-tail">
                                                            <div class="card-date-and-category-wrapper">
                                                                <span class="card-category">Wellington</span>
                                                            </div>
                                                            <h3 class="card-title">
                                                                #999
                                                            </h3>
                                                            <div class="card-detail">
                                                                <span>Seller:0xd...3j2</span>
                                                                <div class="card-prop">
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                </div>
                                                            </div>
                                                            <button class="home-hero-button" type="button">
                                                                <div class="primary-button">
                                                                    <span></span>
                                                                    <span>
                                                                        3000 TOKEN
                                                                    </span>
                                                                </div>
                                                            </button>
                                                            
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>   
                                        <div class="slick-track">
                                            <div class="slick-slide">
                                                <div>
                                                    <a class="card">
                                                        <picture class="card-banner-wrapper">
                                                            <img class="card-banner" src="./images/VALORANT_Phoenix_Dark_thumbnail.jpg" alt="" width="1920" height="1080"></img>
                                                        </picture>
                                                        <div class="card-tail">
                                                            <div class="card-date-and-category-wrapper">
                                                                <span class="card-category">Wellington</span>
                                                            </div>
                                                            <h3 class="card-title">#666</h3>
                                                            <div class="card-detail">
                                                                <span>Seller:0xd...3j2</span>
                                                                <div class="card-prop">
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                </div>
                                                            </div>
                                                            <button class="home-hero-button" type="button">
                                                                <div class="primary-button">
                                                                    <span></span>
                                                                    <span>
                                                                        1000 TOKEN
                                                                    </span>
                                                                </div>
                                                            </button>
                                                            
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="slick-slide">
                                                <div>
                                                    <a class="card">
                                                        <picture class="card-banner-wrapper">
                                                            <img class="card-banner" src="./images/VALORANT_Phoenix_Dark_thumbnail.jpg" alt="" width="1920" height="1080"></img>
                                                        </picture>
                                                        <div class="card-tail">
                                                            <div class="card-date-and-category-wrapper">
                                                                <span class="card-category">Wellington</span>
                                                            </div>
                                                            <h3 class="card-title">#777</h3>
                                                            <div class="card-detail">
                                                                <span>Seller:0xd...3j2</span>
                                                                <div class="card-prop">
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                </div>
                                                            </div>
                                                            <button class="home-hero-button" type="button">
                                                                <div class="primary-button">
                                                                    <span></span>
                                                                    <span>
                                                                        2000 TOKEN
                                                                    </span>
                                                                </div>
                                                            </button>
                                                            
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="slick-slide">
                                                <div>
                                                    <a class="card">
                                                        <picture class="card-banner-wrapper">
                                                            <img class="card-banner" src="./images/VALORANT_Phoenix_Dark_thumbnail.jpg" alt="" width="1920" height="1080"></img>
                                                        </picture>
                                                        <div class="card-tail">
                                                            <div class="card-date-and-category-wrapper">
                                                                <span class="card-category">Wellington</span>
                                                            </div>
                                                            <h3 class="card-title">
                                                                #999
                                                            </h3>
                                                            <div class="card-detail">
                                                                <span>Seller:0xd...3j2</span>
                                                                <div class="card-prop">
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                    <p>HP: 100</p>
                                                                </div>
                                                            </div>
                                                            <button class="home-hero-button" type="button">
                                                                <div class="primary-button">
                                                                    <span></span>
                                                                    <span>
                                                                        3000 TOKEN
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
                                <div class="list-page">
                                    <ul>
                                        <li class="active">1</li>
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

            <div class="ntm-footer">
                <div class="ntm-footer-content">
                    <div class="copyright">
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

export default Marketplace;