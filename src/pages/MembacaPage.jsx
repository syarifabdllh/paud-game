import { useState, useRef, useEffect } from 'react';
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

  // Autoplay setiap kali index berubah (termasuk saat pertama masuk)
  useEffect(() => {
    playAudio(index);
  }, [index]);

  const prev = () => {
    if (index > 0) setIndex(index - 1);
    else navigate('/menu');
  };

  const next = () => {
    if (index < 9) setIndex(index + 1);
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