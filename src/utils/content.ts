import type { CollectionEntry } from 'astro:content';
import { parseLegacyDate } from './dates';

export function assertUniqueLegacyPaths(posts: CollectionEntry<'blog'>[]): void {
  const seen = new Set<string>();
  for (const post of posts) {
    const path = post.data.legacyPath;
    if (seen.has(path)) throw new Error(`Duplicate legacyPath in blog content: ${path}`);
    seen.add(path);
  }
}

export function sortPostsDescending(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[] {
  return [...posts].sort((left, right) => {
    const rightTime = parseLegacyDate(right.data.date).getTime();
    const leftTime = parseLegacyDate(left.data.date).getTime();
    return rightTime - leftTime;
  });
}
