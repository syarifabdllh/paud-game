import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './HomePage.css';

// % terhadap gambar asli — sesuaikan jika posisi tombol START berbeda
const BTN_START = { top: 78, left: 38, width: 24, height: 10 };

export default function HomePage() {
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const bounds = useImageBounds(imgRef);

  return (
    <div className="home-page">
      <img
        ref={imgRef}
        src="/assets/homepage_bg.jpg"
        alt="Dunia Belajar"
        className="home-bg"
        draggable={false}
      />
      <HotZone
        bounds={bounds}
        {...BTN_START}
        onClick={() => navigate('/menu')}
        ariaLabel="Mulai Belajar"
      />
    </div>
  );
}