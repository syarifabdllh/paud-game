import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './MenuPage.css';

// Posisi % yang sudah dikalibrasi pas menutupi ujung ke ujung tepi papan kayunya
const MENU_ZONES = [
  { key: 'abjad',   path: '/abjad',   top: 53.0, left: 11.0, width: 18.5, height: 22.0, label: 'Huruf Abjad' },
  { key: 'vokal',   path: '/vokal',   top: 33.2, left: 28.8, width: 18.5, height: 21.5, label: 'Huruf Vokal' },
  { key: 'membaca', path: '/membaca', top: 56.5, left: 42.8, width: 18.5, height: 23.0, label: 'Ayo Membaca' },
  { key: 'game',    path: '/game',    top: 68.5, left: 62.6, width: 18.5, height: 21.5, label: 'Game Time'   },
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