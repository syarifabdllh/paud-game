import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './MenuPage.css';

// Posisi 100% presisi tingkat piksel mengcover keseluruhan papan kayu
const MENU_ZONES = [
  { key: 'abjad',   path: '/abjad',   top: 53.8, left: 11.5, width: 17.8, height: 20.3, label: 'Huruf Abjad' },
  { key: 'vokal',   path: '/vokal',   top: 33.0, left: 27.2, width: 20.3, height: 21.5, label: 'Huruf Vokal' },
  { key: 'membaca', path: '/membaca', top: 56.5, left: 41.8, width: 20.3, height: 22.5, label: 'Ayo Membaca' },
  { key: 'game',    path: '/game',    top: 68.9, left: 63.1, width: 17.8, height: 20.3, label: 'Game Time'   },
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