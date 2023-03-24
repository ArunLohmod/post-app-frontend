import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Home from "./components/Home";

import { ethers } from "ethers";

import postAppABI from "./abis/postApp.json";
const postAppAddress = "0xb66201E7c620b736fc40192D7f4Dbd5B28293d78";

function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postApp, setPostApp] = useState();

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    const postApp = new ethers.Contract(postAppAddress, postAppABI, signer);
    setPostApp(postApp);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Navbar web3Handler={web3Handler} account={account} />
      {loading ? (
        <h1 className="text-center text-2xl mt-48">
          ⌛Waiting for metamask connection...
        </h1>
      ) : (
        <Routes>
          <Route path="/" element={<Home postApp={postApp} />} />
          <Route path="/create" element={<Create postApp={postApp} />} />
        </Routes>
      )}
    </React.Fragment>
  );
}

export default App;
