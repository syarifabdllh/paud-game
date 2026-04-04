import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HotZone from '../components/HotZone';
import useImageBounds from '../components/useImageBounds';
import './MenuPage.css';

const MENU_ZONES = [
  { key: 'abjad',   path: '/abjad',   top: 53.0, left: 11.5,  width: 17.7, height: 21.5, label: 'Huruf Abjad' },
  { key: 'vokal',   path: '/vokal',   top: 33.0, left: 29.7,  width: 17.6, height: 20.8, label: 'Huruf Vokal' },
  { key: 'membaca',   path: '/membaca',   top: 58.9, left: 43.1,  width: 18.2, height: 21.1, label: 'Ayo Membaca' },
  { key: 'game',   path: '/game',   top: 69.0, left: 62.8,  width: 18.2, height: 20.5, label: 'Game Time' },
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