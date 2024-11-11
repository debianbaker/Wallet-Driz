import {mnemonicToSeedSync } from "bip39";
import {decryptCookie} from './decryptCookie'
import Cookies from 'js-cookie'
import {HDNodeWallet, Wallet} from 'ethers'

export const ethGenerate = async (id) => {
const {decryptedString} = await decryptCookie(Cookies.get('mnemonic'))
const seed = mnemonicToSeedSync(decryptedString);
// console.log(seed);
const hdNode = HDNodeWallet.fromSeed(seed);  // -- initialises HDNodeWallet object having master public,private keys.
// console.log(hdNode)
    const path = `m/44'/60'/0'/0/${id}`;   //Phantom
    const child = hdNode.derivePath(path);  
    return {privateKey: child.privateKey, publicKey: child.publicKey, address:child.address}
    // HDNodeWallet object having child private, public keys and address

    // console.log(new Wallet(child.privateKey))   
    // creates a Wallet object using child private key having address and private key of this child.
}

