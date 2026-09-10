const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');
const imageUrl = 'https://ostazlaw.vercel.app/og-image.jpg';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

for (const file of walk(pagesDir).filter((file) => file.endsWith('.js'))) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = original
    .replace(/(<meta property="og:image" content=")[^"]+(" \/>)/g, `$1${imageUrl}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]+(" \/>)/g, `$1${imageUrl}$2`)
    .replace(/(<meta property="og:image:width" content=")600(" \/>)/g, '$11200$2')
    .replace(/(<meta property="og:image:height" content=")800(" \/>)/g, '$1630$2');
  if (updated !== original) fs.writeFileSync(file, updated);
}
