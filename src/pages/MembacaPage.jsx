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

const CARD    = { top: 28, left: 21, width: 58, height: 58 };
const BTN_PREV = { top: 83, left: 5,  width: 8,  height: 13 };
const BTN_NEXT = { top: 83, left: 87, width: 8,  height: 13 };

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

      <HotZone bounds={bounds} {...CARD}     onClick={() => playAudio(index)} ariaLabel={`Putar: ${AUDIO[index]}`} />
      <HotZone bounds={bounds} {...BTN_PREV} onClick={prev} ariaLabel="Sebelumnya" />
      <HotZone bounds={bounds} {...BTN_NEXT} onClick={next} ariaLabel="Berikutnya" />
      <BackButton />
    </div>
  );
}