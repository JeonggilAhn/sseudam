export async function encryptCardInfo(cardNo: string, cvc: string) {
  const publicKeyPem =
    "-----BEGIN PUBLIC KEY-----" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApciQ2OdgeL4FpcJnQj9s" +
    "x+bGiyQ+WiV19jdH72ff6jD3Rv5MEBU5bv6kkR+WMvcblMjap5AuzMEOUYw1qeCm" +
    "nrNShpELW/jYl+T7fWYEeO9iFfvKi4ssUrxmF0GgGQ4RyBQU0DGQWD96w8ry00XU" +
    "5uo1nGwoUJzRRaIdia3m9TZJp6hA46AOXk1UsSRIISgV3mXiukWPagf3eZG0HMfh" +
    "zELpoiJe00u60qRYqK2syHeyonL/Q6uKfQNgBbfqKrjz116sJ9cQP6HG8ThUtKNX" +
    "PZbeV3nwL3pJhQxNbJf5mpGVfhRAivZqS5JbUFdlM9Ly8dzRrp9IOXSsb040se3w" +
    "jQIDAQAB" +
    "-----END PUBLIC KEY-----";

  const rsaAlgorithm = { name: "RSA-OAEP", hash: { name: "SHA-256" } };

  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const arrayBufferToHex = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  try {
    // 1. RSA 공개키 파싱
    const pemContents = publicKeyPem
      .replace("-----BEGIN PUBLIC KEY-----", "")
      .replace("-----END PUBLIC KEY-----", "")
      .replace(/\s/g, "");
    const binaryDer = base64ToArrayBuffer(pemContents);
    const publicKey = await window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      rsaAlgorithm,
      false,
      ["encrypt"]
    );

    // 2. AES 키 및 IV 생성
    const aesKey = await window.crypto.subtle.generateKey(
      { name: "AES-CBC", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    // 3. AES 키 & IV 암호화
    const rawKey = await window.crypto.subtle.exportKey("raw", aesKey);
    const keyHex = arrayBufferToHex(rawKey);
    const ivHex = arrayBufferToHex(iv);
    const combined = `${keyHex}:${ivHex}`;
    const encodedCombined = new TextEncoder().encode(combined);
    const encryptedKeyInfoBuffer = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      publicKey,
      encodedCombined
    );
    const encryptedKeyInfo = arrayBufferToBase64(encryptedKeyInfoBuffer);

    // 4. 카드번호와 CVC를 AES로 암호화
    const encryptWithAES = async (text: string) => {
      const encoded = new TextEncoder().encode(text);
      const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        aesKey,
        encoded
      );
      return arrayBufferToBase64(encrypted);
    };

    const encryptedCardNo = await encryptWithAES(cardNo);
    const encryptedCvc = await encryptWithAES(cvc);

    // 5. 결과 반환
    return {
      key_info: encryptedKeyInfo,
      card_no: encryptedCardNo,
      cvc: encryptedCvc,
    };
  } catch (error) {
    console.error("암호화 실패:", error);
    throw error;
  }
}
