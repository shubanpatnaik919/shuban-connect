import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Shield, ArrowLeft, LogOut, Loader2, Check } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Shuban Authentication" },
      { name: "description", content: "Manage your Shuban account." },
      { property: "og:title", content: "Account — Shuban Authentication" },
      { property: "og:description", content: "Manage your Shuban account." },
    ],
  }),
  component: AccountPage,
});

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
}

function AccountPage() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("id, display_name, avatar_url")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile(data);
          setDisplayName(data.display_name ?? "");
        }
      });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim() })
      .eq("id", user.id);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const initial = (displayName || user.email || "S").charAt(0).toUpperCase();

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
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
            {initial}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {profile?.display_name || "Your account"}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Update how your name appears across Shuban apps.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="displayName" className="text-sm font-medium">
                Display name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={50}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={user.email ?? ""}
                disabled
                className="mt-1.5 w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saved && <Check className="h-4 w-4" />}
              {saved ? "Saved" : "Save changes"}
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-lg font-semibold">Session</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign out from this device. You'll need to sign in again to continue.
          </p>
          <button
            onClick={handleSignOut}
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </main>
    </div>
  );
}
