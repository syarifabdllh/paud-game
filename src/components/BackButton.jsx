import { useNavigate } from 'react-router-dom';
import './BackButton.css';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="home-btn" onClick={() => navigate('/menu')} aria-label="Kembali ke Menu">
      <svg className="home-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        {/* Atap */}
        <polygon points="24,4 44,22 40,22 40,20 8,20 8,22 4,22" fill="#e8471e"/>
        <polygon points="24,4 44,22 4,22" fill="#f25c2a"/>
        {/* Cerobong */}
        <rect x="32" y="6" width="6" height="10" rx="1" fill="#c83a18"/>
        {/* Badan rumah */}
        <rect x="9" y="21" width="30" height="22" rx="2" fill="#fdf0c2"/>
        {/* Pintu */}
        <rect x="20" y="31" width="8" height="12" rx="3" fill="#8B4513"/>
        <circle cx="27" cy="37" r="1" fill="#f4c430"/>
        {/* Jendela kiri */}
        <rect x="11" y="26" width="7" height="7" rx="2" fill="#87ceeb"/>
        <line x1="14.5" y1="26" x2="14.5" y2="33" stroke="#fff" strokeWidth="1"/>
        <line x1="11" y1="29.5" x2="18" y2="29.5" stroke="#fff" strokeWidth="1"/>
        {/* Jendela kanan */}
        <rect x="30" y="26" width="7" height="7" rx="2" fill="#87ceeb"/>
        <line x1="33.5" y1="26" x2="33.5" y2="33" stroke="#fff" strokeWidth="1"/>
        <line x1="30" y1="29.5" x2="37" y2="29.5" stroke="#fff" strokeWidth="1"/>
      </svg>
      <span className="home-label">Menu</span>
    </button>
  );
}