import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Music, Code2, Map, Rocket, Video, Shield, Lock, Smartphone, Brain } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shuban Authentication — Unified AI Platform Hub" },
      {
        name: "description",
        content:
          "One sign-in for every Shuban app: CleverPath, MusicPath, CodePath, ShubanMaps, Lightyears AI, and ImVid AI. Available on Apple, Windows & Android.",
      },
      { property: "og:title", content: "Shuban Authentication — Unified AI Platform Hub" },
      {
        property: "og:description",
        content:
          "One sign-in for every Shuban app: CleverPath, MusicPath, CodePath, ShubanMaps, Lightyears AI, and ImVid AI.",
      },
    ],
  }),
  component: Index,
});

const apps = [
  {
    name: "CleverPath AI",
    tag: "Learning",
    description: "Adaptive AI tutor that builds personalized learning paths.",
    url: "https://shubanai-cleverpathai.vercel.app",
    icon: Sparkles,
  },
  {
    name: "MusicPath AI",
    tag: "Audio",
    description: "Compose, remix and explore music powered by AI.",
    url: "https://shubanai-musicpathai.vercel.app",
    icon: Music,
  },
  {
    name: "CodePath AI",
    tag: "Developer",
    description: "Your AI pair-programmer for any language or framework.",
    url: "https://shubanai-codepathai.vercel.app",
    icon: Code2,
  },
  {
    name: "Shuban Maps",
    tag: "Navigation",
    description: "Smart maps with AI-driven routing and discovery.",
    url: "https://shubanmaps.vercel.app",
    icon: Map,
  },
  {
    name: "Lightyears AI",
    tag: "Research",
    description: "Reach further. Deep AI research at light-speed.",
    url: "https://lightyearsai.vercel.app",
    icon: Rocket,
  },
  {
    name: "ImVid AI",
    tag: "Media",
    description: "Generate stunning images and videos from a prompt.",
    url: "https://imvid-ai.vercel.app",
    icon: Video,
  },
  {
    name: "Shuban AI",
    tag: "Assistant",
    description: "The flagship Shuban AI assistant — versatile and conversational.",
    url: "https://shubanai1-19.vercel.app",
    icon: Brain,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">Shuban Authentication</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#apps" className="text-muted-foreground transition hover:text-foreground">
              Apps
            </a>
            <Link to="/connect" className="text-muted-foreground transition hover:text-foreground">
              Connect device
            </Link>
            <Link to="/install" className="text-muted-foreground transition hover:text-foreground">
              Install
            </Link>
            <Link
              to="/connect"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Connect this device
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Lock className="h-3 w-3" />
              One identity. Every Shuban app.
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
              The unified hub for the
              <span className="block bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                Shuban universe.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Sign in once with Shuban Authentication and instantly access every app you need —
              learning, music, code, maps, research and media. All in one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/connect"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Smartphone className="h-4 w-4" /> Connect this device
              </Link>
              <Link
                to="/install"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition hover:bg-accent"
              >
                Install as app
              </Link>
              <a
                href="#apps"
                className="inline-flex items-center gap-2 rounded-md border border-transparent px-6 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Explore apps <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Apps grid */}
      <section id="apps" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">All apps</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight">Six tools. One sign-in.</h2>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <a
                  key={app.name}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col gap-4 bg-card p-8 transition hover:bg-accent"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {app.tag}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">{app.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{app.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Install CTA */}
      <section id="install" className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Take Shuban with you, everywhere.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
            Install Shuban Authentication as a native app on Apple, Windows and Android. Works
            offline-first. No app store required.
          </p>
          <Link
            to="/install"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary-foreground/90"
          >
            See install instructions <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} Shuban Authentication. All rights reserved.</p>
          <p>Built as the front door to the Shuban universe.</p>
        </div>
      </footer>
    </div>
  );
}
