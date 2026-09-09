"use client";

import CosmicBackground from "../components/CosmicBackground";

export default function PrivacyPolicy() {
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
              PRIVACY POLICY
            </h1>
            <p className="text-sm text-[#6f7cae] font-family-orbitron">
              Last Updated: July 15, 2026
            </p>
          </div>

          <div className="space-y-8 text-[#b9c4ec] leading-relaxed text-sm md:text-base">
            <section>
              <p>
                At <strong>Melodash</strong> (developed by the <strong>LumbazzZ Team</strong>), we believe your data should belong to you. Our app is designed from the ground up as a fully local, on-device experience. <strong>We do not collect, store, or transmit your personal data.</strong>
              </p>
            </section>

            <hr className="border-[rgba(61,217,255,0.1)] my-6" />

            <section className="space-y-3">
              <h2 className="font-family-orbitron font-bold text-lg text-white tracking-[0.5px]">
                1. Camera Usage (Expression Scoring)
              </h2>
              <p>
                Melodash requests access to your device's camera to analyze facial expressions during karaoke performances. 
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>This processing is done completely in real-time, on-device using Apple's <strong>Vision</strong> framework and a bundled local <strong>Core ML</strong> model.</li>
                <li><strong>No video frames or images are recorded, stored, or transmitted</strong> outside of your device.</li>
                <li>When the song ends, the visual feed is discarded immediately.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-family-orbitron font-bold text-lg text-white tracking-[0.5px]">
                2. Microphone Usage (Pitch Detection)
              </h2>
              <p>
                Melodash requests access to your device's microphone to analyze your singing pitch, timing, and dynamic range.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>Audio input is analyzed locally on-device via Apple's <strong>AVAudioEngine</strong> and the <strong>Accelerate</strong> framework.</li>
                <li><strong>No audio files, vocal recordings, or snippets are ever saved or uploaded</strong> to any server.</li>
                <li>The raw audio data remains strictly in your device's volatile memory and is released immediately after processing.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-family-orbitron font-bold text-lg text-white tracking-[0.5px]">
                3. Apple Music & MusicKit
              </h2>
              <p>
                If you choose to use Apple Music as a backing track source:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>The app requests native macOS system permission to connect to your Apple Music subscription.</li>
                <li>All token verification and subscription handshakes are handled directly by Apple's secure <strong>MusicKit</strong> APIs.</li>
                <li>We do not have access to, nor do we collect, your Apple ID, subscription details, or billing credentials.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-family-orbitron font-bold text-lg text-white tracking-[0.5px]">
                4. Data Storage (SwiftData)
              </h2>
              <p>
                Your player profiles, avatars, game scores, and catalog settings are saved locally on your device using Apple's <strong>SwiftData</strong> framework. This data does not sync to our servers and remains secure on your physical storage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-family-orbitron font-bold text-lg text-white tracking-[0.5px]">
                5. Outbound Requests
              </h2>
              <p>
                To retrieve synchronized lyrics for imported local songs, the app may perform metadata lookups against public APIs (such as lyric repositories). These requests send only the song title and artist name to retrieve text content. No user-identifying data or device IDs are ever included in these search queries.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-family-orbitron font-bold text-lg text-white tracking-[0.5px]">
                6. Contact Us
              </h2>
              <p>
                If you have any questions or feedback regarding our privacy practices, please contact us at:
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
