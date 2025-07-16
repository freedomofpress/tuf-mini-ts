import * as fs from "node:fs/promises";

import { FileBackend } from "../storage";
import { Metafile } from "../types";

export class FSBackend implements FileBackend {
  constructor(private basePath: string) {}

  async read(key: string): Promise<Metafile | undefined> {
    try {
      const value = await fs.readFile(`${this.basePath}/${key}`, "utf8");
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }

  async write(key: string, value: Metafile): Promise<void> {
    await fs.writeFile(
      `${this.basePath}/${key}`,
      JSON.stringify(value),
      "utf8",
    );
  }

  async delete(key: string): Promise<void> {
    await fs.unlink(`${this.basePath}/${key}`);
  }
}
