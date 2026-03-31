import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './VokalPage.css';

const VOKAL = ['a', 'i', 'u', 'e', 'o'];

// Posisi kartu AKTIF per slide (% terhadap gambar asli)
const ACTIVE_CARD = [
  { top: 17, left: 8,  width: 26, height: 70 }, // Aa
  { top: 15, left: 35, width: 26, height: 70 }, // Ii
  { top: 15, left: 38, width: 26, height: 70 }, // Uu
  { top: 15, left: 51, width: 26, height: 70 }, // Ee
  { top: 17, left: 65, width: 26, height: 70 }, // Oo
];

const BTN_PREV = { top: 82, left: 7,  width: 8, height: 13 };
const BTN_NEXT = { top: 82, left: 85, width: 8, height: 13 };

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

      <HotZone bounds={bounds} {...pos}     onClick={() => playAudio(index)} ariaLabel={`Putar huruf ${VOKAL[index].toUpperCase()}`} />
      <HotZone bounds={bounds} {...BTN_PREV} onClick={prev} ariaLabel="Sebelumnya" />
      <HotZone bounds={bounds} {...BTN_NEXT} onClick={next} ariaLabel="Berikutnya" />
      <BackButton />
    </div>
  );
}