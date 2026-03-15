import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GamePage.css';

const SOAL = [
  { id: 1,  nama: 'Apel',    emoji: '🍎' },
  { id: 2,  nama: 'Obat',    emoji: '💊' },
  { id: 3,  nama: 'Jam',     emoji: '⏰' },
  { id: 4,  nama: 'Gunting', emoji: '✂️' },
  { id: 5,  nama: 'Dompet',  emoji: '👛' },
  { id: 6,  nama: 'Meja',    emoji: '🪑' },
  { id: 7,  nama: 'Lampu',   emoji: '💡' },
  { id: 8,  nama: 'Piring',  emoji: '🍽️' },
  { id: 9,  nama: 'Wayang',  emoji: '🎭' },
  { id: 10, nama: 'Buku',    emoji: '📚' },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateChoices(correctNama, allNama) {
  const wrong = shuffle(allNama.filter((n) => n !== correctNama)).slice(0, 3);
  return shuffle([correctNama, ...wrong]);
}

export default function GamePage() {
  const navigate = useNavigate();
  const [soalList] = useState(() => shuffle(SOAL));
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [dropped, setDropped] = useState(null);
  const [status, setStatus] = useState(null);
  const [skor, setSkor] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [dragging, setDragging] = useState(null);

  const allNama = SOAL.map((s) => s.nama);
  const soal = soalList[index];

  useEffect(() => {
    setChoices(generateChoices(soal.nama, allNama));
    setDropped(null);
    setStatus(null);
    setDragging(null);
  }, [index]);

  const handleDrop = (jawaban) => {
    if (status) return;
    setDropped(jawaban);
    if (jawaban === soal.nama) {
      setStatus('benar');
      setSkor((s) => s + 1);
      setTimeout(() => {
        if (index < soalList.length - 1) setIndex((i) => i + 1);
        else setSelesai(true);
      }, 1200);
    } else {
      setStatus('salah');
      setTimeout(() => {
        setDropped(null);
        setStatus(null);
      }, 1000);
    }
  };

  const handleTouchStart = (nama) => setDragging(nama);
  const handleTouchEnd = (e) => {
    if (!dragging) return;
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el && el.closest('.drop-zone')) handleDrop(dragging);
    setDragging(null);
  };

  const prev = () => {
    if (index > 0) setIndex((i) => i - 1);
    else navigate('/menu');
  };

  const next = () => {
    if (index < soalList.length - 1) setIndex((i) => i + 1);
    else setSelesai(true);
  };

  if (selesai) {
    return (
      <div className="game-selesai">
        <div className="selesai-card">
          <div className="selesai-emoji">🎉</div>
          <h1>Hebat!</h1>
          <p>Skor kamu</p>
          <div className="selesai-skor">{skor} / {soalList.length}</div>
          <div className="selesai-btns">
            <button className="btn-ulangi" onClick={() => { setIndex(0); setSkor(0); setSelesai(false); }}>
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
      <img src="/assets/game_bg.png" alt="Game Time" className="game-bg" draggable={false} />

      {/* Emoji icon di dalam kotak putih */}
      <div className="icon-box">
        <span className="icon-emoji">{soal.emoji}</span>
      </div>

      {/* Drop zone oval */}
      <div
        className={`drop-zone ${status === 'benar' ? 'benar' : ''} ${status === 'salah' ? 'salah' : ''}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleDrop(e.dataTransfer.getData('text/plain')); }}
      >
        {dropped
          ? <span className="drop-text">{dropped}</span>
          : <span className="drop-hint">Taruh di sini</span>
        }
      </div>

      {/* Pilihan 1-4 — hotzone di atas pilihan */}
      <div className="pilihan-wrap">
        {choices.map((c, i) => (
          <button
            key={i}
            className={`pilihan ${dropped === c && status === 'benar' ? 'benar' : ''} ${dropped === c && status === 'salah' ? 'salah' : ''}`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', c)}
            onTouchStart={() => handleTouchStart(c)}
            onTouchEnd={handleTouchEnd}
            onClick={() => handleDrop(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Skor badge */}
      <div className="skor-badge">{skor}/{soalList.length}</div>

      {/* Hotzone tombol navigasi */}
      <button className="game-nav prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="game-nav next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}