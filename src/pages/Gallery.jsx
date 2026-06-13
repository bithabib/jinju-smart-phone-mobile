import { useState } from "react";
import { useLang } from "../i18n";
import { resolveImg } from "../config";
import { GALLERY } from "../gallery";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const { t } = useLang();
  const [active, setActive] = useState(null);

  return (
    <section className="section">
      <div className="section-head">
        <h2>{t("gallery_title")}</h2>
        <p>{t("gallery_subtitle")} · {GALLERY.length} {t("gallery_count")}</p>
      </div>

      <div className="gallery-grid">
        {GALLERY.map((src, i) => (
          <button className="gallery-item" key={src} onClick={() => setActive(i)}>
            <img src={resolveImg(src)} alt={`Shop photo ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <Lightbox images={GALLERY} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </section>
  );
}
