import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage    from './pages/HomePage';
import MenuPage    from './pages/MenuPage';
import AbjadPage   from './pages/AbjadPage';
import VokalPage   from './pages/VokalPage';
import MembacaPage from './pages/MembacaPage';
import GamePage    from './pages/GamePage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/menu"    element={<MenuPage />} />
        <Route path="/abjad"   element={<AbjadPage />} />
        <Route path="/vokal"   element={<VokalPage />} />
        <Route path="/membaca" element={<MembacaPage />} />
        <Route path="/game"    element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
