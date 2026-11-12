import Link from "next/link";
import { GameEmbed } from "./GameEmbed";
import { ScrollFilm } from "./ScrollFilm";

// La fiche SPICY AIRPORT, faite a la main sur le modele du Jardin des Lucioles
// et de THE WALL : ici ce n'est pas une page de vente mais la presentation du
// projet artistique, dans tous ses aspects. Sources : le depot spicy-airport
// (README, docs/live/PLAN.md, docs/club, docs/flight) et l'article de Magnetic
// Magazine du 05/11/2026. Toutes les images sont l'app reelle, capturee en
// temps reel ; les films sont les reels SOFI AIRLINES tournes dedans, muets.
// Medias maitres : Clients/Sofien Ben Abdallah/SOFI_AIRLINES/PAGE_SPICY_AIRPORT_fmrxr.com.

const H2 = "fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg";
const KICK = "text-[11px] uppercase tracking-[0.15em] text-fmaccent";
const SECTION = "mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24";
const BODY = "fm-grotesk text-[16px] leading-relaxed text-fmfg/80";

const M = "/spicy-airport";
const img = (name: string) => `${M}/${name}.webp`;
const ARTICLE = "https://magneticmag.com/2026/11/how-it-was-made-spicy-sofis-sofi-airlines-live-setup-progressive-house-electro/";

function Shot({ name, alt, caption, className = "", tall = false }: { name: string; alt: string; caption?: string; className?: string; tall?: boolean }) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(name)} alt={alt} loading="lazy" className={`w-full rounded-xl border border-fmborder bg-black object-cover ${tall ? "aspect-[9/16]" : ""}`} />
      {caption && <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fmmuted">{caption}</figcaption>}
    </figure>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {items.map((t) => (
        <li key={t} className="fm-grotesk flex gap-3 text-[15px] leading-relaxed text-fmfg/80">
          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-fmaccent" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Cards({ items, cols = "md:grid-cols-3" }: { items: [string, string][]; cols?: string }) {
  return (
    <div className={`mt-10 grid gap-6 ${cols}`}>
      {items.map(([k, v]) => (
        <div key={k} className="rounded-xl border border-fmborder bg-fmcard p-6">
          <p className="fm-display text-xl text-fmfg">{k}</p>
          <p className="fm-grotesk mt-3 text-[15px] leading-relaxed text-fmfg/75">{v}</p>
        </div>
      ))}
    </div>
  );
}

/** Le chemin d'un geste : le cockpit de Sofi, le bus signe, la salle qui calcule son image, la tour qui joue sur le temps. */
function LiveChain() {
  const boxes: [string, string, number, number][] = [
    ["SPICY COCKPIT", "Spicy Sofi · Paris", 20, 40],
    ["SHOW BUS", "signed data only", 330, 40],
    ["THE STAGE", "renders the world", 640, 40],
    ["FMRXR TOWER", "Haïfa · Tunis", 330, 190],
  ];
  return (
    <svg viewBox="0 0 880 290" className="w-full" role="img" aria-label="Spicy Sofi's cockpit sends gestures and music data over a signed bus. The stage renders the world itself. FMRXR TOWER sends intents that land on the beat.">
      <g fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="1.5">
        {boxes.map(([t, s, x, y]) => (
          <g key={t} transform={`translate(${x} ${y})`}>
            <rect width="220" height="80" rx="12" fill="none" stroke={t === "SHOW BUS" ? "var(--color-fmaccent)" : "currentColor"} strokeOpacity=".5" />
            <text x="110" y="36" textAnchor="middle" fill="currentColor">{t}</text>
            <text x="110" y="58" textAnchor="middle" fill="currentColor" fillOpacity=".55" fontSize="11">{s}</text>
          </g>
        ))}
        <path d="M240 80 H326 M550 80 H636" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.5" markerEnd="url(#sa-arrow)" />
        <path d="M440 186 V124" stroke="var(--color-fmaccent)" strokeOpacity=".7" strokeWidth="1.5" markerEnd="url(#sa-arrow)" />
        <text x="283" y="68" textAnchor="middle" fill="currentColor" fillOpacity=".55" fontSize="10">GESTURES</text>
        <text x="593" y="68" textAnchor="middle" fill="currentColor" fillOpacity=".55" fontSize="10">~25 MSG/S</text>
        <text x="452" y="160" fill="currentColor" fillOpacity=".55" fontSize="10">INTENTS · NOW · BEAT · BAR · 8 BARS</text>
        <text x="750" y="225" textAnchor="middle" fill="currentColor" fillOpacity=".55" fontSize="10">NO VIDEO CROSSES</text>
        <text x="750" y="243" textAnchor="middle" fill="currentColor" fillOpacity=".55" fontSize="10">THE MEDITERRANEAN</text>
      </g>
      <defs>
        <marker id="sa-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="currentColor" fillOpacity=".6" />
        </marker>
      </defs>
    </svg>
  );
}

// Ce que chaque commande du cockpit fait dans le monde. Cote son : l'article.
// Cote image : docs/live/PLAN.md (« ou ca se branche dans l'app »).
const COCKPIT: [string, string, string][] = [
  ["Airbus sidestick", "Bends the loops on two axes, launches and swaps them.", "Flies the aircraft: its attitude follows the stick, and the stick in the virtual booth moves with Sofi’s hand."],
  ["Thrust levers", "Long-throw faders on filter, resonance, drive and detune.", "Spools both engines and climbs the aircraft. A push in cruise is never read as a take-off."],
  ["Boeing 737 overhead", "Launches and mutes tracks, arms effects, fires scenes. Annunciators light on warning stems.", "Flight events become camera sequences in the world."],
  ["Spicy Radar", "The touch flight deck: AIRWAY scenes by flight phase, ENGINE, FUEL, ANC announcements, JAM.", "The flight phase sets the world: at the stand, on the runway, airborne. Announcements reach the screen as a PA band."],
  ["Song and scene", "Ableton’s set, read live: song, mood, section, energy.", "Each song has its colour; scene names direct the camera."],
];

// Mesures du depot (README, PLAN.md) et chiffres de l'article.
const CHIFFRES: [string, string][] = [
  ["1,650", "aerofoils in the turbofan, drawn as about thirty instanced meshes"],
  ["0.000 m", "drift after any number of exploded-view cycles"],
  ["9,000", "airflow particles, one draw call, moved on the GPU"],
  ["20", "arrondissements of Paris, rebuilt from OpenStreetMap"],
  ["15 · 132", "songs and scenes in the set, read by name, never by index"],
  ["8 / s", "snapshots of the world published by the stage"],
  ["30 / s", "beat clock sent to TouchDesigner, from a worker’s clock"],
  ["138 ms", "round trip from the tower to the stage, measured in test"],
  ["2 / 2", "forged commands rejected in test, nothing executed"],
  ["4", "cameras in one WebGL context for the VJ grid"],
];

const REELS: [string, string, string][] = [
  ["02", "The engine", "Through the fan at take-off power."],
  ["06", "Sidestick", "The stick moves with the sound, the aircraft circles the tower."],
  ["07", "Loss of control", "CYBER weather at its maximum, a full roll over Paris."],
  ["10", "Line up", "Runway, thrust, rotation."],
  ["12", "Turbulence", "The BRACE storm at full strength."],
  ["13", "Welcome aboard", "Every compartment, tail to nose, then out through the windscreen."],
];

export function SpicyAirportLanding({ embed }: { embed: { url: string; poster: string } }) {
  return (
    <>
      {/* 1. Le propos, puis l'image */}
      <section className="mx-auto max-w-[1200px] px-5 pb-10 pt-12 md:px-8 md:pt-16">
        <Link href="/projects" className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted">← Work</Link>
        <p className={`${KICK} mt-8`}>SPICY AIRPORT · SOFI AIRLINES × FMRXR Studio · 2026</p>
        <h1 className="fm-display mt-4 max-w-5xl text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] text-fmfg">
          An airport, an aircraft and a city, flown live from a DJ’s <span className="text-fmaccent">cockpit</span>.
        </h1>
        <p className={`${BODY} mt-6 max-w-2xl`}>
          SPICY AIRPORT is the world of SOFI AIRLINES, the live set Spicy Sofi plays on real aircraft controls. A
          real-time 3D world that runs in a browser: a turbofan you can take apart, an airliner whose cabin is a club,
          a control tower where the visuals are played, and Paris rebuilt street by street underneath. During the set,
          every gesture on the cockpit moves the aircraft, the music directs the camera, and the picture is played
          live from another country.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#try" data-cta="spicy-airport-try-hero" className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
            Enter SPICY AIRPORT
          </a>
          <a href={ARTICLE} target="_blank" rel="noopener" data-cta="spicy-airport-press-hero" className="rounded-full border border-fmborder px-6 py-3 text-sm text-fmfg/85 transition hover:border-fmfg/50">
            Read the Magnetic Magazine story
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img("tower")} alt="Inside FMRXR TOWER: the VJ desk under a wall of live feeds, Paris at night outside" className="w-full rounded-xl border border-fmborder bg-black" />
        <p className="mt-3 text-[12px] text-fmmuted">Inside FMRXR TOWER, where the visuals are played. Every image on this page is the real world, captured in real time.</p>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-5 md:px-8">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Played, not played back", "No timeline: gesture first, music second"],
            ["Two cities, one booth", "Paris plays the music, Tunis plays the world"],
            ["A whole world", "Engine, aircraft, club, tower, Paris"],
            ["In any browser", "No install, on fmrxr.com"],
          ].map(([k, v]) => (
            <li key={k} className="bg-fmbg p-4">
              <p className="fm-display text-sm text-fmfg">{k}</p>
              <p className="fm-grotesk mt-1 text-[13px] text-fmmuted">{v}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Le projet artistique */}
      <section className={`${SECTION} mt-20`}>
        <p className={KICK}>The idea</p>
        <h2 className={H2}>The instrument is an aircraft. So the stage became one.</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className={BODY}>
            <p>
              Spicy Sofi performs SOFI AIRLINES from a cockpit: a rebuilt Boeing 737 overhead panel, an Airbus throttle
              quadrant and sidestick, a radio panel, a touch flight deck. The set is written as a flight, from boarding
              to landing, in progressive house, electro, acid and breakbeat. An instrument shaped like an aircraft asked
              for a world shaped like one.
            </p>
            <p className="mt-5">
              SPICY AIRPORT is not a film made for the music. Nothing in it is pre-rendered and nothing is scheduled on a
              timeline. The world is generated from the performance itself: the pilot’s hands, the structure of the
              music, the visual artist’s cues. On 22 October Haïfa put the principle to Sofi in one sentence: the visuals
              would no longer analyse only the music, they would analyse his movements and the feel of his movements,
              and the music on top.
            </p>
            <p className="mt-5">
              The test that decides everything comes from Sofi’s own roadmap: watching the DJ and the projection
              together, does the room understand at once that the controls move the aircraft?
            </p>
          </div>
          <blockquote className="self-start rounded-xl border border-fmborder bg-fmcard p-8">
            <p className="fm-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-fmfg">“Sofi sends data, I send a world back.”</p>
            <footer className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-fmmuted">
              Haïfa Becheikh, FMRXR Studio · <a href={ARTICLE} target="_blank" rel="noopener" className="fm-link">Magnetic Magazine, Nov 2026</a>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 3. Le moteur */}
      <section className={SECTION}>
        <p className={KICK}>Stand A07 · the engine</p>
        <div className="mt-3 grid items-center gap-10 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <h2 className={H2}>It began with a turbofan you can take apart</h2>
            <p className={`${BODY} mt-5`}>
              Flight SPICY 1 waits at stand A07, at dusk. Under its wing hangs a high-bypass turbofan built part by part
              in code, with no imported model: start it, open it, explode it, put it back together, follow the guided run
              through its four strokes, suck, squeeze, bang, blow, narrated as cabin announcements.
            </p>
            <Bullets items={[
              "A fan 1.60 m across with 22 wide-chord blades, three booster and nine compressor stages, an annular combustor with 20 nozzles, one high- and four low-pressure turbine stages on two counter-rotating shafts.",
              "One chain, one direction: input, control state, engine state, picture. Nothing on screen is wired to a button, so a mouse, a key or a real thrust lever drive it the same way.",
              "The exploded view only ever interpolates between two exact positions: cycled any number of times, it comes back to the millimetre.",
              "At take-off the fan turns about 87 times a second, far beyond what a screen can show. The blades are slowed on screen, the ratio between the two spools kept exact, and the instruments report the true speed.",
            ]} />
          </div>
          <Shot name="engine-exploded" alt="The turbofan in exploded view, every part labelled, under the SOFI AIRLINES wing" caption="Exploded view, readability mode" />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Shot name="stand-a07" alt="The SOFI AIRLINES aircraft at stand A07 at dusk, with the app's flight deck panel" caption="Stand A07 · the app" />
          <Shot name="engine-run" alt="The engine running, airflow particles entering the fan" caption="Engine running · airflow" />
          <Shot name="engine-cutaway" alt="The cowls dissolved, the mechanism lit inside" caption="Cutaway" />
        </div>
      </section>

      {/* 4. Le club dans la cabine */}
      <section className={SECTION}>
        <p className={KICK}>The cabin</p>
        <div className="mt-3 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className={H2}>A club in the fuselage</h2>
            <p className={`${BODY} mt-5`}>
              Inside the airliner, the cabin floor, 25.8 m long and 2.31 m wide, is the dance floor of an electronic club.
              It is drawn as a venue that could be built, not as a backdrop.
            </p>
            <Bullets items={[
              "The DJ booth follows the technical rider Spicy Sofi publishes, machine for machine. The DJ’s hardware is never moved: only the tables are dressed, in an LED skin.",
              "The lights are real fixtures a grandMA2 console can run, patched on their official DMX charts. The laser hangs from the ceiling, fires down in vertical fans and is written phrase by phrase, every 32 bars.",
              "Each song has its colour, and the moods change the room. A bar, the rear of the cabin, the lavatories: every corner has its own view.",
              "A FEWER FLASHES switch cuts the strobes and the white laser flashes. Without it, flashes stay capped at three per second.",
            ]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Shot name="reel-booth" alt="The SOFI AIRLINES DJ booth in the cabin, under moving heads" caption="The booth, from the dance floor" tall />
            <Shot name="reel-fpv" alt="Flying through the cabin toward the booth, fisheye" caption="The booth, fisheye" tall />
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Shot name="club-dj-view" alt="The club from behind the decks: moving heads, beams and the sidestick in the booth" caption="From the decks" />
          <Shot name="club-laser" alt="The ceiling laser firing green and blue fans down the cabin" caption="The laser, from the rear" />
          <Shot name="club-bar" alt="The cabin bar, backlit pink shelves of bottles" caption="The bar" />
        </div>
      </section>

      {/* 5. Paris */}
      <section className={SECTION}>
        <p className={KICK}>The city</p>
        <div className="mt-3 grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
          <Shot name="paris-11e" alt="The aircraft over the 11th arrondissement at dusk, with its primary flight display" caption="Overflying Paris · 11th arrondissement" className="order-last lg:order-first" />
          <div>
            <h2 className={H2}>Paris underneath, street by street</h2>
            <p className={`${BODY} mt-5`}>
              Take off and the whole city is there, rebuilt from OpenStreetMap: the boulevards, the Seine and its quays,
              the monuments, the Eiffel Tower, all twenty arrondissements, and the venues of the Morninglory collective,
              Le Son de la Terre among them as its own model.
            </p>
            <Bullets items={[
              "The aircraft flies on forces published for its type and an Airbus-style normal law, with a full primary flight display.",
              "An autopilot tours the boulevards and the Seine, or flies DIRECT TO any monument or venue and circles it.",
              "Every view has its own link, from the club’s bar to an orbit of the Eiffel Tower.",
            ]} />
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-[1.4fr_1fr_1fr]">
          <Shot name="paris-escort" alt="The aircraft banking over Paris at dusk" caption="Escort camera over Paris" />
          <Shot name="reel-eiffel" alt="The aircraft passing the Eiffel Tower in a storm" caption="The Eiffel Tower, in the BRACE storm" tall />
          <Shot name="reel-tumble" alt="The aircraft rolling over Paris, loss of control" caption="Loss of control" tall />
        </div>
      </section>

      {/* 6. Le cockpit fait voler l'avion */}
      <section className={SECTION}>
        <p className={KICK}>The cockpit</p>
        <div className="mt-3 grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className={H2}>Every control plays twice</h2>
            <p className={`${BODY} mt-5 max-w-2xl`}>
              Sofi’s cockpit drives Ableton Live and publishes what it does as a stream of events: the stick, the levers,
              the switches, the scenes, the flight phase. The same gesture shapes the sound and flies the world.
            </p>
            <div className="mt-8 overflow-hidden rounded-xl border border-fmborder">
              <div className="hidden grid-cols-[150px_1fr_1fr] gap-4 border-b border-fmborder bg-fmcard px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-fmmuted md:grid">
                <span>Control</span><span>In the music</span><span>In the world</span>
              </div>
              {COCKPIT.map(([k, a, b]) => (
                <div key={k} className="grid gap-2 border-b border-fmborder px-5 py-4 last:border-0 md:grid-cols-[150px_1fr_1fr] md:gap-4">
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-fmaccent">{k}</p>
                  <p className="fm-grotesk text-[14px] leading-relaxed text-fmfg/80">{a}</p>
                  <p className="fm-grotesk text-[14px] leading-relaxed text-fmfg/80">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-fmmuted">The cockpit hardware and the sound are Spicy Sofi’s, described in detail in Magnetic Magazine.</p>
          </div>
          <Shot name="reel-stick" alt="Macro on the sidestick, lit pink, moving with the sound" caption="The sidestick, moving with the sound" tall />
        </div>
      </section>

      {/* 7. Deux pays, un booth */}
      <section className={SECTION}>
        <p className={KICK}>The live</p>
        <h2 className={H2}>Two countries, one booth</h2>
        <p className={`${BODY} mt-5 max-w-3xl`}>
          Sofi plays in Paris, Haïfa plays the visuals from Tunis. No video crosses the Mediterranean: only performance
          data travels, about 25 signed messages a second, and the projection in the room renders its own world. Three
          spaces share it: the stage, which flies the show and is its authority; SPICY DJ BOOTH, Sofi’s view on a tablet
          beside the decks; and FMRXR TOWER, where the picture is played.
        </p>
        <div className="mt-10 rounded-xl border border-fmborder bg-fmcard p-6 text-fmfg md:p-10"><LiveChain /></div>
        <Cards items={[
          ["Cues land on the music", "A press in the tower is not an order, it is a request with a grid: NOW, BEAT, BAR or 8 BARS. The stage executes it on the beat it names, so the internet between two cities disappears into the music."],
          ["The clock is the cockpit’s", "Time is anchored on when each message left the cockpit, not on when it arrived. The offset comes from the fastest message of the last twelve seconds, so network jitter is removed rather than averaged, and the remaining delay is tapped out at soundcheck: eight taps on the beat, eight on a flash."],
          ["Only the show can drive the show", "Access codes are checked by the server and every command is signed. Anyone who finds the channel can watch, nothing more."],
        ]} />
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
          <Shot name="tower-console" alt="The FMRXR TOWER console over the world, the aircraft lined up on the runway" caption="FMRXR TOWER · the VJ console" />
          <div>
            <h3 className="fm-display text-[clamp(1.4rem,2.6vw,2rem)] text-fmfg">FMRXR TOWER</h3>
            <p className={`${BODY} mt-4`}>
              The visual artist’s console. Pick a shot, hold it, black out, fly the escort drone, call the weather, from
              light turbulence to BRACE and an unusual attitude, then recover. Short cues go to the booth and back.
            </p>
            <Bullets items={[
              "Each camera of the world goes out in Full HD into TouchDesigner, into the FMRXR TDMixer, where Haïfa layers her own generative GLSL effects.",
              "A beat clock reaches TouchDesigner 30 times a second, so every effect locks to the tempo.",
              "A twin mixer runs in Paris beside the projector, kept in step with Tunis by FMRXR BordersSync.",
            ]} />
          </div>
        </div>
      </section>

      {/* 8. La musique realise */}
      <section className={SECTION}>
        <p className={KICK}>The music directs</p>
        <h2 className={H2}>Scene names become camera moves</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>
          The set’s structure is read by name. When a scene called DROP starts, the lens pushes in and the aperture opens;
          a BREAK pulls focus out and back; a BUILD UP slowly tightens the frame. An auto director cuts between the escort
          drone, the cabin, the wing and the chase cameras, and only ever cuts on a change in the music.
        </p>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Boarding", "Ambient textures, cabin announcements, the overhead waking system by system."],
            ["Taxi · take-off", "First kick, throttles forward, progressive house."],
            ["Cruise", "Deeper grooves, long reverbs, live traffic on the Flight Wall."],
            ["Turbulence", "Acid and breakbeat, warning stems on the annunciators."],
            ["Descent · landing", "The energy drops, the panel goes dark light by light."],
          ].map(([k, v], i) => (
            <li key={k} className="bg-fmbg p-4">
              <p className="font-mono text-[11px] text-fmaccent">{String(i + 1).padStart(2, "0")}</p>
              <p className="fm-display mt-2 text-[15px] text-fmfg">{k}</p>
              <p className="fm-grotesk mt-1 text-[13px] leading-relaxed text-fmmuted">{v}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[13px] text-fmmuted">A set runs 45 minutes to an hour, written as one flight.</p>
      </section>

      {/* 9. Filme dedans */}
      <section className={SECTION}>
        <p className={KICK}>Filmed inside</p>
        <h2 className={H2}>Reels shot in the world, cut on the sound</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>
          The same app is also a film set. A director built into it shoots vertical reels for SOFI AIRLINES, one per sound
          of the set: fisheye, crash zooms, focus pulls, a console look that bites on the big kicks, cameras mounted on the
          airframe, and flight paths written to pass the Eiffel Tower. Every cut falls on the structure of the track.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {REELS.map(([n, t, line]) => (
            <figure key={n}>
              <ScrollFilm src={`${M}/reel-${n}.mp4`} poster={`${M}/reel-${n}.jpg`} label={`SOFI AIRLINES reel: ${t}`} sound={false} className="" aspect="aspect-[9/16]" />
              <figcaption className="mt-2">
                <p className="fm-display text-[15px] text-fmfg">{t}</p>
                <p className="fm-grotesk mt-1 text-[13px] leading-relaxed text-fmmuted">{line}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-fmmuted">Shown muted. In the reels, the music is SOFI AIRLINES by Spicy Sofi.</p>
      </section>

      {/* 10. Sous le capot */}
      <section className={SECTION}>
        <p className={KICK}>Under the hood</p>
        <h2 className={H2}>A world that holds under live conditions</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>
          Three.js, TypeScript and WebGL in a browser, TouchDesigner and Ableton Live around it. Everything loads behind
          an opening screen, the quality steps down on its own when the frame rate drops, and a laptop GPU gets a lighter
          feed. Measured in the running app:
        </p>
        <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-5">
          {CHIFFRES.map(([n, t]) => (
            <div key={t} className="bg-fmbg p-5">
              <dt className="fm-display text-[clamp(1.6rem,2.6vw,2.2rem)] text-fmaccent">{n}</dt>
              <dd className="fm-grotesk mt-2 text-[13px] leading-snug text-fmfg/75">{t}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <h3 className="fm-display text-[clamp(1.4rem,2.6vw,2rem)] text-fmfg">The house style</h3>
            <p className={`${BODY} mt-4`}>
              Nothing in the identity is invented. The palette, the type and the sixteen flight phases come from the
              SOFI AIRLINES brief: a night-avionics register, instrument amber, green and blue on near black, and the
              carrier’s magenta for everything live. The thrust lever reads the phases as it advances, from BOARDING to
              SPICY 3.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["#FFB347", "#57FF9A", "#63B3FF", "#FF4FA3", "#07090D"].map((c) => (
                <span key={c} className="flex items-center gap-2 rounded-full border border-fmborder px-3 py-1.5 font-mono text-[11px] text-fmfg/80">
                  <span className="h-3 w-3 rounded-full border border-fmborder" style={{ background: c }} />{c}
                </span>
              ))}
            </div>
          </div>
          <Shot name="loading" alt="The FMRXR// opening screen while the world is generated" caption="The opening screen, while the world is generated" />
        </div>
      </section>

      {/* 11. Essayer */}
      <section id="try" className={SECTION}>
        <p className={KICK}>Try it</p>
        <h2 className={H2}>Enter SPICY AIRPORT</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>
          The world itself, running in this page. Start the engine, open it, walk into the club, take off over Paris.
          Best on a computer; the first load takes a moment.
        </p>
        <div className="mt-10"><GameEmbed url={embed.url} poster={embed.poster} title="SPICY AIRPORT" label="Start the engine" /></div>
        <p className="mt-3 text-[12px] text-fmmuted">Music: SPICY HOT! by Spicy Sofi, used with permission. Paris: © OpenStreetMap contributors (ODbL).</p>
      </section>

      {/* 12. Credits */}
      <section className={SECTION}>
        <p className={KICK}>Credits</p>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2">
          {[
            ["Concept, art direction, real-time world, live visuals", "FMRXR Studio · Haïfa Becheikh"],
            ["SOFI AIRLINES, music, cockpit and data feed", "Spicy Sofi"],
            ["Flight Wall", "The Flight Wall, partner"],
            ["Press", "“How It Was Made: Spicy Sofi’s SOFI AIRLINES Live Setup”, Will Vance, Magnetic Magazine, 5 November 2026"],
          ].map(([k, v]) => (
            <div key={k} className="bg-fmbg p-5">
              <dt className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">{k}</dt>
              <dd className="fm-grotesk mt-1 text-[15px] text-fmfg">{k === "Press" ? <a href={ARTICLE} target="_blank" rel="noopener" className="fm-link">{v}</a> : v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-24 text-center md:px-8 md:py-32">
        <h2 className="fm-display text-[clamp(2rem,5vw,3.6rem)] text-fmfg">A world for your live set.</h2>
        <Link href="/start?industry=music&service=real-time-systems&ref=spicy-airport" data-cta="project_similar"
          className="mt-8 inline-block rounded-full bg-fmfg px-7 py-3.5 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
          Discuss a similar project
        </Link>
      </section>
    </>
  );
}
