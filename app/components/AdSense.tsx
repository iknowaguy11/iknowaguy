import Script from 'next/script'
import React from 'react'

type AdSenseTypes = {
    pid: string
}

const AdSense = ({pid} : AdSenseTypes) => {
  return (
      <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pid}`} 
          crossOrigin="anonymous"
          strategy='afterInteractive'
      />
  )
}

export default AdSense