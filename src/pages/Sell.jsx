import { useEffect, useMemo, useState } from "react";
import { useLang } from "../i18n";
import { FIREBASE_READY, subscribeSales, addSale, deleteSale } from "../firebase";
import Gate from "../components/Gate";

// Columns mirror the shop's paper sheet.
const COLS = [
  { key: "day", label: "col_day", type: "date" },
  { key: "shop", label: "col_shop" },
  { key: "model", label: "col_model" },
  { key: "serial", label: "col_serial" },
  { key: "price", label: "col_price" },
  { key: "imei", label: "col_imei" },
  { key: "name", label: "col_name" },
  { key: "sign", label: "col_sign" },
  { key: "sal", label: "col_sal" },
];

const EMPTY = COLS.reduce((a, c) => ({ ...a, [c.key]: "" }), {});

function SellInner() {
  const { t, lang } = useLang();
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ ...EMPTY });
  const [q, setQ] = useState("");

  useEffect(() => subscribeSales(setSales), []);

  const submit = async (e) => {
    e.preventDefault();
    await addSale(form);
    setForm({ ...EMPTY });
  };

  const remove = async (id) => {
    if (window.confirm(lang === "ko" ? "삭제하시겠습니까?" : "Delete this entry?")) {
      await deleteSale(id);
    }
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return sales;
    return sales.filter((row) =>
      COLS.some((c) => String(row[c.key] || "").toLowerCase().includes(s))
    );
  }, [sales, q]);

  const exportCsv = () => {
    const header = COLS.map((c) => t(c.label)).join(",");
    const rows = sales.map((row) =>
      COLS.map((c) => `"${String(row[c.key] || "").replace(/"/g, '""')}"`).join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "jinju-sell-sheet.csv";
    link.click();
  };

  return (
    <section className="section sell">
      <div className="section-head">
        <h2>{t("sell_title")}</h2>
        <p>{t("sell_subtitle")}</p>
        {!FIREBASE_READY && (
          <p className="note">
            {lang === "ko"
              ? "데모 모드: 기록이 이 브라우저에만 저장됩니다. Firebase 연결 시 모든 기기에서 공유됩니다."
              : "Demo mode: entries are saved only in this browser. Connect Firebase to share across devices."}
          </p>
        )}
      </div>

      {/* Add form */}
      <form className="sell-form" onSubmit={submit}>
        <div className="sell-form-grid">
          {COLS.map((c) => (
            <label className="field" key={c.key}>
              <span>{t(c.label)}</span>
              <input
                type={c.type || "text"}
                value={form[c.key]}
                onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
              />
            </label>
          ))}
        </div>
        <button className="btn btn-primary" type="submit">+ {t("sell_add")}</button>
      </form>

      {/* Toolbar */}
      <div className="sell-toolbar">
        <input
          className="search"
          placeholder={t("sell_search")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="muted">{t("sell_total")}: {sales.length}</span>
        <button className="btn btn-ghost btn-sm" onClick={exportCsv}>{t("sell_export")}</button>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="sheet">
          <thead>
            <tr>
              {COLS.map((c) => <th key={c.key}>{t(c.label)}</th>)}
              <th>{t("col_action")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td className="empty" colSpan={COLS.length + 1}>{t("sell_empty")}</td></tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id}>
                  {COLS.map((c) => <td key={c.key}>{row[c.key]}</td>)}
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => remove(row.id)}>
                      {t("admin_delete")}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Sell() {
  return (
    <Gate>
      <SellInner />
    </Gate>
  );
}
