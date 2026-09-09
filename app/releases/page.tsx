import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import CosmicBackground from "../components/CosmicBackground";

export const metadata: Metadata = {
  title: "Releases · Melodash",
  description:
    "Every released version of Melodash for macOS, with direct downloads.",
};

type Release = {
  version: string;
  build: string;
  pubDate: string;
  minimumSystemVersion: string;
  url: string;
  bytes: number;
  notes: string | null;
};

/**
 * Reads the Sparkle appcast that the app itself checks for updates.
 *
 * Deliberately the same file rather than a hand-kept list: the appcast is
 * generated and signed by scripts/release.sh in the app repo, so a release can
 * never appear here without actually being downloadable, and this page needs no
 * edit when a new version ships.
 *
 * Runs at build time only — the appcast changes when the site is redeployed
 * with a new DMG, never in between.
 */
function readReleases(): Release[] {
  const file = path.join(process.cwd(), "public", "appcast.xml");

  let xml: string;
  try {
    xml = fs.readFileSync(file, "utf8");
  } catch {
    // A missing appcast means the site was deployed without a release. Render
    // the empty state rather than failing the build.
    return [];
  }

  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  const releases = items.map((item): Release | null => {
    const tag = (name: string) =>
      item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1]?.trim() ??
      null;
    const attr = (name: string) =>
      item.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? null;

    const url = attr("url");
    if (!url) return null; // an item with no enclosure is not downloadable

    return {
      version:
        tag("sparkle:shortVersionString") ?? tag("title") ?? "Unknown",
      build: tag("sparkle:version") ?? "",
      pubDate: tag("pubDate") ?? "",
      minimumSystemVersion: tag("sparkle:minimumSystemVersion") ?? "",
      url,
      bytes: Number(attr("length") ?? 0),
      notes: tag("description"),
    };
  });

  return (releases.filter(Boolean) as Release[]).sort(
    // Newest first. Sparkle's build number is the ordering it uses itself.
    (a, b) => Number(b.build) - Number(a.build),
  );
}

/** "Wed, 09 Sep 2026 13:26:57 +0800" -> "9 September 2026" */
function formatDate(pubDate: string): string {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return "";
  // Fixed locale and UTC: this renders at build time, and a machine-dependent
  // format would make the output vary between deploys.
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatSize(bytes: number): string {
  if (!bytes) return "";
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

export default function Releases() {
  const releases = readReleases();
  const latest = releases[0];

  return (
    <div className="relative min-h-screen text-[#eef1ff] overflow-x-hidden font-sans flex flex-col">
      <CosmicBackground starDensity={60} />

      {/* ============ STICKY NAV ============ */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between gap-[18px] backdrop-blur-[10px] bg-[#04071a]/55 border-b border-[rgba(61,217,255,0.16)]"
        style={{ padding: "14px clamp(18px, 4vw, 54px)" }}
      >
        <a href="/" className="flex items-center gap-3 text-white no-underline">
          <img
            src="/assets/appicon.png"
            alt="Melodash"
            className="w-[42px] h-[42px] rounded-[11px]"
            style={{ boxShadow: "0 0 18px rgba(61,217,255,0.4)" }}
          />
          <span className="font-family-orbitron font-black text-xl tracking-[1px]">
            MELODASH
          </span>
        </a>
        <div className="flex items-center gap-[clamp(12px,2.2vw,32px)] justify-end">
          <a
            href="/"
            style={{ color: "#b9c4ec", fontWeight: 500, fontSize: "14.5px" }}
            className="hover:text-[var(--cyan)] transition-colors no-underline"
          >
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* ============ CONTENT AREA ============ */}
      <main className="relative z-10 flex-1 py-16 px-[clamp(18px,4vw,54px)] max-w-[840px] mx-auto w-full">
        <div className="mb-10">
          <h1 className="font-family-orbitron font-black text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyan)] via-white to-[var(--violet)] tracking-[1px] mb-3">
            RELEASES
          </h1>
          <p className="text-[#b9c4ec] leading-relaxed text-sm md:text-base max-w-[560px]">
            Every version of Melodash, newest first. Installed copies update
            themselves — you only need this page for a fresh install, or to go
            back to an older build.
          </p>
        </div>

        {releases.length === 0 ? (
          <div
            className="rounded-3xl p-8 border border-[rgba(61,217,255,0.14)] text-[#b9c4ec]"
            style={{ background: "rgba(4, 7, 26, 0.65)" }}
          >
            No releases published yet.
          </div>
        ) : (
          <ul className="list-none p-0 m-0 space-y-5">
            {releases.map((release) => {
              const isLatest = release === latest;
              return (
                <li
                  key={`${release.version}-${release.build}`}
                  className="rounded-3xl p-6 md:p-8 border transition-colors"
                  style={{
                    background: "rgba(4, 7, 26, 0.65)",
                    backdropFilter: "blur(16px)",
                    borderColor: isLatest
                      ? "rgba(61,217,255,0.42)"
                      : "rgba(61,217,255,0.14)",
                    boxShadow: isLatest
                      ? "0 20px 50px rgba(0,0,0,0.4), 0 0 34px rgba(61,217,255,0.12)"
                      : "0 20px 50px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h2 className="font-family-orbitron font-black text-2xl m-0 tracking-[0.5px]">
                          {release.version}
                        </h2>
                        {isLatest && (
                          <span
                            className="font-family-orbitron text-[10px] font-bold tracking-[1.2px] px-2.5 py-1 rounded-full border"
                            style={{
                              color: "var(--cyan)",
                              borderColor: "rgba(61,217,255,0.45)",
                              background: "rgba(61,217,255,0.09)",
                            }}
                          >
                            LATEST
                          </span>
                        )}
                      </div>
                      <div className="text-[13px] text-[#8b97c4] flex flex-wrap gap-x-2.5 gap-y-1 items-center">
                        {release.pubDate && (
                          <span>{formatDate(release.pubDate)}</span>
                        )}
                        {release.minimumSystemVersion && (
                          <>
                            <span className="text-white/10">|</span>
                            <span>
                              Requires macOS {release.minimumSystemVersion} or
                              later
                            </span>
                          </>
                        )}
                        {release.bytes > 0 && (
                          <>
                            <span className="text-white/10">|</span>
                            <span>{formatSize(release.bytes)}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <a
                      href={release.url}
                      download
                      className={
                        isLatest ? "btn-hero-download" : "btn-nav-download"
                      }
                    >
                      Download
                    </a>
                  </div>

                  {release.notes && (
                    <div
                      className="mt-5 pt-5 border-t text-sm text-[#b9c4ec] leading-relaxed"
                      style={{ borderColor: "rgba(61,217,255,0.12)" }}
                      // Release notes come from our own signed appcast, written
                      // by scripts/release.sh — not from user input.
                      dangerouslySetInnerHTML={{ __html: release.notes }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-10 text-[13px] text-[#6f7bab] leading-relaxed">
          Downloads are signed and notarized by Apple. If you installed Melodash
          before version 1.0, download once from here — that build predates
          automatic updates and cannot fetch this one itself.
        </p>
      </main>
    </div>
  );
}
