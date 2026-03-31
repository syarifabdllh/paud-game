import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
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

export default function MembacaPage() {
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
    if (index < 9) goTo(index + 1);
    else navigate('/menu');
  };

  return (
    <div className="membaca-page">
      <img
        src={`/assets/membaca/${index + 1}.png`}
        alt={`Cerita ke-${index + 1}`}
        className="membaca-bg"
        draggable={false}
      />

      {/* Hotzone di atas kotak kartu tengah */}
      <button
        className="membaca-hotzone card-zone"
        onClick={() => playAudio(index)}
        aria-label={`Putar suara: ${AUDIO[index]}`}
      />

      <BackButton />
      <button className="membaca-hotzone prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="membaca-hotzone next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}