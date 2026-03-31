import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './VokalPage.css';

const VOKAL = ['a', 'i', 'u', 'e', 'o'];

const ACTIVE_CARD = [
  { top: 17, left: 8,  width: 26, height: 70 },
  { top: 15, left: 35, width: 26, height: 70 },
  { top: 15, left: 38, width: 26, height: 70 },
  { top: 15, left: 51, width: 26, height: 70 },
  { top: 17, left: 65, width: 26, height: 70 },
];

export default function VokalPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const playAudio = (idx) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    const audio = new Audio(`/assets/audio/${VOKAL[idx]}.mp3`);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  // Autoplay setiap kali index berubah (termasuk saat pertama masuk)
  useEffect(() => {
    playAudio(index);
  }, [index]);

  const prev = () => {
    if (index > 0) setIndex(index - 1);
    else navigate('/menu');
  };

  const next = () => {
    if (index < 4) setIndex(index + 1);
    else navigate('/menu');
  };

  const pos = ACTIVE_CARD[index];

  return (
    <div className="vokal-page">
      <img
        src={`/assets/vokal/${index + 1}.png`}
        alt={`Vokal ke-${index + 1}`}
        className="vokal-bg"
        draggable={false}
      />

      <button
        className="vokal-hotzone"
        style={{
          top: `${pos.top}%`,
          left: `${pos.left}%`,
          width: `${pos.width}%`,
          height: `${pos.height}%`,
        }}
        onClick={() => playAudio(index)}
        aria-label={`Putar suara huruf ${VOKAL[index].toUpperCase()}`}
      />

      <BackButton />
      <button className="vokal-hotzone prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="vokal-hotzone next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}