import { Header } from "./Header";
import {useNavigation} from './NavigationContext'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {encryptPhrase} from '../functions/encryptPhrase'
export const ImportWallet = () => {
    const {navigate} = useNavigation();
    const [inputValue, setValue] = useState('')
  return (
    <div className="bg-white dark:bg-black h-screen">
      <Header />
      <div className="mx-10 flex flex-col gap-4">
        <div className="text-black dark:text-darkWhite text-3xl font-semibold">
          {" "}
          Secret Recovery Phrase
        </div>
        <div className="flex gap-4 ">
          <input
            type="password"
            className="border-2 border-gray-200 dark:border-gray-500 focus:ring-2 focus:ring-black focus:ring-offset-2 
            focus:outline-none dark:focus:ring-darkWhite dark:focus:ring-offset-black rounded-md p-2 w-[70%]
            text-md bg-white dark:bg-black placeholder-gray-500 text-black dark:text-darkWhite tracking-wide"
            placeholder="Enter your secret phrase" onChange = { (e) => setValue(e.target.value)}
          ></input>
          <button className="bg-black dark:bg-darkWhite text-gray-100 dark:text-black rounded-md px-4" 
          onClick= { async() => {navigate('/select'), 
                                 Cookies.set('mnemonic', (await encryptPhrase(inputValue)).encryptedString)}}>
            Generate Wallet
          </button>
        </div>
      </div>
    </div>
  );
};
