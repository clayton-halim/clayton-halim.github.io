import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://claytonhalim.com',
  output: 'static',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
});
