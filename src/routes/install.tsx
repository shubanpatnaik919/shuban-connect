import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Apple, Monitor, Smartphone, Shield } from "lucide-react";

export const Route = createFileRoute("/install")({
  head: () => ({
    meta: [
      { title: "Install Shuban Authentication on any device" },
      {
        name: "description",
        content:
          "Step-by-step instructions to install Shuban Authentication as a native app on iPhone, iPad, Mac, Windows and Android.",
      },
      { property: "og:title", content: "Install Shuban Authentication on any device" },
      {
        property: "og:description",
        content:
          "Install Shuban as a native app on Apple, Windows and Android in under a minute.",
      },
    ],
  }),
  component: InstallPage,
});

const guides = [
  {
    icon: Apple,
    platform: "Apple — iPhone & iPad",
    steps: [
      "Open this site in Safari (must be Safari, not Chrome).",
      "Tap the Share button (square with an arrow pointing up) at the bottom.",
      "Scroll down and tap “Add to Home Screen”.",
      "Tap “Add” in the top-right corner.",
      "The Shuban icon now lives on your Home Screen — open it like any app.",
    ],
  },
  {
    icon: Apple,
    platform: "Apple — Mac",
    steps: [
      "Open this site in Safari 17 or later.",
      "Click File in the top menu bar.",
      "Choose “Add to Dock…”.",
      "Confirm the name “Shuban Authentication” and click Add.",
      "Launch it from the Dock or Launchpad just like a native Mac app.",
    ],
  },
  {
    icon: Monitor,
    platform: "Windows 10 / 11",
    steps: [
      "Open this site in Microsoft Edge or Google Chrome.",
      "Click the install icon (a small monitor with a down arrow) on the right side of the address bar.",
      "If you don’t see it, open the menu (⋯) → Apps → “Install this site as an app”.",
      "Click “Install” in the popup.",
      "Shuban will appear in your Start Menu and can be pinned to the taskbar.",
    ],
  },
  {
    icon: Smartphone,
    platform: "Android",
    steps: [
      "Open this site in Google Chrome.",
      "Tap the menu (⋮) in the top-right corner.",
      "Tap “Install app” or “Add to Home screen”.",
      "Tap “Install” to confirm.",
      "Open Shuban from your app drawer like any other Android app.",
    ],
  },
];

function InstallPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">Shuban Authentication</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">Installation</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight">
            Install Shuban on any device.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Shuban Authentication works as a Progressive Web App, so you can install it directly
            from your browser — no app store, no download size, instant updates.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <div
                key={guide.platform}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">{guide.platform}</h2>
                </div>
                <ol className="mt-6 space-y-3">
                  {guide.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-xs font-semibold">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-foreground/90">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-accent p-8">
          <h3 className="text-lg font-semibold">Why a PWA instead of an app store?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Native app store approvals take days and require separate builds for every platform.
            With a Progressive Web App, Shuban installs in seconds, updates automatically, and
            works the same on iPhone, Android, Mac and Windows — all from one codebase.
          </p>
        </div>
      </section>
    </div>
  );
}
