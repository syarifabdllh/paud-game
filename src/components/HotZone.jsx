import { useState } from 'react';

export default function HotZone({
  bounds, top, left, width, height,
  onClick, className = '', ariaLabel = '',
}) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  if (!bounds) return null;

  const { renderedW, renderedH, offsetX, offsetY } = bounds;

  const style = {
    position: 'absolute',
    left:   offsetX + (left   / 100) * renderedW,
    top:    offsetY + (top    / 100) * renderedH,
    width:  (width  / 100) * renderedW,
    height: (height / 100) * renderedH,
    zIndex: 2,
    background: active
      ? 'rgba(255,255,255,0.28)'
      : hovered
      ? 'rgba(255,255,255,0.15)'
      : 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '16px',
    transition: 'background 0.12s',
    WebkitTapHighlightColor: 'transparent',
  };

  return (
    <button
      style={style}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    />
  );
}