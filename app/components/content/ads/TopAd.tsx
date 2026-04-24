// app/components/AdComponent.tsx
import { useEffect, useState } from "react";
import { adInfo, testAdInfo } from "~/lib/json";
import { config } from "~/lib/lib";
import { ClientOnly } from "./ClientOnly";

export function TopAd() {
    const [adsLoaded, setAdsLoaded] = useState(false);
    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
        setIsClient(true);
    }, []);




    if (import.meta.env.VITE_ENV !== "prod" || !isClient) {
        return null; // Don't render ads in development
    }

    return (
        <div
            className={`max-w-[1000px] min-h-[90px] bg-blue-50
                mx-auto w-full mt-8 flex place-items-center 
                place-content-center font-light text-[14px]
                `}
        >Ads by google
            {
                adInfo.adslot !== testAdInfo.adslot && adInfo.clientId !== testAdInfo.clientId &&
                <div suppressHydrationWarning>
                    <ins
                        className="adsbygoogle"
                        style={{ display: "block" }}
                        data-ad-client={adInfo.clientId}
                        data-ad-slot={adInfo.adslot}
                        data-ad-format={adInfo.format}
                        data-full-width-responsive={adInfo.responsive}
                    ></ins>
                </div>
            }
        </div>
    );
}
