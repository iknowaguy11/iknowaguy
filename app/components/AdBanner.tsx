'use client'
import React, { useEffect } from 'react'

type AdBannerTypes = {
    dataAdSlot: string,
    dataAdFormat: string,
    dataFullWidthResponsive: string
}

const AdBanner = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }: AdBannerTypes) => {
    useEffect(() => {
        try {
            const adsbygoogle = (window as any).adsbygoogle || [];

            // Check if adsbygoogle exists and is not loaded
            if (adsbygoogle && !adsbygoogle.loaded) {
                adsbygoogle.push({});
            }
        } catch (error) {
            console.error("Error initializing Google Ads:", error);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-4988989011774509"
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
        ></ins>
    );
}

export default AdBanner;
