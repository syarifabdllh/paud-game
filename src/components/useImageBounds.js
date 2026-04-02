import { useState, useEffect } from 'react';

export default function useImageBounds(imgRef) {
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    const calculateBounds = () => {
      const img = imgRef.current;
      // Pastikan gambar sudah load dan memiliki ukuran asli
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Ukuran wadah layar (container) tempat gambar berada
      const containerW = img.clientWidth;
      const containerH = img.clientHeight;

      // Ukuran asli (intrinsic) dari file gambar itu sendiri
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      // Rasio perbandingan
      const containerRatio = containerW / containerH;
      const imgRatio = imgW / imgH;

      let renderedW, renderedH, offsetX, offsetY;

      if (imgRatio > containerRatio) {
        // Gambar lebih memanjang ke samping dibanding layar (contoh: di Tablet)
        // Akan ada sisa ruang (gap) di atas dan bawah gambar
        renderedW = containerW;
        renderedH = containerW / imgRatio;
        offsetX = 0;
        offsetY = (containerH - renderedH) / 2;
      } else {
        // Gambar lebih tinggi dibanding layar (contoh: di HP saat orientasi tertentu)
        // Akan ada sisa ruang (gap) di kiri dan kanan gambar
        renderedH = containerH;
        renderedW = containerH * imgRatio;
        offsetX = (containerW - renderedW) / 2;
        offsetY = 0;
      }

      setBounds({ renderedW, renderedH, offsetX, offsetY });
    };

    // Hitung saat pertama kali render
    calculateBounds();

    // Hitung ulang setiap kali layar HP diputar / di-resize
    window.addEventListener('resize', calculateBounds);
    
    // Hitung ulang jika gambar baru saja selesai di-load
    if (imgRef.current) {
      imgRef.current.addEventListener('load', calculateBounds);
    }

    return () => {
      window.removeEventListener('resize', calculateBounds);
      if (imgRef.current) {
        imgRef.current.removeEventListener('load', calculateBounds);
      }
    };
  }, [imgRef]);

  return bounds;
}