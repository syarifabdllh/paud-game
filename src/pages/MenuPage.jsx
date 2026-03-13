import { useNavigate } from 'react-router-dom';
import './MenuPage.css';

export default function MenuPage() {
  const navigate = useNavigate();
  return (
    <div className="menu-page">
      <img
        src="/assets/menu_bg.png"
        alt="Pilih Pembelajaran"
        className="menu-bg"
        draggable={false}
      />
      <button className="hotzone abjad"   onClick={() => navigate('/abjad')}   aria-label="Huruf Abjad" />
      <button className="hotzone vokal"   onClick={() => navigate('/vokal')}   aria-label="Huruf Vokal" />
      <button className="hotzone membaca" onClick={() => navigate('/membaca')} aria-label="Ayo Membaca" />
      <button className="hotzone game"    onClick={() => navigate('/game')}    aria-label="Game Time"   />
    </div>
  );
}