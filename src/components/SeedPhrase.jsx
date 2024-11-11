import { mnemonicPhrase } from "../functions/mnemonic.js";
import { Header } from "./Header.jsx";
import { useState, useRef } from "react";
import {useNavigation} from './NavigationContext.jsx'
import {encryptPhrase} from '../functions/encryptPhrase.js'
import Cookies from 'js-cookie'
export const SeedPhrase = () => {

  const mnemonic = useRef(mnemonicPhrase())
  const [copyMessage, setCopyMsg] = useState("Click anywhere on card to copy");
  const { navigate } = useNavigation();
  const [checked, setChecked] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic.current);
      setCopyMsg("Copied to clipboard");
      setTimeout( () => setCopyMsg("Click anywhere on card to copy"), 5000)
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Header />
      <div className="flex justify-center ">
        <div>
          <div className="text-center mb-16 px-20">
            <h1 className="text-gray-900 dark:text-white text-5xl font-bold mb-4">
              Recovery Phrase
            </h1>
            <h2 className="text-gray-400 dark:text-gray-500 text-md font-medium">
              Save this phrase in a safe place.
            </h2>
          </div>
          <div
            className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 py-10 border border-gray-200 rounded-md px-4 "
            onClick={() => copyText()}
          >
            {mnemonic.current.split(" ").map((word) => (
              <p
                className="bg-gray-200 dark:bg-gray-500 text-black dark:text-darkWhite
                                                            px-2 py-3 text-xl rounded-md text-center hover:bg-gray-300
                                                            hover:dark:bg-gray-600"
              >
                {word}
              </p>
            ))}
          </div>
          <div className="flex gap-2 justify-center items-center mt-2">
            <h2 className="text-sm text-black dark:text-white">
              {copyMessage}
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-copy size-4"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
          </div>
          <div className="flex flex-col items-center">
            <label className="flex gap-3 items-center mt-6 text-black dark:text-darkWhite text-md">
            <input type = "checkbox" className="accent-red-300 size-4" onChange = { () => setChecked(!checked)}/>
            Have you saved the phrase?
            </label>
            <button
              className="mt-4 bg-lightRed text-white dark:bg-darkRed dark:text-darkWhite text-md font-medium rounded-md  w-[70%] p-3 hover:bg-red-800 active:bg-darkRed hover:dark:bg-red-800 active:dark:bg-red-700"
              onClick={async() => { navigate("/select"), 
                                    Cookies.set('mnemonic', (await encryptPhrase(mnemonic.current)).encryptedString )}} 
              disabled = {!checked}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
