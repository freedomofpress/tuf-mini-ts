import * as fs from "node:fs/promises";

import { FileBackend } from "../storage.js";
import { Metafile } from "../types.js";

export class FSBackend implements FileBackend {
  async read(key: string): Promise<Metafile | undefined> {
    try {
      const value = await fs.readFile(key, "utf8");
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }

  async write(key: string, value: Metafile): Promise<void> {
    await fs.writeFile(key, JSON.stringify(value), "utf8");
  }

  async writeRaw(key: string, value: Uint8Array): Promise<void> {
    await fs.writeFile(key, value);
  }

  async delete(key: string): Promise<void> {
    try {
      await fs.unlink(key);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }
}
