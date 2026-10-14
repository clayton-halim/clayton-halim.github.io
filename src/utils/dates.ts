export const LEGACY_TIME_ZONE = 'America/Toronto';

const listDateFormatter = new Intl.DateTimeFormat('en-CA', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: LEGACY_TIME_ZONE,
});

const postDateFormatter = new Intl.DateTimeFormat('en-CA', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: LEGACY_TIME_ZONE,
});

function numericParts(date: Date): Record<string, number> {
  return Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      month: '2-digit',
      second: '2-digit',
      timeZone: LEGACY_TIME_ZONE,
      year: 'numeric',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  );
}

function parseNaiveTorontoDate(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new Error(`Invalid naive legacy date: ${value}`);

  const [, year, month, day, hour, minute, second] = match;
  const guess = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  );
  const localAtGuess = numericParts(new Date(guess));
  const interpretedAsUtc = Date.UTC(
    localAtGuess.year,
    localAtGuess.month - 1,
    localAtGuess.day,
    localAtGuess.hour,
    localAtGuess.minute,
    localAtGuess.second,
  );
  return new Date(guess - (interpretedAsUtc - guess));
}

export function parseLegacyDate(value: string): Date {
  const normalized = value.trim().replace(/\s+([+-])(\d{1,2})(\d{2})$/, ' $1$2:$3');
  const offsetMatch = /^(.*) ([+-]\d{2}:\d{2})$/.exec(normalized);
  if (offsetMatch) {
    const [, dateTime, offset] = offsetMatch;
    return new Date(`${dateTime.replace(' ', 'T')}${offset}`);
  }
  return parseNaiveTorontoDate(normalized);
}

export function formatListDate(value: string): string {
  return listDateFormatter.format(parseLegacyDate(value));
}

export function formatPostDate(value: string): string {
  return postDateFormatter.format(parseLegacyDate(value));
}
