import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './MenuPage.css';

const MENU_ITEMS = [
  {
    label: 'Huruf Abjad',
    icon: '🔤',
    path: '/abjad',
    warna: '#E63946',
    shadow: '#b02030',
    desc: '26 huruf A sampai Z',
  },
  {
    label: 'Huruf Vokal',
    icon: '🗣️',
    path: '/vokal',
    warna: '#0077B6',
    shadow: '#005580',
    desc: 'A, I, U, E, O',
  },
  {
    label: 'Ayo Membaca',
    icon: '📖',
    path: '/membaca',
    warna: '#2DC653',
    shadow: '#1e8f3a',
    desc: 'Belajar suku kata',
  },
  {
    label: 'Game Time!',
    icon: '🎮',
    path: '/game',
    warna: '#FFB703',
    shadow: '#cc9200',
    desc: 'Tebak huruf & menang!',
  },
];

export default function MenuPage() {
  const navigate = useNavigate();
  return (
    <div className="menu-page batik-bg page-container">
      <Navbar title="Pilih Belajar" showBack={false} />

      <div className="menu-hero">
        <h2 className="menu-heading">Halo, Adik! 👋</h2>
        <p className="menu-sub">Mau belajar apa hari ini?</p>
      </div>

      <div className="menu-grid">
        {MENU_ITEMS.map((item, i) => (
          <button
            key={item.path}
            className="menu-card"
            style={{
              '--card-bg': item.warna,
              '--card-shadow': item.shadow,
              animationDelay: `${i * 0.1}s`,
            }}
            onClick={() => navigate(item.path)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
            <span className="menu-desc">{item.desc}</span>
          </button>
        ))}
      </div>

      <div className="menu-deco">
        <span>🌺</span><span>🏵️</span><span>🌸</span>
      </div>
    </div>
  );
}
