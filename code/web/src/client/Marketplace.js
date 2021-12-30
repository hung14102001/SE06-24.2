import phoenix from './images/VALORANT_Phoenix_Dark_thumbnail.jpg';
import {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import Marketplace from '../artifacts/contracts/Marketplace.sol/Marketplace.json';

const marketAddress = "0x7611d076A48979Fefbf5B9C048910C61cB397a6e"

const style1 = {outline: 'none'};
const style4 = {transform: 'translate(0px)'};

function MarketplacePage() {

    const [pageOrder, setPageOrder] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const [ itemCount, setItemCount ] = useState(0);
    const [ items, setItems ] = useState([])
    const marketContract = new ethers.Contract(marketAddress, Marketplace.abi, provider);
    
    async function getItemInfo() {
        if (provider) {
            try {
                const data = await marketContract.getUnsoldItemCount();
                const itemForSale = await marketContract.fetchMarketItems();
                setPageCount(Math.ceil(data/6));
                setItemCount(data);
                setItems(itemForSale);
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        getItemInfo()
    }, [])    
    
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
                                            <div className="slick-slide">
                                                <div className="card">
                                                    <picture className="card-banner-wrapper">
                                                        <img className="card-banner" src={phoenix} alt="" width="1920" height="1080"></img>
                                                    </picture>
                                                    <div className="card-tail">
                                                        <div className="card-date-and-category-wrapper">
                                                            <span className="card-category">Wellington</span>
                                                        </div>
                                                        <h3 className="card-title">#666</h3>
                                                        <div className="card-detail">
                                                            <span><a>Seller:0xd...3j2</a></span>
                                                            <div className="card-prop">
                                                                <p>HP: 100</p>
                                                                <p>HP: 100</p>
                                                                <p>HP: 100</p>
                                                            </div>
                                                        </div>
                                                        <button className="home-hero-button" type="button">
                                                            <div className="primary-button">
                                                                <span></span>
                                                                <span>
                                                                    1000 TOKEN
                                                                </span>
                                                            </div>
                                                        </button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  
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