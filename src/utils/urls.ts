import { SITE_ORIGIN } from '../consts';

const LEGACY_PATH_PATTERN = /^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\.html$/;

export type LegacyPathParts = {
  year: string;
  month: string;
  day: string;
  slug: string;
};

export function splitLegacyPath(path: string): LegacyPathParts {
  const match = LEGACY_PATH_PATTERN.exec(path);
  if (!match) throw new Error(`Invalid legacyPath: ${path}`);
  const [, year, month, day, slug] = match;
  return { year, month, day, slug };
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).toString();
}
