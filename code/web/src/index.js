import React from 'react';
import ReactDOM from 'react-dom';
import './client/styles/index.css';
// import App from './client/App';
import Showroom from './client/Showroom';
import reportWebVitals from './client/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Showroom />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
