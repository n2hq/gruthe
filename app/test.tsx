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

const [adsScriptLoaded, setAdsScriptLoaded] = useState(false);
const [adsbygoogle, setAdsbygoogle] = useState(null)
useEffect(() => {
  const adsbygoogle = (window as any).adsbygoogle;
  setAdsbygoogle(adsbygoogle)

}, [])