import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './HomePage.css';

// % terhadap gambar asli — posisinya sekarang presisi memeluk tombol START
const BTN_START = { top: 77.6, left: 44.9, width: 19.0, height: 10.0 };

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