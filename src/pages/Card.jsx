import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLang } from "../i18n";
import { BUSINESS, LINKS } from "../config";
import { Icon } from "../components/Icons";

export default function Card() {
  const { t, lang } = useLang();
  const backRef = useRef(null);

  const nameEn = BUSINESS.nameEn;
  const nameKo = BUSINESS.nameKo;
  const tagline = lang === "ko" ? BUSINESS.taglineKo : BUSINESS.taglineEn;
  const address = lang === "ko" ? BUSINESS.addressKo : BUSINESS.addressEn;

  // QR points to the live Links hub (works on whatever domain the site is hosted).
  const linksUrl =
    window.location.origin + import.meta.env.BASE_URL + "#/links";

  // Social icons shown on the back (skip the plain "call" entry — phone is on the front).
  const social = LINKS.filter((l) => l.icon !== "phone");

  const downloadQr = () => {
    const canvas = backRef.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "jinju-links-qr.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  return (
    <section className="section card-page">
      <div className="section-head no-print">
        <h2>{t("card_title")}</h2>
        <p>{t("card_subtitle")}</p>
      </div>

      <div className="card-actions no-print">
        <button className="btn btn-primary" onClick={() => window.print()}>
          {t("card_print")}
        </button>
        <button className="btn btn-ghost" onClick={downloadQr}>
          {t("card_download_qr")}
        </button>
      </div>

      <div className="cards">
        {/* ---------------- FRONT ---------------- */}
        <div className="card-wrap">
          <span className="card-label no-print">{t("card_front")}</span>
          <div className="bcard bcard-front">
            <div className="bcard-top">
              <span className="bcard-mark">JS</span>
              <div>
                <div className="bcard-name">{nameEn}</div>
                <div className="bcard-name-ko">{nameKo}</div>
              </div>
            </div>

            <div className="bcard-tagline">{tagline}</div>
            <div className="bcard-brands">Samsung · LG U+</div>

            <div className="bcard-contact">
              <div className="bcard-owner">{BUSINESS.owner}</div>
              <div className="bcard-lines">
                <span><Icon name="phone" size={11} /> {BUSINESS.phone}</span>
                <span>Tel {BUSINESS.tel} · Fax {BUSINESS.fax}</span>
                <span><Icon name="mail" size={11} /> {BUSINESS.email}</span>
                <span><Icon name="kakao" size={11} /> {BUSINESS.kakao}</span>
                <span><Icon name="pin" size={11} /> {address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- BACK ---------------- */}
        <div className="card-wrap" ref={backRef}>
          <span className="card-label no-print">{t("card_back")}</span>
          <div className="bcard bcard-back">
            <div className="bcard-qrbox">
              <QRCodeCanvas value={linksUrl} size={150} level="H" includeMargin fgColor="#0a4da2" />
            </div>
            <div className="bcard-back-text">
              <div className="bcard-scan">{t("card_scan")}</div>
              <div className="bcard-social">
                {social.map((l) => (
                  <span key={l.id} style={{ "--c": l.color }}>
                    <Icon name={l.icon} size={15} />
                  </span>
                ))}
              </div>
              <div className="bcard-back-name">{nameKo} · {nameEn}</div>
            </div>
          </div>
        </div>
      </div>

      <p className="muted small card-tip no-print">{t("card_hint")}</p>
    </section>
  );
}
