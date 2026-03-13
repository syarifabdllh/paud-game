import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page batik-bg">
      {/* Dekorasi motif batik pojok */}
      <div className="batik-corner top-left" />
      <div className="batik-corner top-right" />
      <div className="batik-corner bottom-left" />
      <div className="batik-corner bottom-right" />

      {/* Bintang dekorasi */}
      <span className="star s1">⭐</span>
      <span className="star s2">🌟</span>
      <span className="star s3">✨</span>
      <span className="star s4">⭐</span>

      <div className="home-content">
        {/* Logo / Hero image placeholder */}
        <div className="hero-area">
          {/* Ganti src dengan asset karakter utama adek */}
          <div className="hero-img-placeholder">
            <span className="hero-emoji">🦁</span>
            <p className="placeholder-note">[ Karakter Maskot ]</p>
          </div>
        </div>

        {/* Judul */}
        <div className="title-area">
          <h1 className="game-title">
            <span className="title-aku">Aku</span>
            {' '}
            <span className="title-bisa">Bisa</span>
            {' '}
            <span className="title-baca">Baca!</span>
          </h1>
          <p className="game-subtitle">Belajar huruf seru bersama Bima! 🎉</p>
        </div>

        {/* Tombol Start */}
        <button
          className="btn-start"
          onClick={() => navigate('/menu')}
        >
          <span className="start-icon">▶</span>
          MULAI BELAJAR
        </button>

        {/* Dekorasi bawah */}
        <div className="home-deco">
          <span>🌺</span>
          <span>🏵️</span>
          <span>🌸</span>
          <span>🏵️</span>
          <span>🌺</span>
        </div>
      </div>
    </div>
  );
}
