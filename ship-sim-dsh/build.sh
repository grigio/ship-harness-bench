#!/usr/bin/env bash
# Build the self-contained index.html from src/main.js + three.js
set -euo pipefail
cd "$(dirname "$0")"

export BUN_TMPDIR="$(pwd)/.bun-tmp"
export BUN_INSTALL="$(pwd)/.bun-install"

echo "→ bundling src/main.js …"
bun build ./src/main.js --outfile ./dist/app.js --format esm --minify --target browser >/dev/null

echo "→ inlining bundle into index.html …"
node -e '
const fs = require("fs");
const bundle = fs.readFileSync("./dist/app.js", "utf8");
let html = fs.readFileSync("./index.template.html", "utf8");
if (!html.includes("/*__BUNDLE__*/")) { throw new Error("placeholder missing"); }
html = html.replace("/*__BUNDLE__*/", () => bundle); // function → no $&-escaping
fs.writeFileSync("./index.html", html);
console.log("wrote index.html  (" + (bundle.length/1024).toFixed(0) + " KB bundle inline)");
'
echo "✓ done"