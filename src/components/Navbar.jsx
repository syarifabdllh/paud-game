import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ title, showBack = true }) {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      {showBack ? (
        <button className="back-btn" onClick={() => navigate(-1)}>
          ◀ Kembali
        </button>
      ) : <div />}
      <h2 className="nav-title">{title}</h2>
      <div />
    </nav>
  );
}
