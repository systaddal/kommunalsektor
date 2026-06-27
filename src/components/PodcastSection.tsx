import { type Episode, PODCAST_RSS_URL } from "@/lib/podcast";

type PodcastSettings = {
  label?: string;
  heading?: string;
  intro?: string;
  spotifyUrl?: string;
  appleUrl?: string;
};

const serif = {
  fontFamily: "var(--font-serif), 'Fraunces', serif",
  fontWeight: 400 as const,
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("nn-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PodcastSection({
  episodes,
  settings,
}: {
  episodes: Episode[];
  settings?: PodcastSettings;
}) {
  const label = settings?.label || "Podcast";
  const heading = settings?.heading || "Lytt til podcasten Samfunnsoppdraget";
  const intro =
    settings?.intro ||
    "Samtalar med ulike perspektiv om korleis ein best kan bidra til kommunane sitt samfunnsoppdrag. Nye episodar kjem automatisk.";
  const spotifyUrl =
    settings?.spotifyUrl || "https://open.spotify.com/show/033zfEoDsDQ30p0SrAv31v";
  const appleUrl =
    settings?.appleUrl ||
    "https://podcasts.apple.com/us/podcast/samfunnsoppdraget/id6780780479";

  return (
    <section id="podkast" className="border-t border-[rgba(28,28,26,0.09)]">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="max-w-[720px]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#2D4233] mb-4">
            {label}
          </p>
          <h2
            className="text-3xl sm:text-4xl tracking-tight mb-4 text-[#18251D]"
            style={serif}
          >
            {heading}
          </h2>
          <p className="text-[#43565A] text-base sm:text-lg leading-relaxed mb-8">
            {intro}
          </p>

          <div className="flex flex-wrap gap-2.5 mb-12">
            {spotifyUrl && (
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-medium bg-[#2D4233] text-white hover:bg-[#3A5240] transition-colors"
              >
                Spotify
              </a>
            )}
            {appleUrl && (
              <a
                href={appleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-medium bg-[#2D4233] text-white hover:bg-[#3A5240] transition-colors"
              >
                Apple Podcasts
              </a>
            )}
            <a
              href={PODCAST_RSS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-sm font-medium border border-[rgba(28,28,26,0.14)] text-[#18251D] hover:bg-[#D8E0D6] transition-colors"
            >
              RSS
            </a>
          </div>
        </div>

        {episodes.length > 0 ? (
          <div className="space-y-5">
            {episodes.map((ep) => (
              <article
                key={ep.id}
                className="border border-[rgba(28,28,26,0.09)] rounded-xl bg-[#FAF7EF] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6F7A73] mb-2">
                  {ep.episode != null && <span>Episode {ep.episode}</span>}
                  {formatDate(ep.pubDate) && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{formatDate(ep.pubDate)}</span>
                    </>
                  )}
                  {ep.durationLabel && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{ep.durationLabel}</span>
                    </>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#18251D] mb-2">
                  {ep.title}
                </h3>
                {ep.description && (
                  <p className="text-[#43565A] text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                    {ep.description}
                  </p>
                )}
                {ep.audioUrl && (
                  <audio controls preload="none" className="w-full mt-1">
                    <source src={ep.audioUrl} type="audio/mpeg" />
                    Nettlesaren din støttar ikkje lydavspeling.
                  </audio>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="text-[#43565A] text-base">
            Episodane er på veg. Abonner via lenkene over.
          </p>
        )}
      </div>
    </section>
  );
}
