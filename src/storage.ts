// The goal of this class is to support:
//  - Running in a webapp (localstorage)
//  - Running in a browser extension (extensions storage)
//  - Running in node (filesystem)

export interface FileBackend {
  read(key: string): Promise<string | null>;
  write(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

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

export class FSBackend implements FileBackend {
  constructor(private basePath: string) {}

  async read(key: string): Promise<string | null> {
    try {
      return await fs.readFile(`${this.basePath}/${key}`, "utf8");
    } catch {
      return null;
    }
  }

  async write(key: string, value: string): Promise<void> {
    await fs.writeFile(`${this.basePath}/${key}`, value, "utf8");
  }

  async delete(key: string): Promise<void> {
    await fs.unlink(`${this.basePath}/${key}`);
  }
}
