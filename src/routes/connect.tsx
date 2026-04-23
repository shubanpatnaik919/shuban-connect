import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Shield, Copy, Check, Smartphone, Monitor, Laptop, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect Device — Shuban Authentication" },
      {
        name: "description",
        content:
          "Pair this device with Shuban Authentication to sign in to every Shuban app with a single tap.",
      },
      { property: "og:title", content: "Connect Device — Shuban Authentication" },
      {
        property: "og:description",
        content: "Pair your device with Shuban Authentication for unified sign-in.",
      },
    ],
  }),
  component: ConnectPage,
});

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getDeviceInfo() {
  if (typeof navigator === "undefined") return { name: "This device", icon: Monitor };
  const ua = navigator.userAgent;
  if (/iPhone|Android.*Mobile/.test(ua)) return { name: "Mobile device", icon: Smartphone };
  if (/iPad|Tablet/.test(ua)) return { name: "Tablet", icon: Smartphone };
  if (/Macintosh/.test(ua)) return { name: "Mac", icon: Laptop };
  if (/Windows/.test(ua)) return { name: "Windows PC", icon: Monitor };
  return { name: "This device", icon: Monitor };
}

function ConnectPage() {
  const [code, setCode] = useState("------");
  const [seconds, setSeconds] = useState(30);
  const [copied, setCopied] = useState(false);
  const [device, setDevice] = useState<{ name: string; icon: typeof Monitor }>({
    name: "This device",
    icon: Monitor,
  });
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    setDevice(getDeviceInfo());
    let id = localStorage.getItem("shuban_device_id");
    if (!id) {
      id = "SH-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      localStorage.setItem("shuban_device_id", id);
    }
    setDeviceId(id);
    setCode(generateCode());
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setCode(generateCode());
          return 30;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const DeviceIcon = device.icon;
  const progress = (seconds / 30) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
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
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">Device pairing</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Connect this device.
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Use the rotating code below to link this device with your Shuban account. Once paired,
            you can sign into every Shuban app with one tap.
          </p>
        </div>

        {/* Device card */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <DeviceIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Detected device
              </p>
              <p className="text-lg font-semibold">{device.name}</p>
              <p className="text-xs text-muted-foreground">ID · {deviceId}</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
              Ready to pair
            </div>
          </div>

          {/* Code display */}
          <div className="mt-8 rounded-xl bg-primary p-8 text-primary-foreground">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/60">
                Pairing code
              </p>
              <div className="flex items-center gap-2 text-xs text-primary-foreground/60">
                <RefreshCw className="h-3 w-3" />
                Refreshes in {seconds}s
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="font-mono text-5xl font-bold tracking-[0.3em] tabular-nums md:text-6xl">
                {code.slice(0, 3)} {code.slice(3)}
              </p>
              <button
                onClick={copy}
                className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-primary-foreground/10 text-primary-foreground transition hover:bg-primary-foreground/20"
                aria-label="Copy code"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
            <div className="mt-6 h-1 overflow-hidden rounded-full bg-primary-foreground/10">
              <div
                className="h-full bg-primary-foreground transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-lg font-semibold">How to finish pairing</h2>
          <ol className="mt-4 space-y-3 text-sm">
            {[
              "Open any Shuban app on another device you're already signed into.",
              "Go to Settings → Devices → Add a new device.",
              "Enter the 6-digit code shown above before it expires.",
              "This device is now connected to your Shuban account.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-foreground/90">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Codes are generated locally on your device and never leave it until you confirm the pair.
        </div>
      </section>
    </div>
  );
}
