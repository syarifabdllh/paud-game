import { useNavigate } from 'react-router-dom';
import './BackButton.css';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="back-btn" onClick={() => navigate('/menu')} aria-label="Kembali ke Menu">
      ◀ Menu
    </button>
  );
}