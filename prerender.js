import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routesToPrerender = ['/', '/about', '/jnanasudha'];

async function prerender() {
  const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
  const { render } = await import('./dist-server/entry-server.js');

  for (const url of routesToPrerender) {
    const appHtml = render(url);
    const html = template.replace(`<!--app-html-->`, appHtml).replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

    const filePath = path.resolve(__dirname, `dist${url === '/' ? '' : url}/index.html`);
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, html);
    console.log(`pre-rendered: ${filePath}`);
  }
}

prerender().catch((e) => {
  console.error('Error during prerendering:', e);
  process.exit(1);
});
