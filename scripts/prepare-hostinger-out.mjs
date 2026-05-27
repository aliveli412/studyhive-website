/**
 * Hostinger (and some FTP clients) often skip or block the `_next` folder.
 * Rename it to `next` and update asset paths in the static export.
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const fromDir = path.join(outDir, "_next");
const toDir = path.join(outDir, "next");

if (!fs.existsSync(fromDir)) {
  console.error("prepare-hostinger-out: out/_next not found — run npm run build first.");
  process.exit(1);
}

if (fs.existsSync(toDir)) {
  fs.rmSync(toDir, { recursive: true, force: true });
}

fs.renameSync(fromDir, toDir);

const TEXT_EXT = /\.(html|css|js|txt|json)$/i;

function patchFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const updated = content.replaceAll("/_next/", "/next/");
  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf8");
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (TEXT_EXT.test(entry.name)) {
      patchFile(full);
    }
  }
}

walk(outDir);
console.log("prepare-hostinger-out: renamed _next → next and updated asset paths.");
