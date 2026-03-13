import { useState } from 'react';
import Navbar from '../components/Navbar';
import { HURUF_VOKAL } from '../data/content';
import './VokalPage.css';

export default function VokalPage() {
  const [aktif, setAktif] = useState(0);
  const item = HURUF_VOKAL[aktif];

  return (
    <div className="vokal-page batik-bg page-container">
      <Navbar title="Huruf Vokal 🗣️" />

      {/* Kartu besar huruf aktif */}
      <div className="vokal-hero" style={{ '--warna': item.warna }}>
        <div className="vokal-big-emoji">{item.emoji}</div>
        <div className="vokal-big-huruf">{item.huruf}</div>
        <div className="vokal-desc">{item.deskripsi}</div>
        <div className="vokal-contoh">Contoh: <strong>{item.contoh}</strong></div>
      </div>

      {/* Tombol pilih vokal */}
      <div className="vokal-pilihan">
        {HURUF_VOKAL.map((v, i) => (
          <button
            key={v.huruf}
            className={`vokal-btn ${i === aktif ? 'aktif' : ''}`}
            style={{ '--warna': v.warna }}
            onClick={() => setAktif(i)}
          >
            {v.huruf}
          </button>
        ))}
      </div>

      {/* Pola vokal */}
      <div className="vokal-pola">
        <p className="pola-label">Ingat ya! Huruf vokal ada 5:</p>
        <div className="pola-row">
          {HURUF_VOKAL.map((v) => (
            <span
              key={v.huruf}
              className="pola-chip"
              style={{ background: v.warna }}
            >
              {v.huruf}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
