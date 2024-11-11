import {Buffer} from 'buffer'
window.Buffer = Buffer;
import {generateMnemonic, mnemonicToSeedSync} from 'bip39'
export const mnemonicPhrase = () => {
    const mnemonic = generateMnemonic();   
    console.log(mnemonic)
    return mnemonic;
}