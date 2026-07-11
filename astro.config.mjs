import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { remarkHtmlPreview } from './src/plugins/remark-html-preview.mjs';
import { remarkResolveLinks } from './src/plugins/remark-resolve-links.mjs';
import { remarkMermaid } from './src/plugins/remark-mermaid.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(__dirname, 'src/content/docs');

export default defineConfig({
  site: 'https://deucalionn.github.io',
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [
      remarkMermaid,
      remarkHtmlPreview,
      [remarkResolveLinks, { contentRoot }],
    ],
  },
});
