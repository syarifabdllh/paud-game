import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './VokalPage.css';

const VOKAL = ['a', 'i', 'u', 'e', 'o'];

// Posisi hotzone per slide [top%, left%, width%, height%]
// Urutan: [kartu-0(Aa), kartu-1(Ii), kartu-2(Uu), kartu-3(Ee), kartu-4(Oo)]
const CARD_POSITIONS = [
  // index=0 (Aa aktif): Aa besar kiri, Ii Uu Ee Oo kecil kanan
  [
    { top: 17, left: 8,  width: 26, height: 70, active: true  }, // Aa besar
    { top: 30, left: 38, width: 13, height: 42, active: false }, // Ii kecil
    { top: 30, left: 53, width: 13, height: 42, active: false }, // Uu kecil
    { top: 30, left: 68, width: 13, height: 42, active: false }, // Ee kecil
    { top: 30, left: 83, width: 13, height: 42, active: false }, // Oo kecil
  ],
  // index=1 (Ii aktif): Aa kecil kiri, Ii besar tengah-kiri, Uu Ee Oo kecil kanan
  [
    { top: 30, left: 20, width: 13, height: 42, active: false }, // Aa kecil
    { top: 15, left: 35, width: 26, height: 70, active: true  }, // Ii besar
    { top: 30, left: 63, width: 13, height: 42, active: false }, // Uu kecil
    { top: 30, left: 77, width: 13, height: 42, active: false }, // Ee kecil
    { top: 30, left: 85, width: 11, height: 42, active: false }, // Oo kecil
  ],
  // index=2 (Uu aktif): Aa Ii kecil kiri, Uu besar tengah, Ee Oo kecil kanan
  [
    { top: 30, left: 8,  width: 13, height: 42, active: false }, // Aa kecil
    { top: 30, left: 23, width: 13, height: 42, active: false }, // Ii kecil
    { top: 15, left: 38, width: 26, height: 70, active: true  }, // Uu besar
    { top: 30, left: 66, width: 13, height: 42, active: false }, // Ee kecil
    { top: 30, left: 81, width: 13, height: 42, active: false }, // Oo kecil
  ],
  // index=3 (Ee aktif): Aa Ii Uu kecil kiri, Ee besar tengah-kanan, Oo kecil kanan
  [
    { top: 30, left: 8,  width: 13, height: 42, active: false }, // Aa kecil
    { top: 30, left: 22, width: 13, height: 42, active: false }, // Ii kecil
    { top: 30, left: 36, width: 13, height: 42, active: false }, // Uu kecil
    { top: 15, left: 51, width: 26, height: 70, active: true  }, // Ee besar
    { top: 30, left: 79, width: 13, height: 42, active: false }, // Oo kecil
  ],
  // index=4 (Oo aktif): Aa Ii Uu Ee kecil kiri, Oo besar kanan
  [
    { top: 30, left: 8,  width: 13, height: 42, active: false }, // Aa kecil
    { top: 30, left: 22, width: 13, height: 42, active: false }, // Ii kecil
    { top: 30, left: 36, width: 13, height: 42, active: false }, // Uu kecil
    { top: 30, left: 50, width: 13, height: 42, active: false }, // Ee kecil
    { top: 17, left: 65, width: 26, height: 70, active: true  }, // Oo besar
  ],
];

export default function VokalPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const playAudio = (idx) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    const audio = new Audio(`/assets/audio/${VOKAL[idx]}.mp3`);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  const goTo = (idx) => {
    setIndex(idx);
    playAudio(idx);
  };

  const prev = () => {
    if (index > 0) goTo(index - 1);
    else navigate('/menu');
  };

  const next = () => {
    if (index < 4) goTo(index + 1);
    else navigate('/menu');
  };

  return (
    <div className="vokal-page">
      <img
        src={`/assets/vokal/${index + 1}.png`}
        alt={`Vokal ke-${index + 1}`}
        className="vokal-bg"
        draggable={false}
      />

      {/* Hotzone dinamis per kartu */}
      {CARD_POSITIONS[index].map((pos, i) => (
        <button
          key={i}
          className="vokal-hotzone"
          style={{
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            width: `${pos.width}%`,
            height: `${pos.height}%`,
          }}
          onClick={() => goTo(i)}
          aria-label={`Huruf ${VOKAL[i].toUpperCase()}`}
        />
      ))}

      <BackButton />
      <button className="vokal-hotzone prev" onClick={prev} aria-label="Sebelumnya" />
      <button className="vokal-hotzone next" onClick={next} aria-label="Berikutnya" />
    </div>
  );
}