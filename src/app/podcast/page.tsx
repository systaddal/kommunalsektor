import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PodcastSection from "@/components/PodcastSection";
import { client } from "@/sanity/lib/client";
import { getEpisodes } from "@/lib/podcast";

export const metadata = {
  title: "Podcast",
  description:
    "Alle episodane av Samfunnsoppdraget, podcasten frå KommunalSektor.no.",
};

// Alle episodane på éi side. Framsida viser berre dei fire siste.
export default async function PodcastSide() {
  const [episodes, settings] = await Promise.all([
    getEpisodes(),
    client.fetch(`*[_type == "podcastSettings"][0]`, {}, { next: { revalidate: 60 } }),
  ]);

  return (
    <div className="min-h-screen">
      <Nav />
      <PodcastSection episodes={episodes} settings={settings ?? undefined} />
      <Footer />
    </div>
  );
}
