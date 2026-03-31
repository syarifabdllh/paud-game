import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './AbjadPage.css';

const AUDIO = [
  'a','b','c','d','e','f','g','h','i','j',
  'k','l','m','n','o','p','q','r','s','t',
  'u','v','w','x','y','z'
];

export default function AbjadPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const playAudio = (idx) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    const audio = new Audio(`/assets/audio/${AUDIO[idx]}.mp3`);
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
    if (index < 25) goTo(index + 1);
    else navigate('/menu');
  };

  return (
    <div className="abjad-page">
      <img
        src={`/assets/${index + 1}.png`}
        alt={`Huruf ke-${index + 1}`}
        className="abjad-bg"
        draggable={false}
      />

      {/* Klik kotak kartu → putar ulang suara huruf aktif */}
      <button
        className="abjad-hotzone card-zone"
        onClick={() => playAudio(index)}
        aria-label={`Putar suara huruf ${AUDIO[index]}`}
      />

      <BackButton />
      <button className="abjad-hotzone prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="abjad-hotzone next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}