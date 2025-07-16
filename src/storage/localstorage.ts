import { FileBackend } from '../storage';

export class LocalStorageBackend implements FileBackend {
  async read(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async write(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}