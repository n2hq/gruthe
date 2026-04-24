import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import type { HeadersFunction, LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import { useEffect, useRef, useState } from "react";
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";
import { SliderProvider } from "./context/SliderContext";
import { AddPhotoDialogProvider } from "./context/AddPhotoDialogContext";
import { EditPhotoDialogProvider } from "./context/EditPhotoDialogContext";
import { AddVideoDialogProvider } from "./context/AddVideoDialogContext";
import { VideoSliderProvider } from "./context/VideoSliderContext";
import EditVideoDialog from "./routes/web/account/portfolio/business/videos/videos/EditVideoDialog";
import { EditVideoDialogProvider } from "./context/EditVideoDialogContext";
import { OnlineStatusProvider } from "./context/OnlineStatusContext";
import { OperationProvider } from "./context/OperationContext";
import { CustomNetworkError, isNetworkError, NetworkErrorBoundary } from "./components/utils/NetworkErrorBoundary";
import LoadingMessage from "./components/content/LoadingMessage";
import { WriteReviewAltProvider } from "./context/WriteReviewAltContext";
import { ShareDialogProvider } from "./context/ShareDialogContext";


export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];


export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    "Surrogate-Control": "no-store",
  };
};


export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation()
  const [hydrated, setHydrated] = useState(false);

  // Use a ref to track if we've started NProgress
  const progressStarted = useRef(false);

  // Handle NProgress based on navigation state
  useEffect(() => {
    if (navigation.state === "loading" && !progressStarted.current) {
      NProgress.start();
      progressStarted.current = true;
    } else if (navigation.state === "idle" && progressStarted.current) {
      NProgress.done();
      progressStarted.current = false;
    }
  }, [navigation.state]);

  // Handle hydration status - separate from navigation
  useEffect(() => {
    // Mark as hydrated immediately on client mount
    setHydrated(true);
  }, []); // Empty array = runs once after hydration

  // Calculate loading state AFTER hydration is complete
  // This ensures server and client match (both show false for loading)
  const loading = hydrated && navigation.state !== "idle";

  // Handle route errors (keep as is)
  const error = useRouteError();

  if (isNetworkError(error) || error instanceof CustomNetworkError) {
    return <NetworkErrorBoundary />;
  }

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            {error.status} {error.statusText}
          </h1>
          <p className="mt-4 text-xl">{error.data}</p>
        </div>
      </div>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/gruthe5.png?v=3" type="image/png" />


        {
          import.meta.env.VITE_ENV === "prod" && (
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6158119458012973"
              crossOrigin="anonymous"
              onError={(e) => {
                // Silent fail - just log to console in development
                if (process.env.NODE_ENV === 'development') {
                  console.warn('AdSense script failed to load');
                }
                // You can also remove the failed script element
                (e.target as HTMLScriptElement)?.remove();
              }}
            />
          )
        }
        <Meta />
        <Links />
      </head>
      <body>

        {loading && <LoadingMessage loading={loading} />}
        <NotificationProvider>
          <OperationProvider>
            <VideoSliderProvider>
              <SliderProvider>
                <EditVideoDialogProvider>
                  <EditPhotoDialogProvider>
                    <AddPhotoDialogProvider>
                      <AddVideoDialogProvider>
                        <AuthProvider>
                          <OnlineStatusProvider>
                            <WriteReviewAltProvider>
                              <ShareDialogProvider>
                                {children}
                              </ShareDialogProvider>
                            </WriteReviewAltProvider>

                          </OnlineStatusProvider>
                        </AuthProvider>
                      </AddVideoDialogProvider>
                    </AddPhotoDialogProvider>
                  </EditPhotoDialogProvider>
                </EditVideoDialogProvider>
              </SliderProvider>
            </VideoSliderProvider>
          </OperationProvider>
        </NotificationProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

