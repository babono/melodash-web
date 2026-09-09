"use client";

import CosmicBackground from "../components/CosmicBackground";

export default function SupportPage() {
  return (
    <div className="relative min-h-screen text-[#eef1ff] overflow-x-hidden font-sans flex flex-col">
      {/* Cosmic background animation */}
      <CosmicBackground starDensity={60} />

      {/* ============ STICKY NAV ============ */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between gap-[18px] backdrop-blur-[10px] bg-[#04071a]/55 border-b border-[rgba(61,217,255,0.16)]"
        style={{
          padding: "14px clamp(18px, 4vw, 54px)",
        }}
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
        <div
          className="rounded-3xl p-8 md:p-12 border border-[rgba(61,217,255,0.14)]"
          style={{
            background: "rgba(4, 7, 26, 0.65)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="mb-8">
            <h1 className="font-family-orbitron font-black text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyan)] via-white to-[var(--violet)] tracking-[1px] mb-2">
              HELP & SUPPORT
            </h1>
            <p className="text-sm text-[#6f7cae] font-family-orbitron">
              Melodash Help Center
            </p>
          </div>

          <div className="space-y-8 text-[#b9c4ec] leading-relaxed text-sm md:text-base">
            <section className="space-y-3">
              <h2 className="font-family-orbitron font-bold text-lg text-white tracking-[0.5px]">
                How to Play Melodash
              </h2>
              <p>
                Melodash is a couch-multiplayer singing battle for 2–5 players. 
                Configure your lobby, select characters, and use <strong>Mic Roulette</strong> to determine the turn order.
                As each player sings, the app uses your device's mic and front-facing camera to score pitch accuracy and facial expression matching. 
                The performer with the highest fused score at the end of the round takes the podium!
              </p>
            </section>

            <hr className="border-[rgba(61,217,255,0.1)] my-6" />

            <section className="space-y-4">
              <h2 className="font-family-orbitron font-bold text-lg text-white tracking-[0.5px]">
                Frequently Asked Questions (FAQs)
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <h3 className="font-family-orbitron font-bold text-sm md:text-base text-[var(--cyan)] mb-1.5">
                    Why isn't my score updating / why does it show permission warnings?
                  </h3>
                  <p className="text-sm">
                    Melodash scores your performance using local audio and video analysis. 
                    If camera or microphone permissions are disabled, the corresponding component cannot score. 
                    To fix this:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-xs md:text-sm">
                    <li>Go to <strong>System Settings &gt; Privacy & Security</strong>, and verify that both <strong>Camera</strong> and <strong>Microphone</strong> permissions are enabled for Melodash.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <h3 className="font-family-orbitron font-bold text-sm md:text-base text-[var(--cyan)] mb-1.5">
                    Why can't I play Apple Music songs?
                  </h3>
                  <p className="text-sm">
                    Apple Music playback requires an active <strong>Apple Music subscription</strong>. 
                    Ensure you are signed in with the Apple ID associated with your subscription in your system settings. 
                    Note that Apple Music tracks cannot be played on the Xcode simulator; you must run the app on a physical Mac.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <h3 className="font-family-orbitron font-bold text-sm md:text-base text-[var(--cyan)] mb-1.5">
                    Do I need headphones to play?
                  </h3>
                  <p className="text-sm">
                    For bundled or imported songs, Melodash implements built-in echo cancellation to filter out background speaker noise. 
                    However, due to DRM restrictions on Apple Music audio, sample access is blocked, preventing active echo-cancellation. 
                    When playing Apple Music tracks, we strongly recommend wearing <strong>headphones</strong> so the microphone only captures your voice.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-[rgba(61,217,255,0.1)] my-6" />

            <section className="space-y-3">
              <h2 className="font-family-orbitron font-bold text-lg text-white tracking-[0.5px]">
                Still Need Help?
              </h2>
              <p>
                If you encounter any bugs, have licensing queries, or need help troubleshooting setup issues, our development team is happy to assist you. Drop us an email:
              </p>
              <p className="font-mono text-[var(--cyan)] bg-[rgba(61,217,255,0.06)] py-2 px-4 rounded-lg inline-block text-xs md:text-sm">
                support@melodash.app
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 border-t border-[rgba(61,217,255,0.14)] py-8 px-[clamp(20px,5vw,54px)] max-w-[1220px] mx-auto w-full">
        <div className="flex flex-wrap gap-5 items-center justify-between text-sm text-[#6f7cae]">
          <div className="flex items-center gap-3">
            <img src="/assets/appicon.png" alt="Melodash" className="w-8 h-8 rounded-[9px]" />
            <div className="font-family-orbitron font-black tracking-[1px]">
              MELODASH
            </div>
          </div>
          <div>
            &copy; 2026 LumbazzZ Team. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
