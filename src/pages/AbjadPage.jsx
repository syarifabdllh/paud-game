import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './AbjadPage.css';

const AUDIO = [
  'a','b','c','d','e','f','g','h','i','j',
  'k','l','m','n','o','p','q','r','s','t',
  'u','v','w','x','y','z'
];

// Posisi akurat dalam % (Dihitung dari total resolusi gambar 1763x805)
const CARD        = { top: 29.0, left: 31.0, width: 41.5, height: 56.0 };
const BTN_PREV    = { top: 84.0, left: 10.0, width: 6.5,  height: 13.0 };
const BTN_NEXT    = { top: 84.0, left: 84.0, width: 6.5,  height: 13.0 };
const BTN_SPEAKER = { top: 6.0,  left: 81.5, width: 4.5,  height: 11.0 }; 

export default function AbjadPage() {
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
    if (index < 25) setIndex(index + 1);
    else navigate('/menu');
  };

  return (
    <div className="abjad-page" onClick={handleFirstTouch}>
      <img
        ref={imgRef}
        src={`/assets/${index + 1}.png`}
        alt={`Huruf ke-${index + 1}`}
        className="abjad-bg"
        draggable={false}
      />

      {/* Area Klik Kartu Kuning Utama */}
      <HotZone bounds={bounds} {...CARD} onClick={() => playAudio(index)} ariaLabel={`Putar huruf ${AUDIO[index]}`} />
      
      {/* Area Klik Ikon Speaker Kanan Atas */}
      <HotZone bounds={bounds} {...BTN_SPEAKER} onClick={() => playAudio(index)} ariaLabel="Putar Suara" />

      {/* Tombol Kiri Kanan */}
      <HotZone bounds={bounds} {...BTN_PREV} onClick={prev} ariaLabel="Sebelumnya" />
      <HotZone bounds={bounds} {...BTN_NEXT} onClick={next} ariaLabel="Berikutnya" />
      
      <BackButton />
    </div>
  );
}