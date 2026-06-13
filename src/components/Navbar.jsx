import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLang } from "../i18n";
import { BUSINESS } from "../config";

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const name = lang === "ko" ? BUSINESS.nameKo : BUSINESS.nameEn;

  const links = [
    { to: "/", key: "nav_home", end: true },
    { to: "/links", key: "nav_links" },
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
          <button className="lang-btn" onClick={toggle}>
            {lang === "ko" ? "EN" : "한국어"}
          </button>
        </nav>
      </div>
    </header>
  );
}
