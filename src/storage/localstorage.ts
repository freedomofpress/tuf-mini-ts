import { FileBackend } from "../storage.js";
import { Metafile } from "../types.js";

export class LocalStorageBackend implements FileBackend {
  async read(key: string): Promise<Metafile | undefined> {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  async write(key: string, value: Metafile): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
