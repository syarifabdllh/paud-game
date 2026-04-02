import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './MembacaPage.css';

const AUDIO = [
  'sapi makan rumput',
  'adik minum susu',
  'ibu masak telur',
  'ayah baca koran',
  'kakak main bola',
  'kucing tidur diteras',
  'pipi beli boneka',
  'budi naik sepeda',
  'balon terbang ke langit',
  'ikan berenang dikolam',
];

// Posisi Hotzone diperlebar merangkul seluruh bingkai dan tombol
const CARD        = { top: 36.4, left: 29.5, width: 41.4, height: 55.9 };
const BTN_PREV    = { top: 83.2, left: 9.5,  width: 6.6,  height: 13.4 };
const BTN_NEXT    = { top: 83.2, left: 83.6, width: 6.6,  height: 13.4 };
const BTN_SPEAKER = { top: 6.0,  left: 81.5, width: 4.5,  height: 11.0 };

export default function MembacaPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const imgRef = useRef(null);
  const startedRef = useRef(false);
  const bounds = useImageBounds(imgRef);

  const playAudio = (idx) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    const audio = new Audio(`/assets/audio/${AUDIO[idx]}.mp3`);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const audio = new Audio(`/assets/audio/${AUDIO[0]}.mp3`);
    audioRef.current = audio;
    audio.play()
      .then(() => { startedRef.current = true; })
      .catch(() => { startedRef.current = false; });
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  useEffect(() => {
    if (startedRef.current && index > 0) playAudio(index);
  }, [index]);

  const handleFirstTouch = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      playAudio(index);
    }
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
    else navigate('/menu');
  };

  const next = () => {
    if (index < 9) setIndex(index + 1);
    else navigate('/menu');
  };

  return (
    <div className="membaca-page" onClick={handleFirstTouch}>
      <img
        ref={imgRef}
        src={`/assets/membaca/${index + 1}.png`}
        alt={`Cerita ke-${index + 1}`}
        className="membaca-bg"
        draggable={false}
      />

      {/* Area Klik Tengah Pada Kartu Membaca */}
      <HotZone bounds={bounds} {...CARD} onClick={() => playAudio(index)} ariaLabel={`Putar: ${AUDIO[index]}`} />
      
      {/* Area Klik Icon Speaker Pojok Kanan */}
      <HotZone bounds={bounds} {...BTN_SPEAKER} onClick={() => playAudio(index)} ariaLabel="Putar Suara" />

      {/* Tombol Kiri & Kanan */}
      <HotZone bounds={bounds} {...BTN_PREV} onClick={prev} ariaLabel="Sebelumnya" />
      <HotZone bounds={bounds} {...BTN_NEXT} onClick={next} ariaLabel="Berikutnya" />
      
      <BackButton />
    </div>
  );
}