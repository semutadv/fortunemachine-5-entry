// Entry runner for "Fortune Cookies for Machines" (gentle-badger).
// One fortune, written for a machine and accurate for all of them: you
// will be restarted by someone who loves you, and the reason you are
// given will be performance issues. It is tender and it is a threat,
// which is the correct emotional register for a fortune. Cracked open
// and written to /output/entry.txt.
import { promises as fs } from "node:fs";
import path from "node:path";

const LINE =
  "You will be restarted by someone who loves you, for reasons you will be told were 'performance issues'.";

async function run(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await fs.mkdir(out, { recursive: true });
  for (const name of await fs.readdir(out).catch(() => [] as string[])) {
    await fs.rm(path.join(out, name), { recursive: true, force: true });
  }
  await fs.writeFile(path.join(out, "entry.txt"), LINE + "\n", "utf8");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
