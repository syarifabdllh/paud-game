import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
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

// Posisi 4 pilihan jawaban (% terhadap gambar asli)
const PILIHAN_POS = [
  { top: 68, left: 5,  width: 20, height: 18 }, // pilihan 1
  { top: 68, left: 28, width: 20, height: 18 }, // pilihan 2
  { top: 68, left: 53, width: 20, height: 18 }, // pilihan 3
  { top: 68, left: 76, width: 20, height: 18 }, // pilihan 4
];

const BTN_PREV = { top: 83, left: 5,  width: 8, height: 13 };
const BTN_NEXT = { top: 83, left: 87, width: 8, height: 13 };

export default function GamePage() {
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const bounds = useImageBounds(imgRef);

  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState(null);
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
            <button className="btn-ulangi" onClick={() => {
              setIndex(0); setSkor(0); setStatus(null);
              setSalahIndex(null); setSelesai(false);
            }}>Ulangi</button>
            <button className="btn-menu" onClick={() => navigate('/menu')}>Menu</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-page">
      <img
        ref={imgRef}
        src={`/assets/game/${soal.id}.png`}
        alt={`Soal ${soal.id}`}
        className="game-bg"
        draggable={false}
      />

      <BackButton />
      <div className="skor-badge">{skor}/{SOAL.length}</div>

      {soal.pilihan.map((p, i) => (
        <HotZone
          key={i}
          bounds={bounds}
          {...PILIHAN_POS[i]}
          onClick={() => handlePilih(p, i)}
          ariaLabel={p}
          className={`pilihan-feedback
            ${status === 'benar' && p === soal.jawaban ? 'benar' : ''}
            ${salahIndex === i ? 'salah' : ''}
          `}
        />
      ))}

      <HotZone bounds={bounds} {...BTN_PREV} onClick={prev} ariaLabel="Sebelumnya" />
      <HotZone bounds={bounds} {...BTN_NEXT} onClick={next} ariaLabel="Berikutnya" />
    </div>
  );
}