- ArrayBuffer to String and then back to ArrayBuffer causes problems - So converted to base64 - Read code and understand.
- TextDecoder/Encoder works with plain String/text. That's why in decrypt it gives correct and not for encrpyt
- ArrayBuffer vs uint8 array.
- map ke andar async use nahi kar paya
- ed25519 me dikkat but ethers works fine in browser.
- polyfills for browser compatibility for node libraries
- hdkey' outdated library error
- read 'wasm'. Was asked when importing tiny-scep256k1
PROBLEMS:
I render all divs together but i don't know how to animate the new div on clicking Add Wallet since i render all divs at once.

NOTE: 
- Encryption/Decryption causes problems because Keys are big. Even though i tried encrypting only the private keys and not publicKeys then also it causes some abrupt behaviour when wallets are big (>6) in number.
- So, In order for me to render on reloading properly, (i.e. instead of storing on localStorage/Cookies)I need to switch from Client-side to server-side for security of keys(whether encryption/decryption keys or wallet keys).
BUT I DID NOT DO THIS. INSTEAD I STORED KEY DIRECTLY ON COOKIE.
[Spent too much time debugging what was the error actually :)]

# Removing after making application :
- Clear Wallets + delete button show show confirm box
- on adding wallet/removing show message 
- eye button for private key
- handle routing properly
- make backend route
- make responsive

NOTES On deploying: 
Write Site configurations on netlify properly - about build directory, build command etc. 
Gives error in MIME type (Content-type) as application/octet-stream, so handled content-type for netlify in _headers file.
Works great but errors in Routing.
