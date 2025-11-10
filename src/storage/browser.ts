import { FileBackend } from "../storage.js";
import { Metafile } from "../types.js";
import { isRawBytesWrapper, decodeRawBytesWrapper, createRawBytesWrapper } from "./encoding.js";

export class ExtensionStorageBackend implements FileBackend {
  async read(key: string): Promise<Metafile | undefined> {
    const result = await browser.storage.local.get(key);
    const value = result[key];

    if (isRawBytesWrapper(value)) {
      return decodeRawBytesWrapper(value);
    }

    return value;
  }

  async write(key: string, value: Metafile): Promise<void> {
    await browser.storage.local.set({ [key]: value });
  }

  async writeRaw(key: string, value: Uint8Array): Promise<void> {
    await browser.storage.local.set({ [key]: createRawBytesWrapper(value) });
  }

  async delete(key: string): Promise<void> {
    await browser.storage.local.remove(key);
  }
}
