import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLang, LANGS } from "../i18n";
import { BUSINESS } from "../config";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const name = lang === "ko" ? BUSINESS.nameKo : BUSINESS.nameEn;

  const links = [
    { to: "/", key: "nav_home", end: true },
    { to: "/gallery", key: "nav_gallery" },
    { to: "/links", key: "nav_links" },
    { to: "/card", key: "nav_card" },
    { to: "/sell", key: "nav_sell" },
    { to: "/admin", key: "nav_admin" },
  ];

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">JS</span>
          <span className="brand-text">{name}</span>
        </NavLink>

        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setOpen(false)}
            >
              {t(l.key)}
            </NavLink>
          ))}
          <select
            className="lang-btn"
            value={lang}
            onChange={(e) => { setLang(e.target.value); setOpen(false); }}
            aria-label="Language"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
}
