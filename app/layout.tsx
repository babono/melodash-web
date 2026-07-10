import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Melodash — Forget online duets. Clash face-to-face.",
  description: "One room. One mic. 2–5 friends taking turns while Melodash scores your pitch, your words, and your face in real time. The funniest performer has just as good a shot as the best singer.",
  keywords: ["Melodash", "Karaoke", "Local multiplayer", "Party game", "Apple Music", "Singing", "Pitch detector", "Face tracking"],
  authors: [{ name: "LumbazzZ Team" }],
  openGraph: {
    title: "Melodash — Forget online duets. Clash face-to-face.",
    description: "The local multiplayer party game where 2–5 friends clash face-to-face. One room. One mic. Endless chaotic fun.",
    type: "website",
    images: [
      {
        url: "/assets/hero-shot.webp",
        width: 1200,
        height: 750,
        alt: "Melodash Gameplay Mockup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melodash — Forget online duets. Clash face-to-face.",
    description: "The local multiplayer party game where 2–5 friends clash face-to-face. One room. One mic. Endless chaotic fun.",
    images: ["/assets/hero-shot.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
