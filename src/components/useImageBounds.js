import { useState, useEffect } from 'react';

// Menghitung posisi & ukuran gambar aktual di layar (dengan object-fit: contain)
export default function useImageBounds(imgRef) {
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    const calculate = () => {
      const img = imgRef.current;
      if (!img) return;

      const containerW = window.innerWidth;
      const containerH = window.innerHeight;
      const imgNaturalW = img.naturalWidth;
      const imgNaturalH = img.naturalHeight;

      if (!imgNaturalW || !imgNaturalH) return;

      const containerRatio = containerW / containerH;
      const imgRatio = imgNaturalW / imgNaturalH;

      let renderedW, renderedH, offsetX, offsetY;

      if (imgRatio > containerRatio) {
        // Letterbox atas-bawah
        renderedW = containerW;
        renderedH = containerW / imgRatio;
        offsetX = 0;
        offsetY = (containerH - renderedH) / 2;
      } else {
        // Letterbox kiri-kanan
        renderedH = containerH;
        renderedW = containerH * imgRatio;
        offsetX = (containerW - renderedW) / 2;
        offsetY = 0;
      }

      setBounds({ renderedW, renderedH, offsetX, offsetY });
    };

    const img = imgRef.current;
    if (img?.complete) calculate();
    else img?.addEventListener('load', calculate);

    window.addEventListener('resize', calculate);
    return () => {
      img?.removeEventListener('load', calculate);
      window.removeEventListener('resize', calculate);
    };
  }, [imgRef]);

  return bounds;
}