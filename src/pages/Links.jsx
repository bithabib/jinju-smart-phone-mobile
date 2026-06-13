import { useState } from "react";
import { useLang } from "../i18n";
import { BUSINESS, LINKS, resolveImg } from "../config";
import { Icon } from "../components/Icons";

export default function Links() {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const name = lang === "ko" ? BUSINESS.nameKo : BUSINESS.nameEn;

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <section className="links-page">
      <div className="links-card">
        <div className="links-avatar">
          <img src={resolveImg("img/kakaotalk.jpeg")} alt={name} />
        </div>
        <h1>{name}</h1>
        <p className="links-tag">{lang === "ko" ? BUSINESS.taglineKo : BUSINESS.taglineEn}</p>

        <div className="links-list">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="link-btn"
              style={{ "--c": l.color }}
            >
              <span className="link-ico"><Icon name={l.icon} size={22} /></span>
              <span className="link-txt">
                <b>{lang === "ko" ? l.labelKo : l.labelEn}</b>
                <small>{l.sub}</small>
              </span>
              <span className="link-arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="kakao-qr">
          <p className="muted">{t("links_kakao_scan")}</p>
          <img src={resolveImg("img/kakao_profile_qr.png")} alt="KakaoTalk QR" />
        </div>

        <button className="btn btn-primary btn-block" onClick={share}>
          <Icon name="share" size={18} /> {copied ? t("copied") : t("links_share")}
        </button>
      </div>
    </section>
  );
}
