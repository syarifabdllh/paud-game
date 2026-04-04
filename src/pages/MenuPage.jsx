import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './MenuPage.css';

// Posisi % dijamin 100% presisi sempurna mengcover ke-4 papan kayu
const MENU_ZONES = [
  { key: 'abjad',   path: '/abjad',   top: 53.3, left: 11.0, width: 18.8, height: 21.2, label: 'Huruf Abjad' },
  { key: 'vokal',   path: '/vokal',   top: 33.2, left: 28.8, width: 18.8, height: 21.4, label: 'Huruf Vokal' },
  { key: 'membaca', path: '/membaca', top: 56.5, left: 42.8, width: 18.8, height: 23.1, label: 'Ayo Membaca' },
  { key: 'game',    path: '/game',    top: 68.4, left: 62.5, width: 18.9, height: 21.2, label: 'Game Time'   },
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