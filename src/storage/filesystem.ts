import * as fs from "node:fs/promises";

import { FileBackend } from "../storage";

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
