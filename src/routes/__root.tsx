import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { InstallPrompt } from "@/components/install-prompt";
import { AuthProvider } from "@/lib/auth-context";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: "Shuban Authentication" },
      {
        name: "description",
        content: "Unified authentication for the Shuban app universe.",
      },
      { name: "author", content: "Shuban" },
      { name: "theme-color", content: "#000000" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Shuban Auth" },
      { name: "mobile-web-app-capable", content: "yes" },
      { property: "og:title", content: "Shuban Authentication" },
      {
        property: "og:description",
        content: "Unified authentication for the Shuban app universe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Shuban Authentication" },
      { name: "description", content: "Shuban Connect is a unified platform that links multiple AI-powered applications and services." },
      { property: "og:description", content: "Shuban Connect is a unified platform that links multiple AI-powered applications and services." },
      { name: "twitter:description", content: "Shuban Connect is a unified platform that links multiple AI-powered applications and services." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1a046612-49d4-4905-aace-37719b9874bf/id-preview-a6c7c3a2--e3c8fc84-1a31-4c76-b924-4448fc0afde0.lovable.app-1776955484167.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1a046612-49d4-4905-aace-37719b9874bf/id-preview-a6c7c3a2--e3c8fc84-1a31-4c76-b924-4448fc0afde0.lovable.app-1776955484167.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", href: "/icon-512.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <InstallPrompt />
    </AuthProvider>
  );
}
