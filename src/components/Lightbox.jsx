import { useEffect, useCallback } from "react";
import { resolveImg } from "../config";

// Fullscreen image viewer with prev/next + keyboard support.
// Props: images (string[]), index (number|null), onClose(), onChange(newIndex)
export default function Lightbox({ images, index, onClose, onChange }) {
  const open = index !== null && index >= 0;

  const go = useCallback(
    (dir) => {
      if (!open) return;
      const next = (index + dir + images.length) % images.length;
      onChange(next);
    },
    [open, index, images.length, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, onClose]);

  if (!open) return null;

  return (
    <div className="lb" onClick={onClose}>
      <button className="lb-close" aria-label="Close" onClick={onClose}>×</button>
      <button
        className="lb-nav lb-prev"
        aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); go(-1); }}
      >‹</button>

      <img
        className="lb-img"
        src={resolveImg(images[index])}
        alt=""
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="lb-nav lb-next"
        aria-label="Next"
        onClick={(e) => { e.stopPropagation(); go(1); }}
      >›</button>

      <span className="lb-count">{index + 1} / {images.length}</span>
    </div>
  );
}
