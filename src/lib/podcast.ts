// Henting og parsing av podcast-RSS frå Riverside.
// Denne feeden er den kanoniske kjelda: Apple og Spotify hentar frå same feed.
// Nye episodar dukkar opp automatisk (revalidering kvar time).

export const PODCAST_RSS_URL = "https://api.riverside.com/hosting/EUK44oLM.rss";

export type Episode = {
  id: string;
  title: string;
  description: string;
  pubDate: string | null;
  audioUrl: string | null;
  durationSeconds: number | null;
  durationLabel: string | null;
  episode: number | null;
  season: number | null;
};

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<\s*br\s*\/?\s*>/gi, " ")
      .replace(/<\/p>/gi, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function unwrapCdata(s: string): string {
  const m = s.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (m ? m[1] : s).trim();
}

function tagContent(block: string, tag: string): string | null {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  return m ? m[1] : null;
}

function attr(tagString: string, name: string): string | null {
  const m = tagString.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"));
  return m ? m[1] : null;
}

function parseDurationToSeconds(raw: string | null): number | null {
  if (!raw) return null;
  const t = raw.trim();
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  const parts = t.split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return null;
  let s = 0;
  for (const p of parts) s = s * 60 + p;
  return s;
}

function durationLabel(seconds: number | null): string | null {
  if (!seconds || seconds <= 0) return null;
  const min = Math.round(seconds / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} t ${m} min` : `${h} t`;
}

function parseItem(block: string): Episode {
  const rawTitle =
    tagContent(block, "itunes:title") ?? tagContent(block, "title") ?? "";
  const title = stripHtml(unwrapCdata(rawTitle)) || "Utan tittel";

  const rawDesc =
    tagContent(block, "description") ??
    tagContent(block, "itunes:summary") ??
    "";
  const description = stripHtml(unwrapCdata(rawDesc));

  const guid = stripHtml(unwrapCdata(tagContent(block, "guid") ?? "")) || title;

  const pubRaw = tagContent(block, "pubDate");
  let pubDate: string | null = null;
  if (pubRaw) {
    const d = new Date(pubRaw.trim());
    pubDate = Number.isNaN(d.getTime()) ? null : d.toISOString();
  }

  const encMatch = block.match(/<enclosure\b[^>]*\/?>/i);
  const audioUrl = encMatch ? attr(encMatch[0], "url") : null;

  const durationSeconds = parseDurationToSeconds(
    tagContent(block, "itunes:duration"),
  );

  const epRaw = tagContent(block, "itunes:episode");
  const seasonRaw = tagContent(block, "itunes:season");

  return {
    id: guid,
    title,
    description,
    pubDate,
    audioUrl,
    durationSeconds,
    durationLabel: durationLabel(durationSeconds),
    episode: epRaw ? parseInt(epRaw, 10) : null,
    season: seasonRaw ? parseInt(seasonRaw, 10) : null,
  };
}

export async function getEpisodes(limit?: number): Promise<Episode[]> {
  try {
    const res = await fetch(PODCAST_RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
    const episodes = blocks.map(parseItem).filter((e) => e.audioUrl);
    episodes.sort((a, b) => {
      const ta = a.pubDate ? Date.parse(a.pubDate) : 0;
      const tb = b.pubDate ? Date.parse(b.pubDate) : 0;
      return tb - ta;
    });
    return typeof limit === "number" ? episodes.slice(0, limit) : episodes;
  } catch {
    return [];
  }
}
