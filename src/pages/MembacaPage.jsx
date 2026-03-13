import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MembacaPage.css';

export default function MembacaPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

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
      <button className="membaca-hotzone prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="membaca-hotzone next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}