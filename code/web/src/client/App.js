import './styles/App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Popup from './components/Popup';
import AztecToken from '../artifacts/contracts/AztecToken/AztecToken.sol/AztecToken.json';
import Showroom from './Showroom';
import MarketplacePage from './Marketplace';
import Storage from './Storage';

const tokenAddress = "0xbD046C9F4feBf0891f77d7e1a8Eb01e96AEf84fA"

function App() {

  const style2 = {margin: 'auto', marginTop:'10px'};

  const [userTokenAmount, setOwnerTokenAmount] = useState('0');
  const [userAccount, setOwnerAccount] = useState('0');
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const tokenContract = new ethers.Contract(tokenAddress, AztecToken.abi, provider.getSigner());
  
  async function requestAccount() {
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
          console.log('account: ',accounts[0])
          setOwnerAccount(accounts[0])
          fetchOwnerTokenAmount()
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

  const [ navbarState, setNavbarState ] = useState('')
  const [ popup, setPopup ] = useState(false)
  const [ coinExchangeAmount, setCoinExchangeAmount ] = useState(0)
  const [ exchangeNote, setExchangeNote ] = useState('')

  function openMobileNavbar() {
      setNavbarState('mobile-visible')
  }
  function closeMobleNavbar() {
      setNavbarState('')
  }

  useEffect(() => {
    requestAccount()
  }, [])

  function convertAccount() {
      if (userAccount != '0') return userAccount.substring(0,4) + '...' + userAccount.slice(-4)
      return 'Connect Wallet'
  }

  async function exchangeCoin() {
      if (coinExchangeAmount > 0 && coinExchangeAmount%10 == 0) {
          const ethToAT = await tokenContract.getPrice()
          await tokenContract.mint(coinExchangeAmount, {value: coinExchangeAmount*ethToAT})
      }
      else {
        setExchangeNote('Amount need being divisible by 10')
      }
  }

  return (
    <Router>
      <div>
      <header>
        <div className="position-static">
            <div id="nav-wrapper">
                <div id="navbar">
                    <div className="nav-left-content">
                        <div className="nav-branding-switcher">
                            <div className="nav-logo">
                                <svg width="32" height="32" style={style2} className="" viewBox="0 0 16 16">
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
                                <Link to="/">
                                  <a className="nav-link">SHOWROOM</a>
                                </Link>
                            </div>
                            <div className="nav-link-container">
                              <Link to="/marketplace">
                                  <a className="nav-link">MARKETPLACE</a>
                                </Link>
                            </div>
                            <div className="nav-link-container">
                                <Link to="/storage">
                                  <a className="nav-link">STORAGE</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="nav-right-content">
                        <div className="locale-switcher">
                            <div className="locale-switcher-icon" onClick={() => { setPopup(true) }}>
                                <div className="locale-switch-trigger">
                                    <svg width="14" height="14" className="" viewBox="0 0 16 16">
                                        <path
                                            d="M7.992 0C3.576 0 0 3.584 0 8s3.576 8 7.992 8C12.416 16 16 12.416 16 8s-3.584-8-8.008-8zm5.544 4.8h-2.36c-.256-1-.624-1.96-1.104-2.848A6.424 6.424 0 0113.536 4.8zM8 1.632A11.27 11.27 0 019.528 4.8H6.472A11.27 11.27 0 018 1.632zM1.808 9.6A6.594 6.594 0 011.6 8c0-.552.08-1.088.208-1.6h2.704A13.212 13.212 0 004.4 8c0 .544.048 1.072.112 1.6H1.808zm.656 1.6h2.36c.256 1 .624 1.96 1.104 2.848A6.39 6.39 0 012.464 11.2zm2.36-6.4h-2.36a6.39 6.39 0 013.464-2.848A12.52 12.52 0 004.824 4.8zM8 14.368A11.27 11.27 0 016.472 11.2h3.056A11.27 11.27 0 018 14.368zM9.872 9.6H6.128A11.77 11.77 0 016 8c0-.544.056-1.08.128-1.6h3.744C9.944 6.92 10 7.456 10 8s-.056 1.072-.128 1.6zm.2 4.448a12.52 12.52 0 001.104-2.848h2.36a6.424 6.424 0 01-3.464 2.848zM11.488 9.6c.064-.528.112-1.056.112-1.6s-.048-1.072-.112-1.6h2.704c.128.512.208 1.048.208 1.6s-.08 1.088-.208 1.6h-2.704z"
                                            fill="#E8E8E8"></path>
                                    </svg>
                                </div>
                            </div>
                            <Popup trigger={popup} setTrigger={setPopup}>
                                <div style={{marginBottom: '24px'}}>
                                    <h3>Coin Exchange</h3>
                                    <input
                                        placeholder="Amount"
                                        onChange={e => {setCoinExchangeAmount(e.target.value); setExchangeNote('')}}
                                    />
                                    <h3>{coinExchangeAmount*0.00001} ETH</h3>
                                    <h3>{exchangeNote}</h3>
                                </div>
                                <div className="nav-account-container">
                                    <div className="nav-account-anonymous-link-wrapper">
                                        <a onClick={exchangeCoin}>Confirm</a>
                                    </div>
                                </div>
                            </Popup>
                        </div>
                        <div className="nav-balance">{userTokenAmount}
                            {' '}
                            <span>AT</span>
                        </div>
                        <div className="navbar-mobile-reset">
                            <div className="menu-icon" onClick={openMobileNavbar}>
                                <svg width="32" height="32" className="" viewBox="0 0 32 32">
                                    <circle opacity=".07" cx="16" cy="16" r="16" fill="#F9F9F9"></circle>
                                    <path fill="#C7C7C7" d="M22 10v2H10v-2zm0 5v2H10v-2zm0 5v2H10v-2z"></path>
                                </svg>
                            </div>
                            <div id="nav-mobile-menu" className={"nav-mobile-menu " + navbarState}>
                                <div className="nav-mobile-menu-header">
                                    
                                    <a className="nav-mobile-menu-close" onClick={closeMobleNavbar}>
                                        <svg width="32" height="32" className="" viewBox="0 0 32 32">
                                            <circle opacity=".07" cx="16" cy="16" r="16" fill="#F9F9F9">
                                            </circle>
                                            <path d="M12.007 11.973l8.132 8.132m-8.146-.012l8.131-8.132"
                                                stroke="#C7C7C7" strokeWidth="2"></path>
                                        </svg>
                                    </a>
                                </div>
                                <div className="nav-mobile-play-now">                                    
                                    <div className="nav-mobile-menu-link-list">
                                        <Link to="/">
                                          <a className="nav-mobile-menu-link">SHOWROOM</a>
                                        </Link>
                                        <Link to="/marketplace">
                                          <a className="nav-mobile-menu-link">MARKETPLACE</a>
                                        </Link>
                                        <Link to="/storage">
                                          <a className="nav-mobile-menu-link">STORAGE</a>
                                        </Link>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='nav-account-container' className="nav-account-container">
                            <div className="nav-account-anonymous-link-wrapper">
                                <a id='nav-account' onClick={requestAccount}>{convertAccount()}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>

        <Routes>
          <Route exact path='/' element={<Showroom userAccount={userAccount} userTokenAmount={userTokenAmount}/>}/>
          <Route exact path='/marketplace' element={<MarketplacePage userAccount={userAccount}/>}/>
          <Route exact path='/storage' element={<Storage userAccount={userAccount}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
