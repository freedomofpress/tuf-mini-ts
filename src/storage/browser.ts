import { FileBackend } from "../storage";

export class ExtensionStorageBackend implements FileBackend {
  async read(key: string): Promise<string | null> {
    const result = await browser.storage.local.get(key);
    return result[key] ?? null;
  }

  async write(key: string, value: string): Promise<void> {
    await browser.storage.local.set({ [key]: value });
  }

  async delete(key: string): Promise<void> {
    await browser.storage.local.remove(key);
  }
}
