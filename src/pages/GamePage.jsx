import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GamePage.css';

const SOAL = [
  { id: 1,  jawaban: 'Apel',    pilihan: ['Apel', 'Mangga', 'Pisang', 'Jeruk'] },
  { id: 2,  jawaban: 'Obat',    pilihan: ['Lampu', 'Obat', 'Kulkas', 'Jam'] },
  { id: 3,  jawaban: 'Jam',     pilihan: ['Lampu', 'Meja', 'Nampan', 'Jam'] },
  { id: 4,  jawaban: 'Gunting', pilihan: ['Lampu', 'Meja', 'Gunting', 'Jam'] },
  { id: 5,  jawaban: 'Dompet',  pilihan: ['Dompet', 'Meja', 'Gunting', 'Jam'] },
  { id: 6,  jawaban: 'Meja',    pilihan: ['Dompet', 'Handphone', 'Gunting', 'Meja'] },
  { id: 7,  jawaban: 'Lampu',   pilihan: ['Dompet', 'Meja', 'Lampu', 'Gunting'] },
  { id: 8,  jawaban: 'Piring',  pilihan: ['Piring', 'Handphone', 'Lampu', 'Meja'] },
  { id: 9,  jawaban: 'Wayang',  pilihan: ['Yoyo', 'Wayang', 'Xylofon', "Qur'an"] },
  { id: 10, jawaban: 'Buku',    pilihan: ['Yoyo', 'Wayang', 'Buku', "Qur'an"] },
];

export default function GamePage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState(null); // null | 'benar' | 'salah'
  const [salahIndex, setSalahIndex] = useState(null);
  const [skor, setSkor] = useState(0);
  const [selesai, setSelesai] = useState(false);

  const soal = SOAL[index];

  const handlePilih = (pilihan, i) => {
    if (status === 'benar') return;
    if (pilihan === soal.jawaban) {
      setStatus('benar');
      setSkor((s) => s + 1);
      setTimeout(() => {
        setStatus(null);
        setSalahIndex(null);
        if (index < SOAL.length - 1) setIndex((idx) => idx + 1);
        else setSelesai(true);
      }, 1000);
    } else {
      setSalahIndex(i);
      setStatus('salah');
      setTimeout(() => {
        setStatus(null);
        setSalahIndex(null);
      }, 800);
    }
  };

  const prev = () => {
    setStatus(null);
    setSalahIndex(null);
    if (index > 0) setIndex((i) => i - 1);
    else navigate('/menu');
  };

  const next = () => {
    setStatus(null);
    setSalahIndex(null);
    if (index < SOAL.length - 1) setIndex((i) => i + 1);
    else setSelesai(true);
  };

  if (selesai) {
    return (
      <div className="game-selesai">
        <div className="selesai-card">
          <div className="selesai-emoji">🎉</div>
          <h1>Hebat!</h1>
          <p>Skor kamu</p>
          <div className="selesai-skor">{skor} / {SOAL.length}</div>
          <div className="selesai-btns">
            <button className="btn-ulangi" onClick={() => { setIndex(0); setSkor(0); setStatus(null); setSalahIndex(null); setSelesai(false); }}>
              Ulangi
            </button>
            <button className="btn-menu" onClick={() => navigate('/menu')}>
              Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-page">
      {/* Background gambar soal */}
      <img
        src={`/assets/game/${soal.id}.png`}
        alt={`Soal ${soal.id}`}
        className="game-bg"
        draggable={false}
      />

      {/* Skor badge */}
      <div className="skor-badge">{skor}/{SOAL.length}</div>

      {/* Hotzone 4 pilihan jawaban — di atas teks pilihan di gambar */}
      {soal.pilihan.map((p, i) => (
        <button
          key={i}
          className={`pilihan-zone pilihan-${i + 1}
            ${status === 'benar' && p === soal.jawaban ? ' benar' : ''}
            ${salahIndex === i ? ' salah' : ''}
          `}
          onClick={() => handlePilih(p, i)}
          aria-label={p}
        />
      ))}

      {/* Hotzone tombol navigasi */}
      <button className="game-nav prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="game-nav next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}