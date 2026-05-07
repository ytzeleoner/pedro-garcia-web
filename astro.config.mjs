// @ts-check
import { defineConfig } from 'astro/config';
import { remarkWikiLink } from '@flowershow/remark-wiki-link';

// https://astro.build/config
export default defineConfig({
  site: 'https://pedrogarcia.dev',
  markdown: {
    remarkPlugins: [
      [remarkWikiLink, {
        pathFormat: 'obsidian-short',
        wikiLinkClassName: 'wiki-link',
        newClassName: 'wiki-link-new',
      }],
    ],
  },
});
