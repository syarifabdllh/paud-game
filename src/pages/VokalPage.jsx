import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VokalPage.css';

export default function VokalPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const prev = () => {
    if (index > 0) setIndex(index - 1);
    else navigate('/menu');
  };

  const next = () => {
    if (index < 4) setIndex(index + 1);
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
      <button className="vokal-hotzone prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="vokal-hotzone next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}