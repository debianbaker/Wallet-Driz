export const encryptPhrase = async (mnemonic) => {
  const publicKeyBase64 = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAptkVQv2opBKSXGbiHs1B6v1lHwQIi4SZsG25f7c1H+STnG+98CCbw49gaKGTy1OtaKgmZ3GXEpDR3b2xRINDJM73AC64CemyWDtFF82V0UgLgWNDyEcTnJlghnJfIiznbE3+nGHxhurlMyNVocvwXv4zKTeQ500fZPkbIcEh5SoRou54qJ4GKwqxlfOSplpWFMnUallGeVC14GcKS4vEa6SFbGN8q/RTT7ok7nTZsDQHfrAV3DjwpGl/4/svAWDKLHJh1NMm5/70t465Z9JKCx7JjsnZmWySn5npP5KOKDxILLq1dtoyKo6J8ibpcoXsSo3gA8+2yyw06iko37BzCQIDAQAB";

  const publicKey = await importPublicKey(publicKeyBase64);
  
//   const { publicKey, privateKey } = await window.crypto.subtle.generateKey(
//       {
//         name: "RSA-OAEP",
//         modulusLength: 2048, // can be 1024, 2048, or 4096
//         publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
//         hash: { name: "SHA-256" }, // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
//       },
//       true, // whether the key is extractable (i.e. can be used in exportKey)
//       ["encrypt", "decrypt"] // can be any combination of "encrypt" and "decrypt"
//     );
//   const exportedKey = await window.crypto.subtle.exportKey('spki', publicKey);
//   const binaryString = String.fromCharCode(...new Uint8Array(exportedKey));
//   const base64String = btoa(binaryString);
//   console.log("PublicKey:" ,base64String +"\n\n")
//   const exportedKey2 = await window.crypto.subtle.exportKey('pkcs8', privateKey);
//   const binaryString2 = String.fromCharCode(...new Uint8Array(exportedKey2));
//   const base64String2 = btoa(binaryString2);
//   console.log("Private Key: ",base64String2)

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey, // from generateKey or importKey above
    new TextEncoder().encode(mnemonic) // ArrayBuffer of data you want to encrypt
  );
  // console.log(encryptedData)
  return { encryptedString: arrayBufferToBase64(encryptedData)};

  function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary); // Encode to Base64
    }

  async function importPublicKey(publicKeyBase64) {
    const binaryString = atob(publicKeyBase64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return window.crypto.subtle.importKey(
      "spki",
      bytes.buffer,
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" },
      },
      true,
      ["encrypt"]
    );
  }
};
