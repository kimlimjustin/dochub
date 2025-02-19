// copy all src/files to out/src

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const srcDir = path.join(__dirname, "../src");
const outDir = path.join(__dirname, "../out/src");

fs.cpSync(srcDir, outDir, { recursive: true });
