
import phoenix from './images/VALORANT_Phoenix_Dark_thumbnail.jpg';
import { ethers } from 'ethers';
import BattleShipNFT from '../artifacts/contracts/BattleShipNFT.sol/BattleShipNFT.json';

const tokenAddress = "0x287DE3ba64fdE0cc6DCeD06Ec425012397219361"
const nftAddress = '0x0E20B533C66D8870618297D0b46558aBF0DAEE20'

const style1 = {outline: 'none'};
const style4 = {transform: 'translate(0px)'};


function Showroom(props) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    async function buyNewShip() {
        if (provider !== undefined) {
            const nftContract = new ethers.Contract(nftAddress, BattleShipNFT.abi, provider.getSigner())
            let transaction = await nftContract.createRandomBattleShip(tokenAddress);
            let txn = await transaction.wait()
            let event = txn.event
            console.log(event)

        }
    }

    return (
        <div>
            <div className="__gatsby">
                <div style={style1} id="gatsby-focus-wrapper">
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
                                    <span>{props.userTokenAmount} AT</span>
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
                                                <div className="card">
                                                    <picture className="card-banner-wrapper">
                                                        <img className="card-banner" src={phoenix} alt="" width="1920" height="1080"></img>
                                                    </picture>
                                                    <div className="card-tail">
                                                        <div className="card-date-and-category-wrapper">
                                                            <span className="card-category">dev track</span>
                                                        </div>
                                                        <h3 className="card-title">title</h3>
                                                        <div className='card-detail'></div>
                                                        <button className="home-hero-button" type="button" onClick={buyNewShip}>
                                                            <div className="primary-button">
                                                                <span></span>
                                                                <span>
                                                                    4000 AT
                                                                </span>
                                                            </div>
                                                        </button>
                                                        
                                                    </div>
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
        </div>
    )
}

export default Showroom;