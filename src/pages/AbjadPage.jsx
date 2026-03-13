import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AbjadPage.css';

export default function AbjadPage() {
  const [index, setIndex] = useState(0); // 0 = huruf A (file 1.png)
  const navigate = useNavigate();

  const prev = () => {
    if (index > 0) setIndex(index - 1);
    else navigate('/menu');
  };

  const next = () => {
    if (index < 25) setIndex(index + 1);
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
      <button className="abjad-hotzone prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="abjad-hotzone next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}