import { Header } from "./Header";
import { useState, useEffect } from "react";
import { solanaGenerate } from "../functions/solanaGenerate.js";
import { ethGenerate } from "../functions/ethGenerate.js";
import Cookies from "js-cookie";
import { v4 } from "uuid";
export const Landing = () => {
  // const [n1, setN1] = useState(parseInt(Cookies.get("solanaCount")));
  // const [n2, setN2] = useState(parseInt(Cookies.get("ethereumCount")));
  const [totalSolWalletsAccessed, setTotalSolWalletsAccessed] = useState(
    parseInt(Cookies.get("solanaCount"))
  );
  const [totalEthWalletsAccessed, setTotalEthWalletsAccessed] = useState(
    parseInt(Cookies.get("ethereumCount"))
  );
  const [solanaKeys, setSolanaKeys] = useState(Cookies.get('solanaKeys')?JSON.parse(Cookies.get('solanaKeys')):[]);
  const [ethereumKeys, setEthereumKeys] = useState(Cookies.get('ethereumKeys')?JSON.parse(Cookies.get('ethereumKeys')):[]);
  const [solActive, setSolActive] = useState(false); //active here means content hidden
  const [ethActive, setEthActive] = useState(false); //active here means content hidden


  useEffect( () => {
    Cookies.set('solanaKeys', JSON.stringify(solanaKeys))
  },[solanaKeys])
  useEffect( () => {
    Cookies.set('ethereumKeys', JSON.stringify(ethereumKeys))
  },[ethereumKeys])

  useEffect(() => {
    Cookies.set("solanaCount", totalSolWalletsAccessed);
    const solKeys = async (index) => {
      const key = await solanaGenerate(index);
      if(solanaKeys.filter(item => item.privateKey == key.privateKey).length==0){
        setSolanaKeys((keys) => [
            ...keys,
            { id: v4(), address: key.address, privateKey: key.privateKey },
        ]);
    }
    };
    solKeys(totalSolWalletsAccessed - 1);
  }, [totalSolWalletsAccessed]);

  useEffect(() => {
    Cookies.set("ethereumCount", totalEthWalletsAccessed);
    const ethKeys = async (index) => {
      const key = await ethGenerate(index);
      if(ethereumKeys.filter(item => item.privateKey == key.privateKey).length==0){
        setEthereumKeys((keys) => [
            ...keys,
            { id: v4(), address: key.address, privateKey: key.privateKey },
        ]);
    }
    };
    ethKeys(totalEthWalletsAccessed - 1);
  }, [totalEthWalletsAccessed]);


  const solHandleToggle = () => {
    setSolActive(!solActive);
  };
  const ethHandleToggle = () => {
    setEthActive(!ethActive);
  };
  const addSolWallet = () => {
    setTotalSolWalletsAccessed((total) => total + 1);
  };
  const addEthWallet = () => {
    setTotalEthWalletsAccessed((total) => total + 1);
  };
  const deleteSolWallet = (walletId) => {
    setSolanaKeys((keys) => keys.filter((key) => key.id != walletId));
  };
  const deleteEthWallet = (walletId) => {
    setEthereumKeys((keys) => keys.filter((key) => key.id != walletId));
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Header />
      <div id="walletType" className="flex flex-col gap-16 px-20 pb-6">
        <div
          id="solana"
          className="text-black dark:text-darkWhite border-2 border-gray-300 
                dark:border-gray-500 rounded-2xl mt-4 px-10 py-5"
        >
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-2"
              onClick={() => solHandleToggle()}
            >
              <button className="p-3 hover:dark:bg-darkGray hover:bg-slate-100 rounded-lg">
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 17 10"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transition: "transform 0.2s ease-out" }}
                  className={solActive ? "rotate-180" : "rotate-0"}
                >
                  <path
                    d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                    fill=""
                    stroke=""
                  />
                </svg>
              </button>
              <h1 className="text-4xl font-extrabold">Solana Wallet</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => addSolWallet()}
                className="bg-black text-darkWhite dark:bg-darkWhite dark:text-black text-base font-medium rounded-md  
                            p-2 hover:bg-gray-900 active:bg-gray-800 hover:dark:bg-gray-200 active:dark:bg-gray-300"
              >
                Add Wallet
              </button>
              <button
                onClick={() => {setTotalSolWalletsAccessed(0), setSolanaKeys([])}}
                className="bg-lightRed text-white dark:bg-darkRed dark:text-darkWhite text-base font-medium rounded-md 
                            p-2 hover:bg-red-800 active:bg-darkRed hover:dark:bg-red-800 active:dark:bg-red-700"
              >
                Clear Wallets
              </button>
            </div>
          </div>
          <div
            className={`transition-opacity duration-300 ease-in-out ${
              !solActive ? "opacity-1000" : "opacity-0 pointer-events-none"
            }`}
          >
            {!solActive
              ? solanaKeys.map((value, index) => (
                  <div
                    key={index}
                    id={`div-${index}`}
                    className="border-2 border-gray-300 dark:border-gray-500 rounded-2xl my-6"
                  >
                    <div className="flex items-center justify-between px-8 py-5">
                      <h2 className="text-3xl font-bold">Wallet {index + 1}</h2>
                      <button
                        className="p-3 hover:dark:bg-darkGray hover:bg-slate-100 rounded-lg"
                        onClick={() => deleteSolWallet(value.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgb(200 0 0)"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-trash size-4 text-destructive"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="rounded-2xl bg-slate-100 dark:bg-darkGray px-8 py-5">
                      <div className="mb-5">
                        <h3 className="text-xl font-bold mb-1">Address</h3>
                        <p className="text-gray-500 dark:text-gray-300">
                          {solanaKeys[index].address}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">Private Key</h3>
                        <p className="text-gray-500 dark:text-gray-300">
                          {solanaKeys[index].privateKey}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>

        <div
          id="ethereum"
          className="text-black dark:text-darkWhite border-2 border-gray-300 
                dark:border-gray-500 rounded-2xl px-10 py-5"
        >
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-2"
              onClick={() => ethHandleToggle()}
            >
              <button className="p-3 hover:dark:bg-darkGray hover:bg-slate-100 rounded-lg">
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 17 10"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transition: "transform 0.2s ease-out" }}
                  className={ethActive ? "rotate-180" : "rotate-0"}
                >
                  <path
                    d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                    fill=""
                    stroke=""
                  />
                </svg>
              </button>
              <h1 className="text-4xl font-extrabold">Ethereum Wallet</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => addEthWallet()}
                className="bg-black text-darkWhite dark:bg-darkWhite dark:text-black text-base font-medium rounded-md  
                            p-2 hover:bg-gray-900 active:bg-gray-800 hover:dark:bg-gray-200 active:dark:bg-gray-300"
              >
                Add Wallet
              </button>
              <button
                onClick={() => {setTotalEthWalletsAccessed(0), setEthereumKeys([])}}
                className="bg-lightRed text-white dark:bg-darkRed dark:text-darkWhite text-base font-medium rounded-md 
                            p-2 hover:bg-red-800 active:bg-darkRed hover:dark:bg-red-800 active:dark:bg-red-700"
              >
                Clear Wallets
              </button>
            </div>
          </div>
          <div
            className={`transition-opacity duration-300 ease-in-out ${
              !ethActive ? "opacity-1000" : "opacity-0 pointer-events-none"
            }`}
          >
            {!ethActive
              ? ethereumKeys.map((value, index) => (
                  <div
                    key={index}
                    id={`div-${index}`}
                    className="border-2 border-gray-300 dark:border-gray-500 rounded-2xl my-6"
                  >
                    <div className="flex items-center justify-between px-8 py-5">
                      <h2 className="text-3xl font-bold">Wallet {index + 1}</h2>
                      <button
                        className="p-3 hover:dark:bg-darkGray hover:bg-slate-100 rounded-lg"
                        onClick={() => deleteEthWallet(value.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgb(200 0 0)"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-trash size-4 text-destructive"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="rounded-2xl bg-slate-100 dark:bg-darkGray px-8 py-5">
                      <div className="mb-5">
                        <h3 className="text-xl font-bold mb-1">Address</h3>
                        <p className="text-gray-500 dark:text-gray-300">
                          {ethereumKeys[index].address}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">Private Key</h3>
                        <p className="text-gray-500 dark:text-gray-300">
                          {ethereumKeys[index].privateKey}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
