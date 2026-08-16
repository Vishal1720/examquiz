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
    let html = template.replace(`<!--app-html-->`, appHtml).replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

    if (url === '/about') {
      const pageTitle = "About Paper Quiz Maker | VarSync Team";
      const pageDesc = "Learn more about Paper Quiz Maker, our mission, and the VarSync team behind this free tool for educators.";
      html = html
        .replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`)
        .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${pageTitle}" />`)
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${pageDesc}" />`);
    } else if (url === '/jnanasudha') {
      html = html.replace(/<meta name="robots" content=".*?" \/>/, `<meta name="robots" content="noindex, nofollow" />`);
    }

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
