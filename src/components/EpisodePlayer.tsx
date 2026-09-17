import type { Episode } from "@/lib/podcast";

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

export default function EpisodePlayer({
  episode,
  spotifyUrl,
  appleUrl,
}: {
  episode: Episode;
  spotifyUrl?: string | null;
  appleUrl?: string | null;
}) {
  const meta = [
    episode.episode != null ? `Episode ${episode.episode}` : null,
    formatDate(episode.pubDate),
    episode.durationLabel,
  ].filter(Boolean);

  return (
    <aside
      aria-label="Lytt til episoden"
      className="not-prose border border-[rgba(28,28,26,0.09)] rounded-xl bg-[#FAF7EF] p-6 sm:p-7 mb-10"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#2D4233] mb-2">
        Lytt til episoden · Samfunnsoppdraget
      </p>
      <h2
        className="text-xl sm:text-2xl tracking-tight text-[#18251D] mb-1 leading-snug"
        style={serif}
      >
        {episode.title}
      </h2>
      {meta.length > 0 && (
        <p className="text-xs text-[#6F7A73] mb-4">{meta.join(" · ")}</p>
      )}
      {episode.audioUrl && (
        <audio controls preload="none" className="w-full mb-4">
          <source src={episode.audioUrl} type="audio/mpeg" />
          Nettlesaren din støttar ikkje lydavspeling.
        </audio>
      )}
      {(spotifyUrl || appleUrl) && (
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-sm text-[#43565A] mr-1">Eller lytt i</span>
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
        </div>
      )}
    </aside>
  );
}
