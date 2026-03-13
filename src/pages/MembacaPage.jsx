import { useState } from 'react';
import Navbar from '../components/Navbar';
import { KATA_BACA } from '../data/content';
import './MembacaPage.css';

export default function MembacaPage() {
  const [index, setIndex] = useState(0);
  const [step, setStep]   = useState(0); // 0=suku1, 1=suku2, 2=full
  const kata = KATA_BACA[index];

  function next() {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setIndex((index + 1) % KATA_BACA.length);
      setStep(0);
    }
  }
  function prev() {
    if (step > 0) {
      setStep(step - 1);
    } else {
      const prev = (index - 1 + KATA_BACA.length) % KATA_BACA.length;
      setIndex(prev);
      setStep(0);
    }
  }

  return (
    <div className="baca-page batik-bg page-container">
      <Navbar title="Ayo Membaca 📖" />

      {/* Progress */}
      <div className="baca-progress">
        {KATA_BACA.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === index ? 'aktif' : i < index ? 'done' : ''}`}
          />
        ))}
      </div>

      {/* Kartu baca */}
      <div className="baca-card" style={{ '--warna': kata.warna }}>
        <div className="baca-emoji">{kata.emoji}</div>

        <div className="suku-row">
          {kata.suku.map((s, i) => (
            <span
              key={i}
              className={`suku ${step >= i ? 'tampil' : 'sembunyi'} ${step === 2 ? 'full' : ''}`}
              style={{ '--warna': kata.warna }}
            >
              {s}
            </span>
          ))}
        </div>

        {step === 2 && (
          <div className="baca-full" style={{ color: kata.warna }}>
            {kata.kata}
          </div>
        )}

        <div className="baca-step-label">
          {step === 0 && <span>Suku kata pertama ▶</span>}
          {step === 1 && <span>Suku kata kedua ▶▶</span>}
          {step === 2 && <span>🎉 Gabungkan! Baca: <strong>{kata.kata}</strong></span>}
        </div>
      </div>

      {/* Navigasi */}
      <div className="baca-nav">
        <button className="btn btn-kuning" onClick={prev}>◀ Kembali</button>
        <button
          className="btn btn-hijau"
          onClick={next}
        >
          {step < 2 ? 'Lanjut ▶' : index < KATA_BACA.length - 1 ? 'Kata Baru ▶' : '✅ Selesai!'}
        </button>
      </div>
    </div>
  );
}
