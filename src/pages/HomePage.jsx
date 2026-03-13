import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <img
        src="/assets/homepage_bg.jpg"
        alt="Dunia Belajar"
        className="home-bg"
        draggable={false}
      />
      {/* Area klik transparan tepat di atas tombol START di gambar */}
      <button
        className="start-hotzone"
        onClick={() => navigate('/menu')}
        aria-label="Mulai Belajar"
      />
    </div>
  );
}