import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2D4233] text-white">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <svg
              width={32}
              height={41}
              viewBox="0 0 135 171"
              fill="currentColor"
              className="text-white/50 mb-4"
            >
              <path d="M135 0V62.6113C135 118.177 74.445 166.696 67.5 171C60.555 166.696 0.000299323 118.177 0 62.6113V0H135Z" />
            </svg>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Erfaringar og rammeverk for kommunar som vil gjere noko anna.
            </p>
            <p className="text-xs text-white/30 mt-5">
              Selseng &amp; Systaddal AS &middot; Sogndal
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">
              Sider
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#podkast" className="text-white/60 hover:text-white transition-colors">
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="/#framgangsmaate" className="text-white/60 hover:text-white transition-colors">
                  Framgangsmåte
                </Link>
              </li>
              <li>
                <Link href="/artiklar" className="text-white/60 hover:text-white transition-colors">
                  Artiklar
                </Link>
              </li>
              <li>
                <Link href="/fellesskap" className="text-white/60 hover:text-white transition-colors">
                  Fellesskap
                </Link>
              </li>
              <li>
                <Link href="/om" className="text-white/60 hover:text-white transition-colors">
                  Om oss
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">
              Kontakt
            </p>
            <p className="text-sm text-white/60">Helle Selseng</p>
            <p className="text-sm text-white/60 mt-1">Joakim Systaddal</p>
            <Link
              href="/#kontakt"
              className="inline-block mt-4 text-white/80 border border-white/20 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/10 transition-colors"
            >
              Send melding
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://www.selsengsystaddal.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/70 underline-offset-2 hover:underline transition-colors"
            >
              Selseng &amp; Systaddal AS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
