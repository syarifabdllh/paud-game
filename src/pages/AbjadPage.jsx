import { useState } from 'react';
import Navbar from '../components/Navbar';
import { HURUF_ABJAD } from '../data/content';
import './AbjadPage.css';

export default function AbjadPage() {
  const [aktif, setAktif] = useState(null);

  return (
    <div className="abjad-page batik-bg page-container">
      <Navbar title="Huruf Abjad 🔤" />

      <p className="sub-info">Tap huruf untuk melihat contohnya!</p>

      <div className="abjad-grid">
        {HURUF_ABJAD.map((item) => (
          <button
            key={item.huruf}
            className={`abjad-card ${aktif === item.huruf ? 'aktif' : ''}`}
            style={{ '--warna': item.warna }}
            onClick={() => setAktif(aktif === item.huruf ? null : item.huruf)}
          >
            <span className="abjad-huruf">{item.huruf}</span>
            {aktif === item.huruf && (
              <div className="abjad-popup">
                <span className="popup-emoji">{item.emoji}</span>
                <span className="popup-teks">{item.contoh}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
