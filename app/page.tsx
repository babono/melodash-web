"use client";

import { useState, useEffect, useRef } from "react";
import CosmicBackground from "./components/CosmicBackground";

const videos = [
  {
    id: 0,
    src: "/videos/video1.mp4",
    title: "Pitch Tracking & Scoring 🎯",
    description: "Hit the notes and hold them. Live pitch scoring against the backing track.",
    likes: 120,
    comments: 3,
    shares: 18,
    performer: "@LumbazzZ_Team",
    song: "Frank Sinatra - My Way"
  },
  {
    id: 1,
    src: "/videos/video2.mp4",
    title: "Nailed the Rap! 🎤",
    description: "Speech articulation checking. Clear pronunciation of the lyrics scored.",
    likes: 345,
    comments: 3,
    shares: 55,
    performer: "@SingingStar",
    song: "Daniel Caesar - Get You"
  },
  {
    id: 2,
    src: "/videos/video3.mp4",
    title: "Leaderboard Climax! 🏆",
    description: "Climbing the live leaderboard in real-time performance.",
    likes: 98,
    comments: 3,
    shares: 7,
    performer: "@KaraokeKing",
    song: "BGM Vibe"
  },
  {
    id: 3,
    src: "/videos/video4.mp4",
    title: "Expression Scoring 😜",
    description: "Live camera emotion tracking. Match your expressions to win!",
    likes: 412,
    comments: 3,
    shares: 99,
    performer: "@ActorPro",
    song: "Pop Anthem"
  },
  {
    id: 4,
    src: "/videos/video5.mp4",
    title: "Apple Music Catalog Search 🎵",
    description: "Seamless search from millions of songs in Apple Music.",
    likes: 220,
    comments: 3,
    shares: 31,
    performer: "@TeamLumbazzZ",
    song: "Search Engine"
  },
  {
    id: 5,
    src: "/videos/video6.mp4",
    title: "Local Multiplayer Lobby 🔊",
    description: "Lobby screens, settings, and player list setup for round play.",
    likes: 85,
    comments: 3,
    shares: 4,
    performer: "@DevTeam",
    song: "Melodash Lobby"
  }
];

export default function Home() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [bgmWasPlaying, setBgmWasPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [likedVideos, setLikedVideos] = useState<Record<number, boolean>>({});

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const aud = new Audio("/assets/BGM.mp3");
    aud.loop = true;
    aud.volume = 0.35;
    audioRef.current = aud;

    return () => {
      aud.pause();
    };
  }, []);

  const toggleBGM = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setAudioPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio playback failed:", err);
        });
    }
  };

  const openVideoModal = (index: number) => {
    setActiveVideoIndex(index);
    if (audioPlaying) {
      audioRef.current?.pause();
      setBgmWasPlaying(true);
      setAudioPlaying(false);
    }
  };

  const closeVideoModal = () => {
    setActiveVideoIndex(null);
    if (bgmWasPlaying) {
      audioRef.current?.play().then(() => {
        setAudioPlaying(true);
      }).catch((err) => {
        console.warn("Resuming BGM failed:", err);
      });
      setBgmWasPlaying(false);
    }
  };

  const prevVideo = () => {
    if (activeVideoIndex === null) return;
    const nextIdx = (activeVideoIndex - 1 + videos.length) % videos.length;
    setActiveVideoIndex(nextIdx);
  };

  const nextVideo = () => {
    if (activeVideoIndex === null) return;
    const nextIdx = (activeVideoIndex + 1) % videos.length;
    setActiveVideoIndex(nextIdx);
  };

  const toggleLike = () => {
    if (activeVideoIndex === null) return;
    setLikedVideos(prev => ({
      ...prev,
      [activeVideoIndex]: !prev[activeVideoIndex]
    }));
  };

  const getVideoComments = (index: number) => {
    const commentsData = [
      [
        { user: "@FrankFan_99", text: "Frank would be proud of this pitch score! 🔥" },
        { user: "@cosmic_girl", text: "the background stars breathing makes it look so futuristic" },
        { user: "@karaoke_junky", text: "Cannot wait to try this on my Mac!" }
      ],
      [
        { user: "@rap_god", text: "enunciation check is actually a game-changer" },
        { user: "@dan_caesar_love", text: "this Daniel Caesar song is so smooth to sing" },
        { user: "@mumble_rapper", text: "mumble rappers beware indeed 😂" }
      ],
      [
        { user: "@leaderboard_pro", text: "the live board scrolling got me sweating" },
        { user: "@champ_01", text: "local lobby multiplayer is exactly what my party needs" },
        { user: "@mac_gamer", text: "looks super easy to pass the mic" }
      ],
      [
        { user: "@expressionist", text: "Core ML facial landmarks tracking works so well!" },
        { user: "@funny_face", text: "i'm gonna pull the funniest face to steal the crown 😜" },
        { user: "@vision_ai", text: "built-in Apple Vision framework integration is nice" }
      ],
      [
        { user: "@music_kit_user", text: "Apple Music library is huge! Glad they used it" },
        { user: "@licensed_songs", text: "no more generic MIDI backing tracks, finally!" },
        { user: "@ui_enthusiast", text: "love the native search flow" }
      ],
      [
        { user: "@lobby_host", text: "looks super clean to setup, no account swops" },
        { user: "@developer_cadet", text: "LumbazzZ team cooked with this project" },
        { user: "@windows_please", text: "plss make a Windows version, need this so much 😭" }
      ]
    ];
    return commentsData[index] || [];
  };

  return (
    <div className="relative min-h-screen text-[#eef1ff] overflow-x-hidden font-sans">
      {/* Cosmic background animation */}
      <CosmicBackground starDensity={90} />

      {/* ============ STICKY NAV ============ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "18px",
          padding: "14px clamp(18px, 4vw, 54px)",
          backdropFilter: "blur(10px)",
          background: "rgba(4, 7, 26, 0.55)",
          borderBottom: "1px solid rgba(61, 217, 255, 0.16)",
        }}
      >
        <a href="#top" className="flex items-center gap-3 text-white no-underline">
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
        <div className="hidden md:flex items-center gap-[clamp(12px,2.2vw,32px)] justify-end">
          <a
            href="#battle"
            style={{ color: "#b9c4ec", fontWeight: 500, fontSize: "14.5px" }}
            className="hover:text-[var(--cyan)] transition-colors"
          >
            Why local
          </a>
          <a
            href="#score"
            style={{ color: "#b9c4ec", fontWeight: 500, fontSize: "14.5px" }}
            className="hover:text-[var(--cyan)] transition-colors"
          >
            Scoring
          </a>
          <a
            href="#how"
            style={{ color: "#b9c4ec", fontWeight: 500, fontSize: "14.5px" }}
            className="hover:text-[var(--cyan)] transition-colors"
          >
            How it works
          </a>
          <a
            href="#songs"
            style={{ color: "#b9c4ec", fontWeight: 500, fontSize: "14.5px" }}
            className="hover:text-[var(--cyan)] transition-colors"
          >
            Songs
          </a>
          <a
            href="#tech"
            style={{ color: "#b9c4ec", fontWeight: 500, fontSize: "14.5px" }}
            className="hover:text-[var(--cyan)] transition-colors"
          >
            Tech
          </a>
          <button
            onClick={toggleBGM}
            style={{
              color: "#b9c4ec",
              fontWeight: 500,
              fontSize: "14.5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="hover:text-[var(--cyan)] transition-colors"
            aria-label={audioPlaying ? "Mute Background Music" : "Play Background Music"}
          >
            {audioPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            )}
            <span>BGM</span>
          </button>
          <a
            href="/releases/Melodash-1.0.dmg"
            download
            className="btn-nav-download"
          >
            Download
          </a>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex md:hidden items-center justify-center p-2 text-[#b9c4ec] hover:text-white bg-none border-none cursor-pointer"
          aria-label="Open Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* ============ HERO HEADER ============ */}
      <header id="top" className="relative z-10 max-w-[1220px] mx-auto pt-[clamp(46px,8vw,92px)] px-[clamp(20px,5vw,54px)] pb-[clamp(80px,9vw,130px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-[clamp(30px,5vw,60px)] items-center">
          <div>
            <div className="inline-flex items-center gap-2.5 py-[7px] px-4 rounded-full border border-[rgba(61,217,255,0.4)] bg-[rgba(61,217,255,0.08)] font-family-orbitron font-bold tracking-[2px] text-[11px] uppercase text-[#9be9ff] mb-[26px]">
              <span className="w-2 h-2 rounded-full bg-[var(--pink)] animate-pulse" style={{ boxShadow: "0 0 10px var(--pink)" }}></span>
              Local multiplayer · 2–5 players
            </div>
            <h1 className="m-0 mb-[18px]">
              <img src="/assets/logo-melodash.png" alt="MELODASH" className="w-full max-w-[520px] block" />
            </h1>
            <p className="font-family-orbitron font-bold text-[clamp(17px,2.4vw,25px)] m-0 mb-5 bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)] bg-clip-text text-transparent">
              Forget online duets. Clash face-to-face.
            </p>
            <p className="text-[clamp(15.5px,1.5vw,18px)] leading-[1.65] text-[#b9c4ec] max-w-[520px] m-0 mb-[34px]">
              One room. One mic. 2–5 friends taking turns while Melodash scores your{" "}
              <strong className="text-[#eef1ff]">pitch</strong>, your{" "}
              <strong className="text-[#eef1ff]">words</strong>, and your{" "}
              <strong className="text-[#eef1ff]">face</strong> in real time. The funniest performer has just as good a shot as the best singer.
            </p>
            <div className="flex flex-wrap gap-[18px] items-center">
              <a
                href="/releases/Melodash-1.0.dmg"
                download
                className="btn-hero-download"
              >
                <svg width="19" height="23" viewBox="0 0 24 24" fill="#2f48a5" aria-hidden="true">
                  <path d="M16.5 1.6c0 1.2-.5 2.4-1.3 3.2-.9.9-2.3 1.6-3.5 1.5-.1-1.2.5-2.4 1.3-3.2.9-.9 2.4-1.6 3.5-1.5zM20.3 17c-.5 1.2-.8 1.7-1.5 2.8-1 1.5-2.3 3.4-4 3.4-1.5 0-1.9-1-3.9-1-2 0-2.5 1-3.9 1-1.7 0-3-1.7-4-3.2-2.7-4-3-8.7-1.3-11.2 1.2-1.8 3-2.8 4.8-2.8 1.8 0 2.9 1 4.4 1 1.4 0 2.3-1 4.4-1 1.6 0 3.2.9 4.4 2.4-3.8 2.1-3.2 7.6.6 8.8z" />
                </svg>
                Download for Mac
              </a>
              <div className="text-[13px] text-[#8b97c4] leading-[1.5]">
                Free · macOS 15 or later<br />Universal (Apple silicon &amp; Intel)
              </div>
            </div>
          </div>

          {/* app window mock */}
          <div className="relative">
            <div
              className="rounded-[22px] border-[1.5px] border-[rgba(61,217,255,0.5)] bg-[rgba(255,255,255,0.04)] overflow-hidden animate-[floatY_6s_ease-in-out_infinite]"
              style={{
                boxShadow: "0 0 44px rgba(61,217,255,0.26), inset 0 0 26px rgba(61,217,255,0.05)",
                animationPlayState: "var(--om-play, running)"
              }}
            >
              <div className="flex items-center gap-2 py-3 px-4 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(4,7,26,0.5)]">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
                <span className="ml-auto font-family-orbitron font-bold text-[11px] tracking-[2px] text-[#6f7cae]">
                  MELODASH.APP
                </span>
              </div>
              <div className="aspect-[16/10] relative bg-[#04071a]">
                <img
                  src="/assets/hero-shot.webp"
                  alt="Melodash gameplay screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-[-20px] right-[-12px]">
              <span
                className="font-family-orbitron font-black text-xs tracking-[0.5px] py-2.5 px-[18px] rounded-full text-[#2f48a5] bg-[#d9e2ff]"
                style={{ boxShadow: "0 6px 18px rgba(106,214,235,0.8)" }}
              >
                🏆 LIVE LEADERBOARD
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ============ WHY LOCAL ============ */}
      <section id="battle" className="relative z-10 max-w-[1000px] mx-auto py-[clamp(40px,7vw,90px)] px-[clamp(20px,5vw,54px)] text-center">
        <p className="font-family-orbitron font-bold tracking-[3px] uppercase text-xs text-[var(--violet)] m-0 mb-[18px]">
          Karaoke was never meant to be lonely
        </p>
        <h2 className="font-family-orbitron font-black text-[clamp(28px,4.6vw,48px)] leading-[1.1] m-0 mb-[22px] text-[#f2f7ff] text-shadow" style={{ textShadow: "0 0 24px rgba(61,217,255,0.35)" }}>
          The magic isn&apos;t online. It&apos;s in the <span className="text-[var(--cyan)]">room</span> with your people.
        </h2>
        <p className="text-[clamp(15.5px,1.6vw,18px)] leading-[1.7] text-[#b9c4ec] max-w-[680px] mx-auto">
          Most karaoke apps are built for strangers competing over the internet. Melodash brings it back to the raw, chaotic fun of a real hangout — laughing, roasting, and battling the people sitting right next to you. Drop your guard, pull a funny face, and get lost in the cosmic arena.
        </p>
        <div className="flex gap-[clamp(20px,5vw,64px)] flex-wrap justify-center mt-11">
          <div>
            <div className="font-family-orbitron font-black text-[clamp(32px,4.6vw,48px)] bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)] bg-clip-text text-transparent">
              2–5
            </div>
            <div className="text-[#8b97c4] text-sm tracking-[0.5px]">players per round</div>
          </div>
          <div>
            <div className="font-family-orbitron font-black text-[clamp(32px,4.6vw,48px)] bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)] bg-clip-text text-transparent">
              3
            </div>
            <div className="text-[#8b97c4] text-sm tracking-[0.5px]">live scoring metrics</div>
          </div>
          <div>
            <div className="font-family-orbitron font-black text-[clamp(32px,4.6vw,48px)] bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)] bg-clip-text text-transparent">
              1
            </div>
            <div className="text-[#8b97c4] text-sm tracking-[0.5px]">mic, endless chaos</div>
          </div>
        </div>
      </section>

      {/* ============ SCORING ============ */}
      <section id="score" className="relative z-10 max-w-[1220px] mx-auto py-[clamp(40px,7vw,80px)] px-[clamp(20px,5vw,54px)]">
        <div className="text-center mb-[46px]">
          <p className="font-family-orbitron font-bold tracking-[3px] uppercase text-xs text-[var(--cyan)] m-0 mb-3.5">
            Three ways to win the round
          </p>
          <h2 className="font-family-orbitron font-black text-[clamp(28px,4.6vw,48px)] m-0 text-[#f2f7ff]" style={{ textShadow: "0 0 24px rgba(61,217,255,0.35)" }}>
            It&apos;s not just about the voice.
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[22px]">
          <div
            className="rounded-[22px] p-[30px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.5)] backdrop-blur-[4px] transition-transform hover:-translate-y-2 hover:shadow-[0_0_28px_rgba(61,217,255,0.3)] duration-300"
            style={{ boxShadow: "0 0 28px rgba(61,217,255,0.2)" }}
          >
            <div className="w-[56px] h-[56px] rounded-[16px] grid place-items-center bg-[rgba(61,217,255,0.14)] border border-[rgba(61,217,255,0.5)] mb-5 text-2xl">
              🎯
            </div>
            <div className="font-family-orbitron font-bold text-xs tracking-[2px] text-[var(--cyan)] mb-2">
              01 · PITCH
            </div>
            <h3 className="font-family-orbitron font-bold text-5xl text-xl m-0 mb-3 text-[#f2f7ff]">
              Pitch Accuracy
            </h3>
            <p className="text-[#b0bbe4] leading-[1.6] m-0 text-[15px]">
              Hit the notes and hold them. Melodash tracks your pitch against the track in real time and rewards you for staying on-key.
            </p>
          </div>
          <div
            className="rounded-[22px] p-[30px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(255,77,157,0.5)] backdrop-blur-[4px] transition-transform hover:-translate-y-2 hover:shadow-[0_0_28px_rgba(255,77,157,0.3)] duration-300"
            style={{ boxShadow: "0 0 28px rgba(255,77,157,0.2)" }}
          >
            <div className="w-[56px] h-[56px] rounded-[16px] grid place-items-center bg-[rgba(255,77,157,0.14)] border border-[rgba(255,77,157,0.5)] mb-5 text-2xl">
              🎤
            </div>
            <div className="font-family-orbitron font-bold text-xs tracking-[2px] text-[var(--pink)] mb-2">
              02 · WORDS
            </div>
            <h3 className="font-family-orbitron font-bold text-5xl text-xl m-0 mb-3 text-[#f2f7ff]">
              Clear Articulation
            </h3>
            <p className="text-[#b0bbe4] leading-[1.6] m-0 text-[15px]">
              Nail every word. The app listens for how cleanly you deliver the lyrics — mumblers beware, enunciators thrive.
            </p>
          </div>
          <div
            className="rounded-[22px] p-[30px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(153,102,255,0.55)] backdrop-blur-[4px] transition-transform hover:-translate-y-2 hover:shadow-[0_0_28px_rgba(153,102,255,0.32)] duration-300"
            style={{ boxShadow: "0 0 28px rgba(153,102,255,0.22)" }}
          >
            <div className="w-[56px] h-[56px] rounded-[16px] grid place-items-center bg-[rgba(153,102,255,0.16)] border border-[rgba(153,102,255,0.55)] mb-5 text-2xl">
              😜
            </div>
            <div className="font-family-orbitron font-bold text-xs tracking-[2px] text-[var(--violet)] mb-2">
              03 · EXPRESSION
            </div>
            <h3 className="font-family-orbitron font-bold text-5xl text-xl m-0 mb-3 text-[#f2f7ff]">
              Facial Expression
            </h3>
            <p className="text-[#b0bbe4] leading-[1.6] m-0 text-[15px]">
              Sell the emotion. The camera reads whether your face matches the song&apos;s mood — so the biggest ham can steal the crown.
            </p>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how" className="relative z-10 max-w-[1220px] mx-auto py-[clamp(40px,7vw,80px)] px-[clamp(20px,5vw,54px)]">
        <div className="text-center mb-[46px]">
          <p className="font-family-orbitron font-bold tracking-[3px] uppercase text-xs text-[var(--violet)] m-0 mb-3.5">
            Pass the mic
          </p>
          <h2 className="font-family-orbitron font-black text-[clamp(28px,4.6vw,48px)] m-0 text-[#f2f7ff]" style={{ textShadow: "0 0 24px rgba(61,217,255,0.35)" }}>
            How a round plays out
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          <div className="rounded-[22px] p-[28px_24px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.28)]">
            <div className="font-family-orbitron font-black text-[42px] leading-[1] text-[rgba(61,217,255,0.4)] mb-3.5">
              01
            </div>
            <h3 className="font-family-orbitron font-bold text-[17px] m-0 mb-2 text-[#f2f7ff]">
              Gather your crew
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Get 2–5 friends around one screen and open Melodash. No accounts to swap, no internet lobby.
            </p>
          </div>
          <div className="rounded-[22px] p-[28px_24px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(255,77,157,0.32)]">
            <div className="font-family-orbitron font-black text-[42px] leading-[1] text-[rgba(255,77,157,0.45)] mb-3.5">
              02
            </div>
            <h3 className="font-family-orbitron font-bold text-[17px] m-0 mb-2 text-[#f2f7ff]">
              Pick a song, pass the mic
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Choose from the library and take turns. Whoever&apos;s up steps into the cosmic spotlight.
            </p>
          </div>
          <div className="rounded-[22px] p-[28px_24px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(153,102,255,0.35)]">
            <div className="font-family-orbitron font-black text-[42px] leading-[1] text-[rgba(153,102,255,0.5)] mb-3.5">
              03
            </div>
            <h3 className="font-family-orbitron font-bold text-[17px] m-0 mb-2 text-[#f2f7ff]">
              Sing your heart out
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Melodash scores your pitch, words, and face live — points fly across the arena as you perform.
            </p>
          </div>
          <div className="rounded-[22px] p-[28px_24px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(245,196,23,0.4)]">
            <div className="font-family-orbitron font-black text-[42px] leading-[1] text-[rgba(245,196,23,0.55)] mb-3.5">
              04
            </div>
            <h3 className="font-family-orbitron font-bold text-[17px] m-0 mb-2 text-[#f2f7ff]">
              Crown the champion
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Climb the leaderboard and whoever&apos;s on top when the round ends takes the cosmic crown.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SONGS ============ */}
      <section id="songs" className="relative z-10 py-[clamp(40px,7vw,80px)] overflow-hidden">
        <div className="text-center max-w-[700px] mx-auto mb-10 px-5">
          <p className="font-family-orbitron font-bold tracking-[3px] uppercase text-xs text-[var(--cyan)] m-0 mb-3.5">
            A galaxy of songs
          </p>
          <h2 className="font-family-orbitron font-black text-[clamp(28px,4.6vw,48px)] m-0 mb-4 text-[#f2f7ff]" style={{ textShadow: "0 0 24px rgba(61,217,255,0.35)" }}>
            Bangers for every hangout
          </h2>
          <p className="text-[#b0bbe4] text-base leading-[1.6] m-0">
            Pop anthems, throwback classics, K-pop, hip-hop, power ballads — from crowd-pleasers to deep cuts that separate the real fans.
          </p>
        </div>
        <div className="flex w-max animate-[marquee_30s_linear_infinite]" style={{ animationPlayState: "var(--om-play, running)" }}>
          <div className="flex gap-4">
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(61,217,255,0.5)] bg-[rgba(61,217,255,0.08)] text-[#cfe8ff] whitespace-nowrap">
              🎧 Pop Anthems
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(255,77,157,0.5)] bg-[rgba(255,77,157,0.08)] text-[#ffd0e6] whitespace-nowrap">
              💿 90s Throwbacks
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(153,102,255,0.5)] bg-[rgba(153,102,255,0.1)] text-[#ddd0ff] whitespace-nowrap">
              ✨ K-Pop
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(245,117,31,0.55)] bg-[rgba(245,117,31,0.1)] text-[#ffdcc4] whitespace-nowrap">
              🔥 Hip-Hop
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(61,217,255,0.5)] bg-[rgba(61,217,255,0.08)] text-[#cfe8ff] whitespace-nowrap">
              🎸 Power Ballads
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(255,77,157,0.5)] bg-[rgba(255,77,157,0.08)] text-[#ffd0e6] whitespace-nowrap">
              💃 Dance Floor
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(153,102,255,0.5)] bg-[rgba(153,102,255,0.1)] text-[#ddd0ff] whitespace-nowrap">
              🎵 Indie
            </span>
          </div>
          <div className="flex gap-4 ml-4" aria-hidden="true">
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(61,217,255,0.5)] bg-[rgba(61,217,255,0.08)] text-[#cfe8ff] whitespace-nowrap">
              🎧 Pop Anthems
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(255,77,157,0.5)] bg-[rgba(255,77,157,0.08)] text-[#ffd0e6] whitespace-nowrap">
              💿 90s Throwbacks
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(153,102,255,0.5)] bg-[rgba(153,102,255,0.1)] text-[#ddd0ff] whitespace-nowrap">
              ✨ K-Pop
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(245,117,31,0.55)] bg-[rgba(245,117,31,0.1)] text-[#ffdcc4] whitespace-nowrap">
              🔥 Hip-Hop
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(61,217,255,0.5)] bg-[rgba(61,217,255,0.08)] text-[#cfe8ff] whitespace-nowrap">
              🎸 Power Ballads
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(255,77,157,0.5)] bg-[rgba(255,77,157,0.08)] text-[#ffd0e6] whitespace-nowrap">
              💃 Dance Floor
            </span>
            <span className="font-family-orbitron font-bold text-sm tracking-[0.5px] py-3 px-6 rounded-full border border-[rgba(153,102,255,0.5)] bg-[rgba(153,102,255,0.1)] text-[#ddd0ff] whitespace-nowrap">
              🎵 Indie
            </span>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="relative z-10 max-w-[1220px] mx-auto py-[clamp(40px,7vw,80px)] px-[clamp(20px,5vw,54px)]">
        <div className="text-center mb-10">
          <p className="font-family-orbitron font-bold tracking-[3px] uppercase text-xs text-[var(--pink)] m-0 mb-3.5">
            Inside the arena
          </p>
          <h2 className="font-family-orbitron font-black text-[clamp(28px,4.6vw,48px)] m-0 text-[#f2f7ff]" style={{ textShadow: "0 0 24px rgba(61,217,255,0.35)" }}>
            See it in action
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-3 gap-5">
          {videos.map((v, index) => (
            <div
              key={v.id}
              onClick={() => openVideoModal(index)}
              className="relative rounded-[22px] overflow-hidden border-[1.5px] border-[rgba(61,217,255,0.45)] bg-[#04071a] cursor-pointer group aspect-[9/16] shadow-[0_0_26px_rgba(61,217,255,0.2)]"
              onMouseEnter={(e) => {
                const videoEl = e.currentTarget.querySelector("video");
                if (videoEl) videoEl.play().catch(() => {});
              }}
              onMouseLeave={(e) => {
                const videoEl = e.currentTarget.querySelector("video");
                if (videoEl) {
                  videoEl.pause();
                  videoEl.currentTime = 0;
                }
              }}
            >
              <video
                src={v.src}
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center gap-1.5 text-[var(--cyan)] font-family-orbitron font-bold text-xs mb-1">
                  <span>▶</span> See in Action
                </div>
                <h3 className="font-family-orbitron font-bold text-[17px] m-0 text-white truncate">
                  {v.title}
                </h3>
                <p className="text-xs text-[#b9c4ec] m-0 mt-1.5 line-clamp-2 leading-relaxed">
                  {v.description}
                </p>
              </div>
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                🔊
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TECH STACK ============ */}
      <section id="tech" className="relative z-10 max-w-[1220px] mx-auto py-[clamp(40px,7vw,80px)] px-[clamp(20px,5vw,54px)]">
        <div className="text-center mb-[46px]">
          <p className="font-family-orbitron font-bold tracking-[3px] uppercase text-xs text-[var(--cyan)] m-0 mb-3.5">
            An Apple Developer Academy project
          </p>
          <h2 className="font-family-orbitron font-black text-[clamp(28px,4.6vw,48px)] m-0 mb-4 text-[#f2f7ff]" style={{ textShadow: "0 0 24px rgba(61,217,255,0.35)" }}>
            Built on Apple
          </h2>
          <p className="text-[#b0bbe4] text-base leading-[1.6] max-w-[640px] mx-auto">
            Melodash is a native Swift app. Every metric — pitch, articulation, and expression — is computed <strong className="text-[#eef1ff]">live and on-device</strong> using Apple&apos;s own frameworks.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
          <div className="rounded-[22px] p-[26px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.28)] backdrop-blur-[4px]">
            <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[rgba(245,117,31,0.16)] border border-[rgba(245,117,31,0.5)] mb-4 text-2xl">
              ⚡
            </div>
            <h3 className="font-family-orbitron font-bold text-lg m-0 mb-2 text-[#f2f7ff]">
              Swift
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              The language behind Melodash — fast, safe, and expressive, powering everything from the scoring engine to the interface.
            </p>
          </div>
          <div className="rounded-[22px] p-[26px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.28)] backdrop-blur-[4px]">
            <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[rgba(102,204,255,0.16)] border border-[rgba(102,204,255,0.5)] mb-4 text-2xl">
              🛠️
            </div>
            <h3 className="font-family-orbitron font-bold text-lg m-0 mb-2 text-[#f2f7ff]">
              Xcode
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Apple&apos;s development environment where the whole app is designed, built, debugged, and shipped.
            </p>
          </div>
          <div className="rounded-[22px] p-[26px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.28)] backdrop-blur-[4px]">
            <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[rgba(61,217,255,0.16)] border border-[rgba(61,217,255,0.5)] mb-4 text-2xl">
              🧩
            </div>
            <h3 className="font-family-orbitron font-bold text-lg m-0 mb-2 text-[#f2f7ff]">
              SwiftUI &amp; SwiftData
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Declarative UI drives the entire cosmic interface and animations, while SwiftData persists players, songs, and scores.
            </p>
          </div>
          <div className="rounded-[22px] p-[26px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.28)] backdrop-blur-[4px]">
            <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[rgba(255,77,157,0.16)] border border-[rgba(255,77,157,0.5)] mb-4 text-2xl">
              🔊
            </div>
            <h3 className="font-family-orbitron font-bold text-lg m-0 mb-2 text-[#f2f7ff]">
              AVFoundation
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Real-time audio capture and playback — the backing track, live mic input, and tight synchronized timing.
            </p>
          </div>
          <div className="rounded-[22px] p-[26px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.28)] backdrop-blur-[4px]">
            <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[rgba(153,102,255,0.16)] border border-[rgba(153,102,255,0.5)] mb-4 text-2xl">
              🎵
            </div>
            <h3 className="font-family-orbitron font-bold text-lg m-0 mb-2 text-[#f2f7ff]">
              MusicKit
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Brings Apple Music in, so players can search and perform from a huge catalog of licensed songs.
            </p>
          </div>
          <div className="rounded-[22px] p-[26px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.28)] backdrop-blur-[4px]">
            <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[rgba(153,102,255,0.16)] border border-[rgba(153,102,255,0.5)] mb-4 text-2xl">
              🧠
            </div>
            <h3 className="font-family-orbitron font-bold text-lg m-0 mb-2 text-[#f2f7ff]">
              Core ML
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Runs our on-device emotion model, turning each singer&apos;s facial expression into a live performance score.
            </p>
          </div>
          <div className="rounded-[22px] p-[26px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.28)] backdrop-blur-[4px]">
            <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[rgba(61,217,255,0.16)] border border-[rgba(61,217,255,0.5)] mb-4 text-2xl">
              👁️
            </div>
            <h3 className="font-family-orbitron font-bold text-lg m-0 mb-2 text-[#f2f7ff]">
              Vision
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              Detects and tracks facial landmarks in real time, feeding the emotion model live input from the camera.
            </p>
          </div>
          <div className="rounded-[22px] p-[26px] bg-[rgba(0,0,0,0.35)] border-[1.5px] border-[rgba(61,217,255,0.28)] backdrop-blur-[4px]">
            <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[rgba(245,196,23,0.16)] border border-[rgba(245,196,23,0.5)] mb-4 text-2xl">
              🎚️
            </div>
            <h3 className="font-family-orbitron font-bold text-lg m-0 mb-2 text-[#f2f7ff]">
              Accelerate
            </h3>
            <p className="text-[#a6b1da] leading-[1.55] m-0 text-[14.5px]">
              High-performance signal processing powers our pitch detector — the math behind every accuracy score.
            </p>
          </div>
        </div>

        {/* accessibility highlight */}
        <div
          className="mt-[22px] rounded-[22px] p-[clamp(26px,4vw,38px)] bg-[rgba(0,0,0,0.4)] border-[1.5px] border-[rgba(245,117,31,0.45)] backdrop-blur-[4px] flex gap-[22px] items-center flex-wrap"
          style={{
            background: "radial-gradient(500px 240px at 12% 0%, rgba(245,117,31,0.14), transparent 70%), rgba(0,0,0,0.4)",
            boxShadow: "0 0 30px rgba(245,117,31,0.15)",
          }}
        >
          <div className="w-[60px] h-[60px] flex-none rounded-[16px] grid place-items-center bg-[rgba(245,117,31,0.18)] border border-[rgba(245,117,31,0.55)] text-[28px]">
            ♿
          </div>
          <div className="flex-1 min-w-[240px]">
            <div className="font-family-orbitron font-bold text-xs tracking-[2px] text-[#f5751f] mb-1.5">
              ACCESSIBILITY · LIVE CAPTIONS
            </div>
            <h3 className="font-family-orbitron font-bold text-5xl text-xl m-0 mb-2 text-[#f2f7ff]">
              Everyone gets to sing along
            </h3>
            <p className="text-[#b0bbe4] leading-[1.6] m-0 text-[15px] max-w-[720px]">
              Melodash pairs Live Captions with real-time lyric transliteration, making songs in non-Latin scripts easy to read and sing — so language is never a barrier at the party.
            </p>
          </div>
        </div>
      </section>

      {/* ============ DOWNLOAD CTA ============ */}
      <section className="relative z-10 max-w-[1000px] mx-auto py-[clamp(30px,5vw,60px)] px-[clamp(20px,5vw,54px)] pb-[clamp(60px,8vw,100px)]">
        <div
          className="rounded-[28px] p-[clamp(40px,6vw,72px)_clamp(24px,5vw,60px)] text-center border-[1.5px] border-[rgba(61,217,255,0.5)] bg-[rgba(0,0,0,0.4)] backdrop-blur-[4px] animate-[glowPulse_6s_ease-in-out_infinite]"
          style={{
            background: "radial-gradient(600px 300px at 50% -20%, rgba(153,102,255,0.2), transparent 70%), rgba(0,0,0,0.4)",
            animationPlayState: "var(--om-play, running)",
          }}
        >
          <h2 className="font-family-orbitron font-black text-[clamp(28px,4.6vw,50px)] leading-[1.1] m-0 mb-4 text-[#f2f7ff]">
            Turn your room into a<br />
            <span className="bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)] bg-clip-text text-transparent">
              cosmic arena.
            </span>
          </h2>
          <p className="text-[#b9c4ec] text-md text-lg leading-[1.6] max-w-[480px] mx-auto mb-[34px]">
            Grab the mic, gather your people, and find out who really puts on the best show.
          </p>
          <a
            href="/releases/Melodash-1.0.dmg"
            download
            className="btn-cta-download"
          >
            <svg width="20" height="24" viewBox="0 0 24 24" fill="#2f48a5" aria-hidden="true">
              <path d="M16.5 1.6c0 1.2-.5 2.4-1.3 3.2-.9.9-2.3 1.6-3.5 1.5-.1-1.2.5-2.4 1.3-3.2.9-.9 2.4-1.6 3.5-1.5zM20.3 17c-.5 1.2-.8 1.7-1.5 2.8-1 1.5-2.3 3.4-4 3.4-1.5 0-1.9-1-3.9-1-2 0-2.5 1-3.9 1-1.7 0-3-1.7-4-3.2-2.7-4-3-8.7-1.3-11.2 1.2-1.8 3-2.8 4.8-2.8 1.8 0 2.9 1 4.4 1 1.4 0 2.3-1 4.4-1 1.6 0 3.2.9 4.4 2.4-3.8 2.1-3.2 7.6.6 8.8z" />
            </svg>
            Download for Mac
          </a>
          <div className="mt-4 text-[13px] text-[#8b97c4]">
            Free · macOS 15 or later · Universal (Apple silicon &amp; Intel)
          </div>
          {/* Builds before 1.0 shipped without an updater, so they cannot pull
              this release themselves — those users have to come back once. */}
          <div className="mt-2 text-[12px] text-[#6f7bab]">
            Already have Melodash from an earlier download? Grab this version once —
            it updates itself from here on.
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 border-t border-[rgba(61,217,255,0.14)] py-10 px-[clamp(20px,5vw,54px)] max-w-[1220px] mx-auto">
        <div className="flex flex-wrap gap-5 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/appicon.png" alt="Melodash" className="w-10 h-10 rounded-[11px]" />
            <div>
              <div className="font-family-orbitron font-black tracking-[1px] text-[17px]">
                MELODASH
              </div>
              <div className="text-xs text-[#6f7cae] flex flex-wrap gap-x-2.5 gap-y-1 items-center mt-1">
                <span>Where singing meets arcade battle</span>
                <span className="hidden sm:inline text-white/10">|</span>
                <a href="/privacy" className="hover:text-[var(--cyan)] transition-colors no-underline">Privacy Policy</a>
                <span className="text-white/10">|</span>
                <a href="/support" className="hover:text-[var(--cyan)] transition-colors no-underline">Support</a>
                <span className="text-white/10">|</span>
                <a href="/releases" className="hover:text-[var(--cyan)] transition-colors no-underline">Releases</a>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-family-orbitron font-bold tracking-[0.5px] text-[13px] text-[#cfe8ff]">
              Built by the LumbazzZ Team
            </div>
            <div className="text-xs text-[#6f7cae] mt-1">
              Babono · Hercio · Shinta · Tami · Ujjawal
            </div>
          </div>
        </div>
      </footer>

      {/* ============ TIKTOK MODAL OVERLAY ============ */}
      {activeVideoIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-6">
          {/* Backdrop click close */}
          <div className="absolute inset-0 cursor-default" onClick={closeVideoModal} />

          {/* Close button */}
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 z-50 text-[#b9c4ec] hover:text-white text-3xl font-bold cursor-pointer w-10 h-10 flex items-center justify-center bg-black/50 rounded-full border-none"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Main Modal Card */}
          <div
            className="relative z-10 w-full max-w-[900px] h-[85vh] bg-[#080c26] rounded-[28px] border border-[rgba(61,217,255,0.3)] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column: Video Player */}
            <div className="relative flex-1 bg-black flex items-center justify-center h-[55%] md:h-full">
              <video
                src={videos[activeVideoIndex].src}
                autoPlay
                loop
                controls
                playsInline
                className="w-full h-full object-contain max-h-[80vh]"
              />

              {/* Prev Button */}
              <button
                onClick={prevVideo}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-colors border-none"
                aria-label="Previous video"
              >
                ‹
              </button>

              {/* Next Button */}
              <button
                onClick={nextVideo}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-colors border-none"
                aria-label="Next video"
              >
                ›
              </button>
            </div>

            {/* Right Column: Sidebar (Details and Comments) */}
            <div className="w-full md:w-[360px] h-[45%] md:h-full bg-[#0a0e2a] border-t md:border-t-0 md:border-l border-[rgba(255,255,255,0.08)] flex flex-col justify-between overflow-hidden">
              {/* Top area */}
              <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
                {/* Profile row */}
                <div className="flex items-center gap-3 mb-4">
                  <img src="/assets/appicon.png" alt="Melodash" className="w-10 h-10 rounded-[10px]" />
                  <div>
                    <div className="font-family-orbitron font-bold text-white text-sm">
                      {videos[activeVideoIndex].performer}
                    </div>
                    <div className="text-xs text-[#6f7cae]">Melodash Official</div>
                  </div>
                  <button className="ml-auto bg-[var(--cyan)] text-[#04071a] font-family-orbitron font-bold text-xs py-1 px-3.5 rounded-full hover:scale-105 active:scale-95 transition-transform border-none cursor-pointer">
                    Follow
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-[#b0bbe4] m-0 mb-3 leading-relaxed">
                  {videos[activeVideoIndex].description}
                </p>

                {/* Song tag */}
                <div className="flex items-center gap-2 text-[var(--cyan)] font-family-orbitron font-bold text-xs mb-5">
                  <span>🎵</span>
                  <span className="truncate">{videos[activeVideoIndex].song}</span>
                </div>

                {/* Action metrics row */}
                <div className="flex items-center gap-6 mb-6 border-y border-[rgba(255,255,255,0.08)] py-3">
                  <button
                    onClick={toggleLike}
                    className="flex items-center gap-2 cursor-pointer text-sm bg-none border-none text-[#eef1ff]"
                  >
                    <span className="text-lg transition-transform active:scale-150">
                      {likedVideos[activeVideoIndex] ? "❤️" : "🤍"}
                    </span>
                    <span className="text-[#b9c4ec] font-semibold">
                      {videos[activeVideoIndex].likes + (likedVideos[activeVideoIndex] ? 1 : 0)}
                    </span>
                  </button>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">💬</span>
                    <span className="text-[#b9c4ec] font-semibold">
                      {videos[activeVideoIndex].comments}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">🔗</span>
                    <span className="text-[#b9c4ec] font-semibold">
                      {videos[activeVideoIndex].shares}
                    </span>
                  </div>
                </div>

                {/* Comments Header */}
                <div className="text-xs font-family-orbitron font-bold text-[#6f7cae] tracking-[1px] mb-3 uppercase">
                  Comments ({videos[activeVideoIndex].comments})
                </div>

                {/* Comments List */}
                <div className="space-y-3.5">
                  {getVideoComments(activeVideoIndex).map((c, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-xs text-left">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[var(--cyan)] to-[var(--violet)] flex items-center justify-center font-bold text-[9px] text-[#04071a] flex-none">
                        {c.user[1].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white mb-0.5">{c.user}</div>
                        <div className="text-[#b0bbe4] leading-normal">{c.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Input Area */}
              <div className="p-4 bg-[#080b22] border-t border-[rgba(255,255,255,0.08)] flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Add comment..."
                  disabled
                  className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-full py-2 px-4 text-xs text-[#eef1ff] focus:outline-none placeholder-[#6f7cae]"
                />
                <button
                  disabled
                  className="bg-[rgba(255,255,255,0.08)] text-[#6f7cae] font-family-orbitron font-bold text-xs py-2 px-4 rounded-full border-none"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ============ MOBILE FULLSCREEN MENU OVERLAY ============ */}
      {menuOpen && (
        <div className="fixed inset-0 z-[150] bg-[#04071a]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 p-6">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-[clamp(18px,4vw,54px)] text-[#b9c4ec] hover:text-white text-3xl font-bold cursor-pointer border-none bg-none"
            aria-label="Close Menu"
          >
            ✕
          </button>

          <a
            href="#battle"
            onClick={() => setMenuOpen(false)}
            className="font-family-orbitron font-black text-2xl tracking-[2px] text-[#cfe8ff] hover:text-[var(--cyan)] transition-colors no-underline"
          >
            Why local
          </a>
          <a
            href="#score"
            onClick={() => setMenuOpen(false)}
            className="font-family-orbitron font-black text-2xl tracking-[2px] text-[#cfe8ff] hover:text-[var(--cyan)] transition-colors no-underline"
          >
            Scoring
          </a>
          <a
            href="#how"
            onClick={() => setMenuOpen(false)}
            className="font-family-orbitron font-black text-2xl tracking-[2px] text-[#cfe8ff] hover:text-[var(--cyan)] transition-colors no-underline"
          >
            How it works
          </a>
          <a
            href="#songs"
            onClick={() => setMenuOpen(false)}
            className="font-family-orbitron font-black text-2xl tracking-[2px] text-[#cfe8ff] hover:text-[var(--cyan)] transition-colors no-underline"
          >
            Songs
          </a>
          <a
            href="#tech"
            onClick={() => setMenuOpen(false)}
            className="font-family-orbitron font-black text-2xl tracking-[2px] text-[#cfe8ff] hover:text-[var(--cyan)] transition-colors no-underline"
          >
            Tech
          </a>

          {/* Mobile BGM Toggle */}
          <button
            onClick={toggleBGM}
            style={{
              color: "#b9c4ec",
              fontWeight: 700,
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="font-family-orbitron hover:text-[var(--cyan)] transition-colors"
          >
            {audioPlaying ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            )}
            <span>BGM</span>
          </button>

          {/* Mobile Download button */}
          <a
            href="/releases/Melodash-1.0.dmg"
            download
            onClick={() => setMenuOpen(false)}
            className="btn-nav-download text-lg px-8 py-3"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
