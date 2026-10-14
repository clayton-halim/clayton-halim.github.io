import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_ORIGIN, SITE_TITLE } from '../consts';
import { assertUniqueLegacyPaths, sortPostsDescending } from '../utils/content';
import { parseLegacyDate } from '../utils/dates';
import { absoluteUrl } from '../utils/urls';

export async function GET(context) {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  assertUniqueLegacyPaths(entries);
  const posts = sortPostsDescending(entries);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? new URL(SITE_ORIGIN),
    customData: '<language>en-ca</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: parseLegacyDate(post.data.date),
      description: post.data.excerpt ?? post.data.title,
      link: absoluteUrl(post.data.legacyPath),
    })),
  });
}
