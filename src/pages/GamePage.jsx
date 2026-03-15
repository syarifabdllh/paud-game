import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GamePage.css';

const SOAL = [
  {
    id: 1, nama: 'Apel',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="58" rx="32" ry="34" fill="#e63946"/>
      <ellipse cx="38" cy="52" rx="10" ry="14" fill="#ff6b6b" opacity="0.4"/>
      <path d="M50 28 Q55 10 70 12" stroke="#4caf50" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="68" cy="10" rx="10" ry="6" fill="#4caf50" transform="rotate(-20 68 10)"/>
    </svg>),
  },
  {
    id: 2, nama: 'Obat',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="38" width="44" height="28" rx="14" fill="#e63946"/>
      <clipPath id="pill"><rect x="28" y="38" width="44" height="28" rx="14"/></clipPath>
      <rect x="50" y="38" width="22" height="28" fill="#fff" clipPath="url(#pill)"/>
      <rect x="25" y="50" width="8" height="4" rx="2" fill="#fff"/>
      <rect x="67" y="50" width="8" height="4" rx="2" fill="#e63946"/>
    </svg>),
  },
  {
    id: 3, nama: 'Jam',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="52" r="30" fill="#fff" stroke="#333" strokeWidth="4"/>
      <circle cx="50" cy="52" r="26" fill="#fafafa"/>
      <line x1="50" y1="52" x2="50" y2="32" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
      <line x1="50" y1="52" x2="64" y2="58" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="52" r="3" fill="#333"/>
      <rect x="44" y="20" width="12" height="6" rx="3" fill="#333"/>
    </svg>),
  },
  {
    id: 4, nama: 'Gunting',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="62" r="10" fill="none" stroke="#555" strokeWidth="3"/>
      <circle cx="32" cy="78" r="10" fill="none" stroke="#555" strokeWidth="3"/>
      <line x1="32" y1="62" x2="72" y2="30" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
      <line x1="32" y1="78" x2="72" y2="30" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="72" cy="30" r="3" fill="#e63946"/>
    </svg>),
  },
  {
    id: 5, nama: 'Dompet',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="35" width="70" height="45" rx="8" fill="#8B4513"/>
      <rect x="15" y="35" width="70" height="12" rx="4" fill="#6B3410"/>
      <rect x="55" y="48" width="25" height="20" rx="6" fill="#5a3010"/>
      <circle cx="67" cy="58" r="4" fill="#f4c430"/>
    </svg>),
  },
  {
    id: 6, nama: 'Meja',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="38" width="70" height="10" rx="4" fill="#8B4513"/>
      <rect x="20" y="48" width="8" height="30" rx="3" fill="#6B3410"/>
      <rect x="72" y="48" width="8" height="30" rx="3" fill="#6B3410"/>
    </svg>),
  },
  {
    id: 7, nama: 'Lampu',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="45" rx="20" ry="22" fill="#ffd700"/>
      <ellipse cx="50" cy="45" rx="20" ry="22" fill="#ffe066" opacity="0.5"/>
      <rect x="43" y="65" width="14" height="6" rx="2" fill="#aaa"/>
      <rect x="45" y="71" width="10" height="5" rx="2" fill="#888"/>
      <line x1="50" y1="20" x2="50" y2="14" stroke="#aaa" strokeWidth="3"/>
      <line x1="30" y1="28" x2="25" y2="23" stroke="#ffd700" strokeWidth="2"/>
      <line x1="70" y1="28" x2="75" y2="23" stroke="#ffd700" strokeWidth="2"/>
    </svg>),
  },
  {
    id: 8, nama: 'Piring',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="55" rx="34" ry="10" fill="#ddd"/>
      <ellipse cx="50" cy="50" rx="34" ry="10" fill="#f0f0f0"/>
      <ellipse cx="50" cy="50" rx="26" ry="7" fill="#e8e8e8"/>
      <ellipse cx="50" cy="50" rx="14" ry="4" fill="#ddd"/>
    </svg>),
  },
  {
    id: 9, nama: 'Wayang',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="48" y="10" width="4" height="75" rx="2" fill="#8B4513"/>
      <ellipse cx="50" cy="28" rx="10" ry="12" fill="#f4c430"/>
      <path d="M40 40 Q30 55 35 70 Q50 75 65 70 Q70 55 60 40 Z" fill="#e8a020"/>
      <path d="M35 42 Q20 38 22 52 Q30 58 38 52 Z" fill="#e8a020"/>
      <path d="M65 42 Q80 38 78 52 Q70 58 62 52 Z" fill="#e8a020"/>
      <circle cx="45" cy="27" r="2" fill="#333"/>
      <circle cx="55" cy="27" r="2" fill="#333"/>
      <path d="M44 33 Q50 37 56 33" stroke="#333" strokeWidth="1.5" fill="none"/>
    </svg>),
  },
  {
    id: 10, nama: 'Buku',
    svg: (<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="25" width="60" height="55" rx="4" fill="#3a86ff"/>
      <rect x="20" y="25" width="8" height="55" rx="2" fill="#2667cc"/>
      <rect x="30" y="35" width="38" height="4" rx="2" fill="#fff" opacity="0.7"/>
      <rect x="30" y="43" width="30" height="3" rx="2" fill="#fff" opacity="0.5"/>
      <rect x="30" y="50" width="34" height="3" rx="2" fill="#fff" opacity="0.5"/>
      <rect x="30" y="57" width="26" height="3" rx="2" fill="#fff" opacity="0.5"/>
    </svg>),
  },
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

      {/* SVG icon di dalam kotak putih kiri */}
      <div className="icon-box">
        {soal.svg}
      </div>

      {/* Drop zone oval di bawah kotak */}
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

      {/* Pilihan 1-4 di kanan */}
      <div className="pilihan-wrap">
        {choices.map((c, i) => (
          <div
            key={i}
            className={`pilihan ${dropped === c && status === 'benar' ? 'benar' : ''} ${dropped === c && status === 'salah' ? 'salah' : ''}`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', c)}
            onTouchStart={() => handleTouchStart(c)}
            onTouchEnd={handleTouchEnd}
            onClick={() => handleDrop(c)}
          >
            {c}
          </div>
        ))}
      </div>

      {/* Skor badge */}
      <div className="skor-badge">{skor}/{soalList.length}</div>

      {/* Tombol navigasi hotzone */}
      <button className="game-nav prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="game-nav next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}