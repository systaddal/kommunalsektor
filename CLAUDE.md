# kommunalsektor.no og selsengsystaddal.no

## Fakta

| Kva | Verdi |
|---|---|
| Domene | kommunalsektor.no (rot `/`) og selsengsystaddal.no (`/ss`, via middleware) i same app |
| Vercel | `kommunalsektor` (`prj_BVNtgRoPZvZCp7vj2OG1fzB5YddQ`) |
| Sanity | prosjekt `yj3rhknx`, dataset `production`. Studio på `/studio` med to workspaces: `kommunalsektor` og `selsengsystaddal` |
| Stack | Next 16, React 19, Tailwind 4, Sanity 5, styled-components, TypeScript |

## Dette må du vite

- README er standardteksten frå create-next-app. `STILGUIDE.md` er designregelverket. Les han før du endrar utsjånad.
- **Innhald** (tekst og bilete) blir endra i Sanity, ikkje i koden. Kode berre for design, nye sider og ny funksjonalitet.
- To merkevarer: rot `/` er KommunalSektor, `/ss` er Selseng & Systaddal med eigen palett (rotgrøn `#314D3C`, varm krem `#F6F1E8`, djup jord `#2F2B26`, terrakotta `#A65F3D` berre som handlingsaksent). Unngå rein svart og kvit på `/ss`.
- Framsida til `/ss` er brei (`max-w-6xl`) frå november 2026. Undersidene held den smale spalta (`max-w-3xl`). Éi breidd per side. Nav og botnfelt følgjer breidda på sida dei står på.
- Bileta på framsida (opningsbilete, landskapsbilete, portrett) ligg i fana «Bilete» på `ssHomepage` i Sanity. Alle er valfrie: står eit felt tomt, fell biletet bort og sida ordnar seg utan. Portretta i bolken Folka lenkjer til `/ss/folk`. Utan lenkje gjer dei ingen jobb.
- Rørsla på framsida er rein CSS, slått på av `SSSynleg`. Ho er roleg med vilje, og står stille for dei som har bede om mindre rørsle. Ikkje legg til animasjonsbibliotek utan grunn.
- Framsida til kommunalsektor.no (`src/app/page.tsx`) er redaksjonell frå november 2026: siste sak står i opninga og skifter ved kvar publisering, dei fem neste står i avisoppsett, og podkasten viser dei fire siste episodane på mørk grøn flate med éin felles avspelar (`PodcastSpelar`). Alle episodane ligg på `/podcast`.
- Podkastfeeden har berre omslaget til podkasten, ikkje bilete per episode. Datoar til klientkomponentar blir skrivne på serveren, fordi ikkje alle nettlesarar kan nynorske månadsnamn.
- `src/app/ss/layout.tsx` set eigen tittelmal (`absolute` + `template`) så fanetittelen ikkje arvar «— KommunalSektor».
- Lenkjer internt i `/ss` går gjennom `SSLenke`, som handterer domeneomskrivinga.
- Sanity MCP kan ikkje laste opp binære bilete. Bilete går via `/studio`.
- `create_documents` lagar kladdar. Hugs `publish_documents` etterpå.
- Kontaktskjemaet sender til HubSpot (portal 147587677, EU).
- **Next.js 16:** les rettleiinga i `node_modules/next/dist/docs/` før du skriv ny kode. API-et har endra seg sidan treningsdata.

## Felles for alle S&S-repo

- **Språk:** kode, kommentarar, commit-meldingar og tekst i grensesnittet på moderne nynorsk, med «me». Unntak: tekst der Helle er avsendar, og Medledelse, skal vere på bokmål.
- **Nøklar:** aldri i repoet, i filer, i minnet eller i Notion. Dei ligg i Vercel (miljøvariablar) og Bitwarden. Skriv berre `[i Bitwarden: <post>]` der det trengst ein peikar.
- **Git:** jobb på ei grein og opne PR mot `main`, med mindre Joakim har gjeve ståande løyve til push rett på `main` for dette repoet. Repoet er kopla direkte til Claude-økta med skrivetilgang, så push og PR går herfrå. Den gamle omvegen med patch og PowerShell-skript på studio-pc er avvikla. Ikkje bruk han.
- **Deploy:** Vercel-teamet `SelsengSystaddal` (`team_WdM3gUsRyMlTXzn6OxrI4C7m`) byggjer automatisk frå `main`. Følg bygget med Vercel-koplinga til det står `READY` før du seier at noko er ute.
- **Før du endrar:** køyr `npm install` og `npx next build` (kvar for seg, med lang tidsfrist). Rett feil før push.
- **Database:** reglar ligg i databasen (RLS og `SECURITY DEFINER`-funksjonar), ikkje i nettlesaren. Nye migrasjonar skal liggje i repoet òg, ikkje berre i Supabase.
- **Dokumentasjon:** kvart bygg har ei teknisk side under «Eigne bygg» i Notion (Teknisk infrastruktur). Endrar du korleis noko heng saman, oppdater sida. Kartet over heile systemet er Notion-sida «S&S OS».
- **Spør før** du slettar data, endrar skjema i produksjon, endrar domene eller sender noko til kundar.
