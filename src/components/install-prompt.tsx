import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferred || hidden) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-border bg-card p-4 shadow-2xl">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Install Shuban Authentication</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Connect this device for one-tap access to all Shuban apps.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={async () => {
                await deferred.prompt();
                const { outcome } = await deferred.userChoice;
                if (outcome === "accepted") setDeferred(null);
              }}
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Install
            </button>
            <button
              onClick={() => setHidden(true)}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-accent"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={() => setHidden(true)}
          className="text-muted-foreground transition hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
