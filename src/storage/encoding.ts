// Shared utilities for encoding/decoding raw bytes in browser storage
import { Metafile } from "../types.js";
import { base64ToArrayBuffer, Uint8ArrayToBase64 } from "../utils/encoding.js";

export function isRawBytesWrapper(
  value: unknown,
): value is { __raw_bytes__: string } {
  return (
    value != null &&
    typeof value === "object" &&
    "__raw_bytes__" in value &&
    // eslint-disable-next-line
    typeof (value as any).__raw_bytes__ === "string"
  );
}

export function decodeRawBytesWrapper(wrapper: {
  __raw_bytes__: string;
}): Metafile {
  const bytes = base64ToArrayBuffer(wrapper.__raw_bytes__);
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function createRawBytesWrapper(value: Uint8Array): {
  __raw_bytes__: string;
} {
  return { __raw_bytes__: Uint8ArrayToBase64(value) };
}
