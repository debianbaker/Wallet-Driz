// import { hexToBytes, bytesToHex } from 'noble-hashes/utils'; // For hex to bytes conversion
import * as bip39 from 'bip39'; // For mnemonic generation
import {BIP32Factory} from 'bip32'; // For HD key derivation
import * as ecc from 'tiny-secp256k1'
import { decryptCookie } from './decryptCookie';
import Cookies from'js-cookie'
import bs58 from 'bs58';

const bip32 = BIP32Factory(ecc);
// Function to derive keys using a BIP32 path
async function deriveKeys(mnemonic, path) {

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = bip32.fromSeed(seed);
  const child = root.derivePath(path);              
  console.log(child)
  // Get the private and public keys
  const privateKey = child.privateKey;
  const publicKey = child.publicKey;
  return {
    privateKey: bs58.encode(privateKey), publicKey:bs58.encode(publicKey)
  };
}

// Example usage
export const solanaGenerate = async(id) => {
  const {decryptedString} = await decryptCookie(Cookies.get('mnemonic'))
  console.log(decryptedString)
  const path = `m/44'/501'/${id}'/0`; // Example derivation path

  const { privateKey, publicKey } = await deriveKeys(decryptedString, path);

//   console.log(`Mnemonic: ${decryptedString}`);
//   console.log(`Derivation Path: ${path}`);
//   console.log(`Private Key: ${privateKey}`);
//   console.log(`Public Key: ${publicKey}`);

  return {publicKey:publicKey, privateKey:privateKey, address:publicKey}
}
