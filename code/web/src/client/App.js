import logo from './logo.svg';
import './styles/App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 
import Showroom from './Showroom';
import MarketplacePage from './Marketplace';
import Storage from './Storage';

function App() {
  return (
    <div>
      {/* <Router>
        <Routes> 
          <Route path="/">
            <Showroom />
          </Route>
          <Route path="/marketplace">
            <Marketplace />
          </Route>
        </Routes>
      </Router> */}
      <Storage />
    </div>
  );
}

export default App;
