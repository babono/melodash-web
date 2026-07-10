"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  style: React.CSSProperties;
}

export default function CosmicBackground({ starDensity = 90 }: { starDensity?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const palette = [
      '#eef1ff',
      '#eef1ff',
      '#eef1ff',
      'var(--cyan, #3dd9ff)',
      'var(--violet, #9966ff)',
      '#66ccff'
    ];
    const generated: Star[] = [];

    for (let i = 0; i < starDensity; i++) {
      const big = Math.random() < 0.12;
      const size = big ? (Math.random() * 2.4 + 2.2) : (Math.random() * 1.5 + 0.7);
      const col = palette[Math.floor(Math.random() * palette.length)];
      
      generated.push({
        id: i,
        style: {
          position: 'absolute',
          left: `${(Math.random() * 100).toFixed(2)}%`,
          top: `${(Math.random() * 100).toFixed(2)}%`,
          width: `${size.toFixed(2)}px`,
          height: `${size.toFixed(2)}px`,
          borderRadius: '50%',
          background: col,
          boxShadow: `0 0 ${big ? 8 : 4}px ${col}`,
          opacity: parseFloat((Math.random() * 0.55 + 0.35).toFixed(2)),
          animation: `tw ${(Math.random() * 3 + 2).toFixed(2)}s ease-in-out ${(Math.random() * 4).toFixed(2)}s infinite`,
          animationPlayState: 'var(--om-play, running)'
        }
      });
    }

    setTimeout(() => {
      setStars(generated);
    }, 0);
  }, [starDensity]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* rotating nebula (bg-stars) */}
      <img
        src="/assets/bg-stars.png"
        alt=""
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "180vmax",
          height: "180vmax",
          transform: "translate(-50%,-50%)",
          objectFit: "cover",
          opacity: 0.8,
          animation: "spin 120s linear infinite, nebScale 25s ease-in-out infinite",
          animationPlayState: "var(--om-play, running)",
        }}
      />
      <img
        src="/assets/bg-stars.png"
        alt=""
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "200vmax",
          height: "200vmax",
          transform: "translate(-50%,-50%)",
          objectFit: "cover",
          opacity: 0.4,
          mixBlendMode: "screen",
          animation: "spinRev 180s linear infinite, nebScale 35s ease-in-out infinite",
          animationPlayState: "var(--om-play, running)",
        }}
      />

      {/* twinkling stars */}
      {stars.map((s) => (
        <div key={s.id} style={s.style} />
      ))}

      {/* comet (top-right → bottom-left) */}
      <img
        src="/assets/comet.png"
        alt=""
        style={{
          position: "absolute",
          top: "-4%",
          right: "-12%",
          width: "200px",
          animation: "cometFly 13s linear 1.5s infinite",
          animationPlayState: "var(--om-play, running)",
        }}
      />

      {/* floating planet, lower-left */}
      <div
        style={{
          position: "absolute",
          left: "2%",
          top: "640px",
          animation: "floatY 5.5s ease-in-out infinite",
          animationPlayState: "var(--om-play, running)",
        }}
      >
        <img
          src="/assets/planet.png"
          alt=""
          style={{
            width: "240px",
            display: "block",
            animation: "spin 45s linear infinite",
            animationPlayState: "var(--om-play, running)",
          }}
        />
      </div>

      {/* UFO purple, top-left */}
      <div
        style={{
          position: "absolute",
          left: "3%",
          top: "300px",
          animation: "floatX 4.8s ease-in-out infinite",
          animationPlayState: "var(--om-play, running)",
        }}
      >
        <img
          src="/assets/ufo-purple.png"
          alt=""
          style={{
            width: "170px",
            display: "block",
            animation: "tilt 6.5s ease-in-out infinite",
            animationPlayState: "var(--om-play, running)",
          }}
        />
      </div>

      {/* UFO red, right */}
      <div
        style={{
          position: "absolute",
          right: "1%",
          top: "360px",
          animation: "floatX 5.6s ease-in-out .8s infinite",
          animationPlayState: "var(--om-play, running)",
        }}
      >
        <img
          src="/assets/ufo-red.png"
          alt=""
          style={{
            width: "220px",
            display: "block",
            animation: "tilt 7.4s ease-in-out infinite",
            animationPlayState: "var(--om-play, running)",
          }}
        />
      </div>

      {/* UFO green, mid-left lower */}
      <div
        style={{
          position: "absolute",
          left: "4%",
          top: "2050px",
          animation: "floatX 6.2s ease-in-out infinite",
          animationPlayState: "var(--om-play, running)",
        }}
      >
        <img
          src="/assets/ufo-green.png"
          alt=""
          style={{
            width: "150px",
            display: "block",
            transform: "rotate(12deg)",
            animation: "tilt 8s ease-in-out infinite",
            animationPlayState: "var(--om-play, running)",
          }}
        />
      </div>

      {/* UFO yellow, mid-right */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "1620px",
          animation: "floatX 5s ease-in-out .4s infinite",
          animationPlayState: "var(--om-play, running)",
        }}
      >
        <img
          src="/assets/ufo-yellow.png"
          alt=""
          style={{
            width: "128px",
            display: "block",
            transform: "rotate(-12deg)",
            animation: "tilt 7s ease-in-out infinite",
            animationPlayState: "var(--om-play, running)",
          }}
        />
      </div>

      {/* second small planet */}
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "2500px",
          animation: "floatY 6.5s ease-in-out infinite",
          animationPlayState: "var(--om-play, running)",
        }}
      >
        <img
          src="/assets/planet.png"
          alt=""
          style={{
            width: "120px",
            display: "block",
            animation: "spinRev 60s linear infinite",
            animationPlayState: "var(--om-play, running)",
          }}
        />
      </div>
    </div>
  );
}
