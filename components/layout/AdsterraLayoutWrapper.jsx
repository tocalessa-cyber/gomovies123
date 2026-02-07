// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-75a330c0010036df621f28cf1fa626d0');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/75a330c0010036df621f28cf1fa626d0/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/af/8a/3e/af8a3e31911498739f710f2973e1c485.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="8ad6af416314aafc6add60c81ac98829"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/8a/d6/af/8ad6af416314aafc6add60c81ac98829.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}