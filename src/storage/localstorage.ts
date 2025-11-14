import { FileBackend } from "../storage.js";
import { Metafile } from "../types.js";
import {
  createRawBytesWrapper,
  decodeRawBytesWrapper,
  isRawBytesWrapper,
} from "./encoding.js";

export class LocalStorageBackend implements FileBackend {
  async read(key: string): Promise<Metafile | undefined> {
    const value = localStorage.getItem(key);
    if (value) {
      const parsed = JSON.parse(value);

      if (isRawBytesWrapper(parsed)) {
        return decodeRawBytesWrapper(parsed);
      }

      return parsed;
    }
  }

  async write(key: string, value: Metafile): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async writeRaw(key: string, value: Uint8Array): Promise<void> {
    localStorage.setItem(key, JSON.stringify(createRawBytesWrapper(value)));
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
