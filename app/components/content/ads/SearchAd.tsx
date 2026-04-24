import React, { useEffect, useState } from 'react'
import { adInfo, testAdInfo } from '~/lib/json';
import { ClientOnly } from './ClientOnly';

const SearchAd = () => {
    const [adsLoaded, setAdsLoaded] = useState(false);
    const [env, setEnv] = useState('prod')

    useEffect(() => {
        const adsbygoogle = (window as any).adsbygoogle;

        if (import.meta.env.VITE_ENV === env && adInfo.adslot !== testAdInfo.adslot && adInfo.clientId !== testAdInfo.clientId) {
            try {
                // Ensure AdSense script is loaded
                if (typeof window !== "undefined") {

                    requestAnimationFrame(() => {
                        if (adsbygoogle && !adsbygoogle.loaded) {
                            (adsbygoogle as any[]).push({});
                            setAdsLoaded(true);
                        }


                        if (adsbygoogle && adsbygoogle.loaded) {
                            setAdsLoaded(true)
                        }
                    })
                }
            } catch (e) {
                //console.error("AdSense error:", e);
            }

        }
    }, []);



    if (import.meta.env.VITE_ENV !== env || !adsLoaded) {
        return null; // Don't render ads in development
    }

    return (
        <div
            className={`max-w-full overflow-hidden min-h-[90px] bg-blue-50
                    mx-auto w-full mt-4 mb-4 flex place-items-center 
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

export default SearchAd
