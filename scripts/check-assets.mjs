// Fails the build if the site references an image/file that doesn't exist in public/.
// Netlify then keeps the current live version instead of publishing a broken one.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exts = 'png|jpe?g|webp|avif|gif|svg|mp4|pdf|woff2?';
const ref = new RegExp(`/?assets/[^'"\`\\s)]+\\.(?:${exts})`, 'gi');

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? files(p) : /\.(js|jsx|json|css|html)$/.test(e.name) ? [p] : [];
  });
}

const missing = new Map();
for (const file of [...files(path.join(root, 'src')), path.join(root, 'index.html')]) {
  for (const m of fs.readFileSync(file, 'utf8').matchAll(ref)) {
    const rel = m[0].replace(/^\//, '');
    if (!fs.existsSync(path.join(root, 'public', decodeURIComponent(rel)))) {
      if (!missing.has(rel)) missing.set(rel, path.relative(root, file));
    }
  }
}

if (missing.size) {
  console.error('Missing files referenced by the site:');
  for (const [rel, file] of missing) console.error(`  ${rel}  (in ${file})`);
  process.exit(1);
}
console.log('check-assets: all referenced files exist');
