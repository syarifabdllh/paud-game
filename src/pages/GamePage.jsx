import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { GAME_SOAL } from '../data/content';
import './GamePage.css';

const TOTAL = GAME_SOAL.length;

export default function GamePage() {
  const [soalIndex, setSoalIndex]   = useState(0);
  const [pilih, setPilih]           = useState(null);   // jawaban dipilih
  const [skor, setSkor]             = useState(0);
  const [selesai, setSelesai]       = useState(false);
  const [shake, setShake]           = useState(false);

  const soal = GAME_SOAL[soalIndex];

  function jawab(pilihan) {
    if (pilih !== null) return;
    setPilih(pilihan);

    if (pilihan === soal.jawaban) {
      setSkor((s) => s + 1);
      setTimeout(lanjut, 1200);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(lanjut, 1500);
    }
  }

  function lanjut() {
    if (soalIndex + 1 >= TOTAL) {
      setSelesai(true);
    } else {
      setSoalIndex((i) => i + 1);
      setPilih(null);
    }
  }

  function ulang() {
    setSoalIndex(0);
    setPilih(null);
    setSkor(0);
    setSelesai(false);
  }

  if (selesai) return <HasilScreen skor={skor} total={TOTAL} ulang={ulang} />;

  return (
    <div className="game-page batik-bg page-container">
      <Navbar title="Game Time! 🎮" />

      {/* Header skor */}
      <div className="game-header">
        <div className="skor-box">⭐ {skor} / {TOTAL}</div>
        <div className="soal-num">Soal {soalIndex + 1} dari {TOTAL}</div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((soalIndex) / TOTAL) * 100}%` }}
        />
      </div>

      {/* Kartu soal */}
      <div className={`soal-card ${shake ? 'shake' : ''}`}>
        <p className="soal-pertanyaan">{soal.pertanyaan}</p>
        <div className="soal-gambar">{soal.gambar}</div>
        {pilih && pilih !== soal.jawaban && (
          <div className="hint-box">💡 {soal.hint}</div>
        )}
      </div>

      {/* Pilihan jawaban */}
      <div className="pilihan-grid">
        {soal.pilihan.map((p) => {
          let status = '';
          if (pilih) {
            if (p === soal.jawaban) status = 'benar';
            else if (p === pilih) status = 'salah';
          }
          return (
            <button
              key={p}
              className={`pilihan-btn ${status}`}
              onClick={() => jawab(p)}
              disabled={pilih !== null}
            >
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HasilScreen({ skor, total, ulang }) {
  const persen = Math.round((skor / total) * 100);
  const pesan = persen === 100
    ? '🏆 Luar biasa! Kamu hebat!'
    : persen >= 70
    ? '🎉 Bagus sekali! Terus semangat!'
    : '💪 Jangan menyerah, coba lagi ya!';

  return (
    <div className="hasil-screen batik-bg page-container">
      <div className="hasil-card">
        <div className="hasil-emoji">
          {persen === 100 ? '🏆' : persen >= 70 ? '🎉' : '😊'}
        </div>
        <h2 className="hasil-judul">Selesai!</h2>
        <div className="hasil-skor">{skor} <span>/ {total}</span></div>
        <p className="hasil-pesan">{pesan}</p>
        <div className="hasil-stars">
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ opacity: persen >= (i + 1) * 34 ? 1 : 0.25 }}>⭐</span>
          ))}
        </div>
        <button className="btn btn-hijau" onClick={ulang}>🔄 Main Lagi</button>
      </div>
    </div>
  );
}
