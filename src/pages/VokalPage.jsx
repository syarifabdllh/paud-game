import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './VokalPage.css';

const VOKAL = ['a', 'i', 'u', 'e', 'o'];

// Posisi 1 kartu AKTIF per slide dibesarkan sedikit agar menutupi garis terluarnya
const ACTIVE_CARD = [
  { top: 26.3, left: 21.0, width: 17.2, height: 60.2 }, // Aa
  { top: 26.3, left: 31.0, width: 17.2, height: 60.2 }, // Ii
  { top: 30.1, left: 41.5, width: 17.3, height: 60.2 }, // Uu
  { top: 30.1, left: 51.8, width: 17.3, height: 60.2 }, // Ee
  { top: 26.3, left: 62.4, width: 17.2, height: 60.2 }, // Oo
];

const BTN_PREV = { top: 76.8, left: 1.6,  width: 11.1, height: 16.2 };
const BTN_NEXT = { top: 76.8, left: 88.5, width: 11.1, height: 16.2 };
const BTN_SPEAKER = { top: 4.0,  left: 78.5, width: 4.5, height: 11.0 };

export default function VokalPage() {
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
    const audio = new Audio(`/assets/audio/${VOKAL[idx]}.mp3`);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const audio = new Audio(`/assets/audio/${VOKAL[0]}.mp3`);
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

  const goTo = (idx) => {
    setIndex(idx);
    playAudio(idx);
  };

  const prev = () => {
    if (index > 0) goTo(index - 1);
    else navigate('/menu');
  };

  const next = () => {
    if (index < 4) goTo(index + 1);
    else navigate('/menu');
  };

  const pos = ACTIVE_CARD[index];

  return (
    <div className="vokal-page" onClick={handleFirstTouch}>
      <img
        ref={imgRef}
        src={`/assets/vokal/${index + 1}.png`}
        alt={`Vokal ke-${index + 1}`}
        className="vokal-bg"
        draggable={false}
      />

      {/* Area Klik 1 Kartu yang Menonjol Saja */}
      <HotZone bounds={bounds} {...pos} onClick={() => playAudio(index)} ariaLabel={`Putar huruf ${VOKAL[index].toUpperCase()}`} />

      {/* Area Klik Ikon Speaker Kanan Atas */}
      <HotZone bounds={bounds} {...BTN_SPEAKER} onClick={() => playAudio(index)} ariaLabel="Putar Suara" />

      {/* Tombol Kiri Kanan */}
      <HotZone bounds={bounds} {...BTN_PREV} onClick={prev} ariaLabel="Sebelumnya" />
      <HotZone bounds={bounds} {...BTN_NEXT} onClick={next} ariaLabel="Berikutnya" />
      
      <BackButton />
    </div>
  );
}