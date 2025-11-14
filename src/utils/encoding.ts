export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer.slice(0);
}

export function Uint8ArrayToBase64(uint8Array: Uint8Array): string {
  let binaryString = "";

  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }

  return btoa(binaryString);
}

export function hexToArrayBuffer(hex: string): ArrayBuffer {
  if (hex.length % 2 !== 0) {
    throw new Error("Hex string must have an even length");
  }

  const length = hex.length / 2;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return uint8Array.buffer.slice(0);
}

export function Uint8ArrayToHex(data: Uint8Array | ArrayBuffer): string {
  const array = new Uint8Array(data);
  let hexString = "";

  for (let i = 0; i < array.length; i++) {
    let hex = array[i].toString(16);
    if (hex.length === 1) {
      hex = "0" + hex;
    }
    hexString += hex;
  }

  return hexString;
}

export function stringToUintArrayBuffer(str: string): ArrayBuffer {
  // Defaults to utf-8, but utf-8 is ascii compatible
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer.slice(0);
}

export function Uint8ArrayToString(uint8Array: Uint8Array): string {
  return new TextDecoder().decode(uint8Array);
}
