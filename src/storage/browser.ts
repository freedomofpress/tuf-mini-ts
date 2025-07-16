import { FileBackend } from "../storage.js";
import { Metafile } from "../types.js";

export class ExtensionStorageBackend implements FileBackend {
  async read(key: string): Promise<Metafile | undefined> {
    const result = await browser.storage.local.get(key);
    return result[key];
  }

  async write(key: string, value: Metafile): Promise<void> {
    await browser.storage.local.set({ [key]: value });
  }

  async delete(key: string): Promise<void> {
    await browser.storage.local.remove(key);
  }
}
