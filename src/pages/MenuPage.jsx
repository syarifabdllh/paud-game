import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './MenuPage.css';

// Semua posisi dalam % terhadap gambar asli
// Ukur ulang berdasarkan gambar menu_bg.png Anda jika perlu
const MENU_ZONES = [
  { key: 'abjad',   path: '/abjad',   top: 53.5, left: 8.5,  width: 19.5, height: 21.5, label: 'Huruf Abjad' },
  { key: 'vokal',   path: '/vokal',   top: 33.0, left: 27.5, width: 19.5, height: 21.5, label: 'Huruf Vokal' },
  { key: 'membaca', path: '/membaca', top: 58.5, left: 42.5, width: 19.5, height: 21.5, label: 'Ayo Membaca' },
  { key: 'game',    path: '/game',    top: 68.5, left: 63.5, width: 19.5, height: 21.5, label: 'Game Time'   },
];

export default function MenuPage() {
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const bounds = useImageBounds(imgRef);

  return (
    <div className="menu-page">
      <img
        ref={imgRef}
        src="/assets/menu_bg.png"
        alt="Pilih Pembelajaran"
        className="menu-bg"
        draggable={false}
      />
      {MENU_ZONES.map(({ key, path, label, ...pos }) => (
        <HotZone
          key={key}
          bounds={bounds}
          {...pos}
          onClick={() => navigate(path)}
          ariaLabel={label}
        />
      ))}
    </div>
  );
}