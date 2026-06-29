import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://beckman0470.github.io',
  integrations: [sitemap()],
});
