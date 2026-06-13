import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { BUSINESS, LINKS } from "../config";
import { Icon } from "./Icons";

export default function Footer() {
  const { t, lang } = useLang();
  const name = lang === "ko" ? BUSINESS.nameKo : BUSINESS.nameEn;
  const social = LINKS.filter((l) => l.icon !== "phone");

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">{name}</div>
          <p className="footer-addr">
            {lang === "ko" ? BUSINESS.addressKo : BUSINESS.addressEn}
          </p>
          <p className="footer-addr">{BUSINESS.phone}</p>
        </div>

        <div className="footer-social">
          {social.map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              aria-label={l.labelEn}
              style={{ "--c": l.color }}
            >
              <Icon name={l.icon} size={20} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {name}. {t("footer_rights")}</span>
        <Link to="/qr">QR</Link>
      </div>
    </footer>
  );
}
