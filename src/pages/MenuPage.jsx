import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './MenuPage.css';

// Posisi % yang sudah dikalibrasi SUPER PRESISI (khusus area papan kayunya saja)
const MENU_ZONES = [
  { key: 'abjad',   path: '/abjad',   top: 53.0, left: 11.4, width: 18.0, height: 22.3, label: 'Huruf Abjad' },
  { key: 'vokal',   path: '/vokal',   top: 33.5, left: 29.1, width: 18.0, height: 22.3, label: 'Huruf Vokal' },
  { key: 'membaca', path: '/membaca', top: 58.6, left: 43.2, width: 18.0, height: 22.3, label: 'Ayo Membaca' },
  { key: 'game',    path: '/game',    top: 68.4, left: 62.9, width: 18.0, height: 22.3, label: 'Game Time'   },
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