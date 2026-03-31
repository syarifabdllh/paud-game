// Posisi dinyatakan dalam % relatif terhadap gambar asli
export default function HotZone({ bounds, top, left, width, height, onClick, className = '', ariaLabel = '' }) {
  if (!bounds) return null;

  const { renderedW, renderedH, offsetX, offsetY } = bounds;

  const style = {
    position: 'absolute',
    left:   offsetX + (left   / 100) * renderedW,
    top:    offsetY + (top    / 100) * renderedH,
    width:  (width  / 100) * renderedW,
    height: (height / 100) * renderedH,
    zIndex: 2,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '16px',
  };

  return (
    <button
      style={style}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    />
  );
}