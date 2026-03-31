import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './VokalPage.css';

const VOKAL = ['a', 'i', 'u', 'e', 'o'];

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

  return (
    <div className="vokal-page">
      <img
        src={`/assets/vokal/${index + 1}.png`}
        alt={`Vokal ke-${index + 1}`}
        className="vokal-bg"
        draggable={false}
      />

      {/* Kartu besar kiri — klik putar ulang suara */}
      <button
        className="vokal-hotzone card-main"
        onClick={() => playAudio(index)}
        aria-label={`Putar suara huruf ${VOKAL[index]}`}
      />

      {/* Kartu kecil kanan — klik pindah + putar suara */}
      {VOKAL.map((v, i) => (
        <button
          key={v}
          className={`vokal-hotzone card-mini card-mini-${i + 1}`}
          onClick={() => goTo(i)}
          aria-label={`Huruf ${v.toUpperCase()}`}
        />
      ))}

      <BackButton />
      <button className="vokal-hotzone prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="vokal-hotzone next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}