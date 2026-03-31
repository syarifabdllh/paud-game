import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './VokalPage.css';

const VOKAL = ['a', 'i', 'u', 'e', 'o'];

// Posisi kartu AKTIF per slide [top%, left%, width%, height%]
const ACTIVE_CARD = [
  { top: 17, left: 8,  width: 26, height: 70 }, // Aa — kartu besar kiri
  { top: 15, left: 35, width: 26, height: 70 }, // Ii — kartu besar tengah-kiri
  { top: 15, left: 38, width: 26, height: 70 }, // Uu — kartu besar tengah
  { top: 15, left: 51, width: 26, height: 70 }, // Ee — kartu besar tengah-kanan
  { top: 17, left: 65, width: 26, height: 70 }, // Oo — kartu besar kanan
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
    <div className="vokal-page">
      <img
        src={`/assets/vokal/${index + 1}.png`}
        alt={`Vokal ke-${index + 1}`}
        className="vokal-bg"
        draggable={false}
      />

      {/* Hanya 1 hotzone — kartu aktif saja */}
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