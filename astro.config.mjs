import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://claytonhalim.com',
  output: 'static',
  base: '/',
  trailingSlash: 'never',
  // 'file' so legacy /YYYY/MM/DD/slug.html post URLs are emitted as real
  // .html files (GitHub Pages also serves /page for /page.html).
  build: { format: 'file' },
  integrations: [mdx(), sitemap()],
});
