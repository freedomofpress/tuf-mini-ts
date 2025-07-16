export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i); // Convert binary string to byte array
  }

  return bytes;
}

export function Uint8ArrayToBase64(uint8Array: Uint8Array): string {
  let binaryString = "";

  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }

  return btoa(binaryString);
}

export function hexToUint8Array(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error("Hex string must have an even length");
  }

  const length = hex.length / 2;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return uint8Array;
}

export function Uint8ArrayToHex(uint8Array: Uint8Array): string {
  let hexString = "";

  for (let i = 0; i < uint8Array.length; i++) {
    let hex = uint8Array[i].toString(16);
    if (hex.length === 1) {
      hex = "0" + hex;
    }
    hexString += hex;
  }

  return hexString;
}

export function stringToUint8Array(str: string): Uint8Array {
  // Defaults to utf-8, but utf-8 is ascii compatible
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

export function Uint8ArrayToString(uint8Array: Uint8Array): string {
  const decoder = new TextDecoder("ascii");
  return decoder.decode(uint8Array);
}
