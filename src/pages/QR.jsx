import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLang } from "../i18n";
import { BUSINESS, LINKS_URL } from "../config";

export default function QR() {
  const { t, lang } = useLang();
  const wrapRef = useRef(null);
  const name = lang === "ko" ? BUSINESS.nameKo : BUSINESS.nameEn;

  // The QR points to the live Links hub (hardcoded so it never encodes localhost).
  const [url, setUrl] = useState(LINKS_URL);

  const download = () => {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "jinju-smart-phone-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section className="section qr-page">
      <div className="section-head">
        <h2>{t("qr_title")}</h2>
        <p>{t("qr_subtitle")}</p>
      </div>

      <div className="qr-box" ref={wrapRef}>
        <div className="qr-frame">
          <QRCodeCanvas
            value={url}
            size={260}
            level="H"
            includeMargin
            fgColor="#0a4da2"
          />
          <p className="qr-name">{name}</p>
        </div>

        <div className="qr-meta">
          <label className="field">
            <span>{t("qr_points_to")}</span>
            <input value={url} onChange={(e) => setUrl(e.target.value)} />
          </label>
          <div className="qr-actions">
            <button className="btn btn-primary" onClick={download}>
              {t("qr_download")}
            </button>
            <button className="btn btn-ghost" onClick={() => window.print()}>
              {t("qr_print")}
            </button>
          </div>
          <p className="muted small">
            {lang === "ko"
              ? "사이트를 배포한 후 이 페이지에서 QR을 다운로드하여 인쇄하세요."
              : "After you deploy the site, download the QR from this page and print it."}
          </p>
        </div>
      </div>
    </section>
  );
}
