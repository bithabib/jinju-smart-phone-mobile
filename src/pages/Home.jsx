import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang, pick } from "../i18n";
import { BUSINESS, LINKS, resolveImg } from "../config";
import { subscribeOffers } from "../firebase";
import { Icon } from "../components/Icons";

export default function Home() {
  const { t, lang } = useLang();
  const [offers, setOffers] = useState(null);

  useEffect(() => subscribeOffers(setOffers), []);

  const name = lang === "ko" ? BUSINESS.nameKo : BUSINESS.nameEn;
  const tagline = lang === "ko" ? BUSINESS.taglineKo : BUSINESS.taglineEn;
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(BUSINESS.mapQuery);
  const social = LINKS.filter((l) => l.icon !== "phone");

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Samsung · LG U+</span>
          <h1>{name}</h1>
          <p className="hero-tag">{tagline}</p>
          <p className="hero-sub">{t("hero_tagline")}</p>
          <div className="hero-actions">
            <a href="#offers" className="btn btn-primary">{t("hero_cta_offers")}</a>
            <a href={`tel:+82${BUSINESS.phone.replace(/[^0-9]/g, "").replace(/^0/, "")}`} className="btn btn-ghost">
              <Icon name="phone" size={18} /> {t("hero_cta_call")}
            </a>
            <a href={mapUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <Icon name="pin" size={18} /> {t("hero_cta_map")}
            </a>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="section">
        <div className="section-head">
          <h2>{t("offers_title")}</h2>
          <p>{t("offers_subtitle")}</p>
        </div>

        {offers === null ? (
          <p className="muted center">{t("loading")}</p>
        ) : offers.length === 0 ? (
          <p className="muted center">{t("offers_empty")}</p>
        ) : (
          <div className="offer-grid">
            {offers.map((o) => {
              const badge = pick(o, "badge", lang);
              return (
                <article className="offer-card" key={o.id}>
                  {o.image && (
                    <div className="offer-img">
                      <img src={resolveImg(o.image)} alt={pick(o, "title", lang)} loading="lazy" />
                      {badge && <span className="offer-badge">{badge}</span>}
                    </div>
                  )}
                  <div className="offer-body">
                    <h3>{pick(o, "title", lang)}</h3>
                    <p className="offer-desc">{pick(o, "desc", lang)}</p>
                    <div className="offer-foot">
                      <span className="offer-price">{o.price}</span>
                      <a
                        className="btn btn-sm"
                        href={LINKS.find((l) => l.id === "whatsapp").url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {lang === "ko" ? "문의하기" : "Inquire"}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* SOCIAL */}
      <section className="section section-alt">
        <div className="section-head">
          <h2>{t("social_title")}</h2>
          <p>{t("social_subtitle")}</p>
        </div>
        <div className="social-row">
          {social.map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="social-chip"
              style={{ "--c": l.color }}
            >
              <Icon name={l.icon} size={22} />
              <span>{lang === "ko" ? l.labelKo : l.labelEn}</span>
            </a>
          ))}
        </div>
        <div className="center" style={{ marginTop: 18 }}>
          <Link to="/links" className="btn btn-primary">
            <Icon name="share" size={18} /> {t("links_title")}
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section">
        <div className="section-head">
          <h2>{t("about_title")}</h2>
        </div>
        <div className="contact-grid">
          <ul className="contact-list">
            <li><b>{t("contact_address")}</b><span>{lang === "ko" ? BUSINESS.addressKo : BUSINESS.addressEn}</span></li>
            <li><b>{t("contact_phone")}</b><span><a href={`tel:+8210${BUSINESS.phone.slice(3).replace(/-/g, "")}`}>{BUSINESS.phone}</a></span></li>
            <li><b>{t("contact_tel")}</b><span><a href={`tel:${BUSINESS.tel}`}>{BUSINESS.tel}</a></span></li>
            <li><b>{t("contact_fax")}</b><span>{BUSINESS.fax}</span></li>
            <li><b>{t("contact_email")}</b><span><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></span></li>
            <li><b>{t("contact_kakao")}</b><span>{BUSINESS.kakao}</span></li>
            <li><b>{t("contact_bank")}</b><span>{BUSINESS.bank} · {BUSINESS.bankHolder}</span></li>
          </ul>
          <div className="contact-map">
            <iframe
              title="map"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&output=embed`}
            />
            <a href={mapUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-block">
              <Icon name="pin" size={18} /> {t("open_map")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
