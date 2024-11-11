export const decryptCookie = async(data) => {
const privateKeyBase64 = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCm2RVC/aikEpJcZuIezUHq/WUfBAiLhJmwbbl/tzUf5JOcb73wIJvDj2BooZPLU61oqCZncZcSkNHdvbFEg0MkzvcALrgJ6bJYO0UXzZXRSAuBY0PIRxOcmWCGcl8iLOdsTf6cYfGG6uUzI1Why/Be/jMpN5DnTR9k+RshwSHlKhGi7niongYrCrGV85KmWlYUydRqWUZ5ULXgZwpLi8RrpIVsY3yr9FNPuiTudNmwNAd+sBXcOPCkaX/j+y8BYMoscmHU0ybn/vS3jrln0koLHsmOydmZbJKfmek/ko4oPEgsurV22jIqjonyJulyhexKjeADz7bLLDTqKSjfsHMJAgMBAAECggEAAXXvkXdSiWMvPFdbPe1KmTHQN5ILuBr4VHrVb6iNMsMHxswUo9xJONBRxgC6IELShxLHyUqNichSSght251xkkosj+gYzN9qpAqay39NgzhH/4E8t+1lXs7Z8TthmVU+zmwtYTWbTXTTflveFU1JhK9hh8gYgOnkLzheFDDSaOTugMNluxIKvbM0PyM/Tv4IEr5tUIN3ZC2FEClw4jrOUVFxcHG9IJlwnb5/UpaSOY9zVTXDMym6hzG8MuhEw+RfhpnNZWqAbhuOkJOPkdjTYMoN3n2k9QyHhGIjtE29g9w8Qfs1UgjUYMkB5T/WOqdk4j0Ztdtc8eW3uGOwKUkuHQKBgQDlJ1hdyAuIe55SmPqB1hY4+0aPE6YpZzR7MCyDMjCUSl3TUkLgBRWMlDsOv+19shw58MjwNZEFWmxmFsOJf45Ljb1qmyBpi7gAo4NWPah8ah8ILkHIeZ3vh/zmR0qRpg5WWkUYmbmZbbrbCVut8VSBuC6PpkP6ISBd58lNULsdbQKBgQC6ZRks2cH7g3+UtnpfWN7pVKHrkerRYK3NSpuNmqp6B7oktf2N42j/igfQNCdKFhvdxL3NrHz/9adB5RpYIio1ArrEfFZWBPEY1EuSuYwy3LTyxbLQAZV+4OKwc1eSfn+LU0+p6wD00vbZ9qIxW6iIEov0lNcemQTCjGYU57V2jQKBgDMS/OgSITfvTY9dV2A+5j8XClfzajKKNTFLwHARbLBwjs7947foijAGDc+wyW8dlpr3ZuHbHpKR3901L6niy0Vdtx0erC+6G23RBAHhxj7MrFP3c2QKb0AnECAHPcCOwV1Py1y7Tpm60k3lnRB83Hf5JC+SQE5subkUY1KfLsVVAoGBAItHfh9YfC3/nba3AAv9MVwzJGcNeuSHlHeBV2jheJ+E5KAH6XY7xrqkHqCCSBWBHcOB/r4QNLtiiV+g3SWcKePArWSi8DSIrst53xq9UTi0WPXLqojplhbf3iQxm+9YXN/0GeQDOYy3k0Ndmua88drz2OaizXgMqVTiamkWly8FAoGABkeXi6mV/ELpCdfqWarjXFwq+ije+5bzAkXUUaOxUQeDFaE91R1XdUcrj/gHQSU+kbw00uUoua6dDw2YK2MIXPaXzVGYEUE0pv0A443lJ6Q5jAX9hx7PLHgHoZF8NP0Zot3OnPRmpaze0PZy0Qb56KTHnMYcHDqRsg87/jBP0AY="

const privateKey = await importPrivateKey(privateKeyBase64);
const dataBuffer = base64ToArrayBuffer(data); //converts base64 to ArrayBuffer

  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey, 
    dataBuffer  // ArrayBuffer of the data
  );
  return {decryptedString: new TextDecoder().decode(decryptedData)};

function base64ToArrayBuffer(base64) {
    const binary = atob(base64); // Decode Base64 to binary
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

async function importPrivateKey(privateKeyBase64) {
    const binaryString = atob(privateKeyBase64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return window.crypto.subtle.importKey(
        'pkcs8',
        bytes.buffer,
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" },
        },
        true,
        ["decrypt"]
    );
}
}