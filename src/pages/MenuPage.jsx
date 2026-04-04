import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './MenuPage.css';

const MENU_ZONES = [
  { key: 'abjad',   path: '/abjad',   top: 53.4, left: 5.3,  width: 20.0, height: 21.5, label: 'Huruf Abjad' },
  { key: 'vokal',   path: '/vokal',   top: 33.0, left: 29.3,  width: 18.2, height: 21.5, label: 'Huruf Vokal' },
  { key: 'membaca',   path: '/membaca',   top: 59.0, left: 43.2,  width: 18.0, height: 20.0, label: 'Ayo Membaca' },
  { key: 'game',   path: '/game',   top: 68.0, left: 70.3,  width: 19.8, height: 21.5, label: 'Game Time' },
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