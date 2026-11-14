export type SubstackInnlegg = {
  tittel: string;
  lenke: string;
  dato: string | null;
  samandrag: string;
  bilete: string | null;
};

function reinsk(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function felt(item: string, namn: string): string {
  const m = item.match(new RegExp(`<${namn}[^>]*>([\\s\\S]*?)</${namn}>`, "i"));
  return m ? reinsk(m[1]) : "";
}

function kutt(s: string, maks: number): string {
  if (s.length <= maks) return s;
  const kappa = s.slice(0, maks);
  const siste = kappa.lastIndexOf(" ");
  return `${kappa.slice(0, siste > 40 ? siste : maks).trim()}…`;
}

// Forsidebiletet til innlegget ligg i <enclosure> i feeden.
function biletadresse(item: string): string | null {
  const m = item.match(/<enclosure[^>]*url="([^"]+)"[^>]*>/i);
  if (!m) return null;
  const adresse = m[1].replace(/&amp;/g, "&");
  return adresse.startsWith("https://") ? adresse : null;
}

/**
 * Hentar dei siste innlegga frå RSS-feeden til ein Substack.
 * Feilar mjukt: om Substack er nede eller svarar rart, får me ei tom liste
 * og seksjonen fell bort i staden for å velte sida.
 */
export async function hentSubstack(
  base: string | undefined,
  tal = 3,
): Promise<SubstackInnlegg[]> {
  if (!base) return [];
  const feed = `${base.replace(/\/+$/, "")}/feed`;

  try {
    const res = await fetch(feed, {
      headers: {
        "user-agent":
          "SelsengSystaddal-nettstad/1.0 (+https://selsengsystaddal.no)",
        accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const bitar = xml.split(/<item[\s>]/i).slice(1);

    return bitar.slice(0, tal).map((bit) => {
      const item = bit.split(/<\/item>/i)[0];
      const rå = item.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
      return {
        tittel: felt(item, "title"),
        lenke: felt(item, "link"),
        dato: felt(item, "pubDate") || null,
        samandrag: kutt(rå ? reinsk(rå[1]) : "", 150),
        bilete: biletadresse(item),
      };
    });
  } catch {
    return [];
  }
}

export function norskDato(rå: string | null): string | null {
  if (!rå) return null;
  const d = new Date(rå);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("nn-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
