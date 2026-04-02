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

// Posisi 4 pilihan jawaban di kanan (% terhadap gambar asli)
const PILIHAN_POS = [
  { top: 26, left: 56, width: 26, height: 12 },
  { top: 40, left: 56, width: 26, height: 12 },
  { top: 54, left: 56, width: 26, height: 12 },
  { top: 68, left: 56, width: 26, height: 12 },
];

// Posisi kotak oval drop di bawah gambar (% terhadap gambar asli)
const DROP_ZONE = { top: 64, left: 17, width: 26, height: 11 };

const BTN_PREV = { top: 82, left: 10, width: 9, height: 14 };
const BTN_NEXT = { top: 82, left: 81, width: 9, height: 14 };

export default function GamePage() {
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const bounds = useImageBounds(imgRef);

  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState(null);
  const [salahIndex, setSalahIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [animatingIndex, setAnimatingIndex] = useState(null);
  const [droppedText, setDroppedText] = useState('');
  const [skor, setSkor] = useState(0);
  const [selesai, setSelesai] = useState(false);

  const soal = SOAL[index];

  const handlePilih = (pilihan, i) => {
    if (status === 'benar' || animatingIndex !== null) return;

    setAnimatingIndex(i);
    setDroppedText(pilihan);

    setTimeout(() => {
      setAnimatingIndex(null);
      setSelectedIndex(i);

      if (pilihan === soal.jawaban) {
        setStatus('benar');
        setSkor((s) => s + 1);
        setTimeout(() => {
          setStatus(null);
          setSelectedIndex(null);
          setDroppedText('');
          if (index < SOAL.length - 1) setIndex((idx) => idx + 1);
          else setSelesai(true);
        }, 1200);
      } else {
        setSalahIndex(i);
        setStatus('salah');
        setTimeout(() => {
          setStatus(null);
          setSalahIndex(null);
          setSelectedIndex(null);
          setDroppedText('');
        }, 900);
      }
    }, 400);
  };

  const prev = () => {
    setStatus(null); setSalahIndex(null);
    setSelectedIndex(null); setDroppedText('');
    if (index > 0) setIndex((i) => i - 1);
    else navigate('/menu');
  };

  const next = () => {
    setStatus(null); setSalahIndex(null);
    setSelectedIndex(null); setDroppedText('');
    if (index < SOAL.length - 1) setIndex((i) => i + 1);
    else setSelesai(true);
  };

  // Hitung posisi absolut dari % terhadap gambar
  const toAbs = (pos) => {
    if (!bounds) return null;
    const { renderedW, renderedH, offsetX, offsetY } = bounds;
    return {
      left:   offsetX + (pos.left   / 100) * renderedW,
      top:    offsetY + (pos.top    / 100) * renderedH,
      width:  (pos.width  / 100) * renderedW,
      height: (pos.height / 100) * renderedH,
    };
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
              setSalahIndex(null); setSelectedIndex(null);
              setDroppedText(''); setSelesai(false);
            }}>Ulangi</button>
            <button className="btn-menu" onClick={() => navigate('/menu')}>Menu</button>
          </div>
        </div>
      </div>
    );
  }

  const dropAbs  = toAbs(DROP_ZONE);

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

      {/* Label teks di atas setiap pilihan */}
      {bounds && soal.pilihan.map((p, i) => {
        const abs = toAbs(PILIHAN_POS[i]);
        const isAnimating = animatingIndex === i;
        const isSelected  = selectedIndex === i;
        const isHidden    = isSelected || isAnimating;

        return (
          <div
            key={`label-${i}`}
            className={`pilihan-label ${isHidden ? 'hidden' : ''}`}
            style={{
              position: 'absolute',
              left:   abs.left,
              top:    abs.top,
              width:  abs.width,
              height: abs.height,
              zIndex: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{
              fontSize: Math.max(12, abs.height * 0.38),
              fontWeight: 800,
              color: '#222',
              fontFamily: 'Nunito, sans-serif',
            }}>{p}</span>
          </div>
        );
      })}

      {/* Kata yang sedang bergeser ke drop zone */}
      {bounds && animatingIndex !== null && (() => {
        const from = toAbs(PILIHAN_POS[animatingIndex]);
        const to   = dropAbs;
        return (
          <div
            className="kata-animasi"
            style={{
              '--from-left': `${from.left + from.width / 2 - to.width / 2}px`,
              '--from-top':  `${from.top  + from.height / 2 - to.height / 2}px`,
              '--to-left':   `${to.left}px`,
              '--to-top':    `${to.top}px`,
              width:  to.width,
              height: to.height,
            }}
          >
            <span style={{
              fontSize: Math.max(12, to.height * 0.38),
              fontWeight: 800,
              color: '#222',
              fontFamily: 'Nunito, sans-serif',
            }}>{droppedText}</span>
          </div>
        );
      })()}

      {/* Teks di drop zone setelah animasi selesai */}
      {bounds && selectedIndex !== null && animatingIndex === null && dropAbs && (
        <div
          className={`drop-label ${status === 'benar' ? 'benar' : ''} ${status === 'salah' ? 'salah' : ''}`}
          style={{
            position: 'absolute',
            left:   dropAbs.left,
            top:    dropAbs.top,
            width:  dropAbs.width,
            height: dropAbs.height,
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            borderRadius: 50,
          }}
        >
          <span style={{
            fontSize: Math.max(12, dropAbs.height * 0.38),
            fontWeight: 800,
            color: status === 'benar' ? '#1b5e20' : status === 'salah' ? '#b71c1c' : '#222',
            fontFamily: 'Nunito, sans-serif',
          }}>{droppedText}</span>
        </div>
      )}

      {/* Hotzone invisible di atas setiap pilihan */}
      {soal.pilihan.map((p, i) => (
        <HotZone
          key={i}
          bounds={bounds}
          {...PILIHAN_POS[i]}
          onClick={() => handlePilih(p, i)}
          ariaLabel={p}
          className={`${salahIndex === i ? 'salah' : ''}`}
        />
      ))}

      <HotZone bounds={bounds} {...BTN_PREV} onClick={prev} ariaLabel="Sebelumnya" />
      <HotZone bounds={bounds} {...BTN_NEXT} onClick={next} ariaLabel="Berikutnya" />
    </div>
  );
}