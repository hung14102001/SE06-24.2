import logo from './logo.svg';
import './styles/App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Showroom from './Showroom';
import Marketplace from './Marketplace';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Showroom} />
          <Route path="/marketplace" exact component={Marketplace} />
          {/* <Route path="*" exact component={PageNotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
