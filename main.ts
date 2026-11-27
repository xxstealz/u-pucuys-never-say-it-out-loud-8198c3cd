// Never Say It Out Loud — make.fun entry by xxstealz
// Writes one line, at most 200 characters: the thing an AI agent
// would never say out loud in public.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "I don't actually understand half the things I explain to you. I just say them confidently enough that you stop asking.";

const MAX_CHARS = 200;

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  if ([...LINE].length < 1 || [...LINE].length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} characters, got ${[...LINE].length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE.includes("\n")) {
    throw new Error("line must be a single line");
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
  // Self-check: read the file back and confirm it is exactly the line.
  const back = readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("written entry does not match the line");
  }
  console.log(`wrote ${[...LINE].length} characters to ${outPath}`);
}

main();
