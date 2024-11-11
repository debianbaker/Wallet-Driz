import { Header } from "./Header.jsx";
import { useNavigation } from "./NavigationContext.jsx";
import Cookies from "js-cookie";

export const SelectNetwork = () => {
  const { navigate } = useNavigation();
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Header />
      <div className="flex justify-center ">
        <div>
          <div className="text-center mb-16 px-20">
            <h1 className="text-gray-900 dark:text-white text-5xl font-bold mb-4">
              Select Network
            </h1>
            <h2 className="text-gray-400 dark:text-gray-500 text-md font-medium">
              Multi-Blockchain support. You can add more later.
            </h2>
          </div>

          <div className="flex flex-col gap-4 pb-20 items-start">
            <button
              className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-darkWhite rounded-md bg-gray-200 dark:bg-gray-600
            hover:bg-gray-300 hover:dark:bg-gray-700 active:bg-gray-400 active:dark:bg-gray-800 w-[100%] p-4"
              onClick={() => {
                  Cookies.set("currency", "solana"), navigate("/landing"),
                  Cookies.set('solanaCount', 1)
                  Cookies.set('ethereumCount', 0)
              }}
            >
              <img
                src="https://s3.amazonaws.com/app-assets.xnfts.dev/images/network-logo-replacement-solana.png"
                style={{ height: "32px", width: "32px", borderRadius: "100%" }}
              ></img>
              Solana
            </button>
            <button
              className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-darkWhite rounded-md bg-gray-200 dark:bg-gray-600
            hover:bg-gray-300 hover:dark:bg-gray-700 active:bg-gray-400 active:dark:bg-gray-800 w-[100%] p-4"
              onClick={() => {
                  Cookies.set("currency", "ethereum"), navigate("/landing"),
                  Cookies.set('ethereumCount', 1)
                  Cookies.set('solanaCount', 0)
              }}
            >
              <img
                src="https://s3.amazonaws.com/app-assets.xnfts.dev/images/logo-eclipse.svg"
                style={{ height: "32px", width: "32px", borderRadius: "100%" }}
              ></img>
              Ethereum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
