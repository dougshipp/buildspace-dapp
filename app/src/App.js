import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/GreetingsPortal.json';

const App = () => {
  const [ user, setUser ] = useState("");
  const [ allUpVotes, setAllUpVotes ] = useState([]);
  const [ caption, setCaption ] = useState("");
  const contractAddress = "0x5D375f4602cC85ab39A72429a11F0EeC20315C5c";
  const contractAbi = abi.abi;

  const getAllUpVotes = async () => {
    try {
      const { ethereum } = window;
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        const upVotes = await contract.getAllUpVotes();

        let cleanedVotes = [];
        upVotes.forEach( vote => {
          cleanedVotes.push({
            address: vote.sender,
            timestamp: new Date(vote.timestamp * 1000),
            message: vote.message
          });
        });

        setAllUpVotes(cleanedVotes);
      } else { console.log("Ethereum object doesn't exist"); }
    } catch (error) {
      console.log(error);
    }
  }

  const checkWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please connect Metamask wallet");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
        getAllUpVotes();
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Authorized account:", account);
        setUser(account);
        await getAllUpVotes();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setUser(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  async function upVote() {
    try {
      const { ethereum } = window;
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        let count = await contract.getTotalUpVotes();
        console.log("Retrieved total upvotes...", count.toNumber());

        const txn = await contract.upVote(caption);
        console.log("Mining transaction....", txn.hash);

        await txn.wait();
        console.log("Mined --", txn.hash);

        count = await contract.getTotalUpVotes();
        console.log("Retrieved total upvotes...", count.toNumber());
      } else { console.log("Ethereum object doesn't exist") }
    } catch (error) { console.log(error); }
  }



  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
      <div className="mainContainer">

        <div className="dataContainer">
          <div className="header">
            👋 Hey there! {user}
          </div>
          <div className="bio">
            I'm Douglas and I make generative art cool right?
            <br></br>
            Connect your Ethereum wallet and say hello!
          </div>

          {!user && (
              <button className="login" onClick={connectWallet}>
                Connect Wallet
              </button>
          )}

          {allUpVotes.map((vote, index) => {
            return(
                <div key={index} style={{background: "OldLace", marginTop: "16px", padding: "8px"}}>
                  <div>Address: {vote.address}</div>
                  <div>Time: {vote.timestamp.toString()}</div>
                  <div>Message: {vote.message}</div>
                </div>)
          })}

          <div>

            <button className="upVoteButton" onClick={()=> {
              upVote();
            }}>
              Caption
            </button>

            <input placeholder="Best caption wins!!" onChange={(message) => {
              setCaption(message);
            }}/>

          </div>
        </div>
      </div>
  );
}

export default App;
