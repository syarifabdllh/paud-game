import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const audio = new Audio(`/assets/audio/${AUDIO[index]}.mp3`);
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.src = ''; };
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
      <BackButton />
      <button className="membaca-hotzone prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="membaca-hotzone next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}