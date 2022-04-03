import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import { MetaMaskProvider } from "metamask-react";


ReactDOM.render(
  <React.StrictMode>
    {/* <MetaMaskProvider>
      <App />
    </MetaMaskProvider> */}
    <div className="socialicon">
      <div className="">
        <a href="https://twitter.com/SmithPunksNFT"><img alt='propd' src="1.png"/></a>
      </div>
      <div className="">
      <a href="https://opensea.io/collection/smithpunks"><img alt='propd' src="2.png"/></a>
      </div>
      <div className="">
      <a href="https://etherscan.io/address/0x421e925e92af2d594bc787029a24ea52e74be3ea"><img alt='propd' src="3.png"/></a>
      </div>
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
