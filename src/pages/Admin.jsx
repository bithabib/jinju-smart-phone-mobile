import { useEffect, useState } from "react";
import { useLang, pick } from "../i18n";
import { resolveImg } from "../config";
import { FIREBASE_READY, subscribeOffers, saveOffer, deleteOffer } from "../firebase";
import Gate from "../components/Gate";

const EMPTY = {
  titleEn: "", titleKo: "", price: "", descEn: "", descKo: "",
  badgeEn: "", badgeKo: "", image: "",
};

function AdminInner() {
  const { t, lang } = useLang();
  const [offers, setOffers] = useState([]);
  const [editing, setEditing] = useState(null); // offer object or null

  useEffect(() => subscribeOffers(setOffers), []);

  const startAdd = () => setEditing({ ...EMPTY });
  const startEdit = (o) => setEditing({ ...o });

  const save = async (e) => {
    e.preventDefault();
    await saveOffer(editing);
    setEditing(null);
  };

  const remove = async (id) => {
    if (window.confirm(lang === "ko" ? "삭제하시겠습니까?" : "Delete this offer?")) {
      await deleteOffer(id);
    }
  };

  return (
    <section className="section admin">
      <div className="section-head">
        <h2>{t("admin_title")}</h2>
        <p>{t("admin_hint")}</p>
        {!FIREBASE_READY && (
          <p className="note">
            {lang === "ko"
              ? "데모 모드: 변경 사항이 이 브라우저에만 저장됩니다. Firebase를 연결하면 모든 기기에 적용됩니다 (README 참고)."
              : "Demo mode: changes are saved only in this browser. Connect Firebase to sync across all devices (see README)."}
          </p>
        )}
      </div>

      {!editing && (
        <button className="btn btn-primary" onClick={startAdd}>+ {t("admin_add")}</button>
      )}

      {editing && (
        <form className="offer-form" onSubmit={save}>
          <div className="form-grid">
            <label className="field"><span>{t("f_title_en")}</span>
              <input value={editing.titleEn} required
                onChange={(e) => setEditing({ ...editing, titleEn: e.target.value })} /></label>
            <label className="field"><span>{t("f_title_ko")}</span>
              <input value={editing.titleKo}
                onChange={(e) => setEditing({ ...editing, titleKo: e.target.value })} /></label>
            <label className="field"><span>{t("f_price")}</span>
              <input value={editing.price}
                onChange={(e) => setEditing({ ...editing, price: e.target.value })} /></label>
            <label className="field"><span>{t("f_image")}</span>
              <input value={editing.image} placeholder="/img/... or https://..."
                onChange={(e) => setEditing({ ...editing, image: e.target.value })} /></label>
            <label className="field"><span>{t("f_desc_en")}</span>
              <input value={editing.descEn}
                onChange={(e) => setEditing({ ...editing, descEn: e.target.value })} /></label>
            <label className="field"><span>{t("f_desc_ko")}</span>
              <input value={editing.descKo}
                onChange={(e) => setEditing({ ...editing, descKo: e.target.value })} /></label>
            <label className="field"><span>{t("f_badge_en")}</span>
              <input value={editing.badgeEn}
                onChange={(e) => setEditing({ ...editing, badgeEn: e.target.value })} /></label>
            <label className="field"><span>{t("f_badge_ko")}</span>
              <input value={editing.badgeKo}
                onChange={(e) => setEditing({ ...editing, badgeKo: e.target.value })} /></label>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">{t("admin_save")}</button>
            <button className="btn btn-ghost" type="button" onClick={() => setEditing(null)}>{t("admin_cancel")}</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {offers.map((o) => (
          <div className="admin-row" key={o.id}>
            {o.image && <img src={resolveImg(o.image)} alt="" />}
            <div className="admin-row-info">
              <b>{pick(o, "title", lang)}</b>
              <span className="muted">{o.price} · {pick(o, "desc", lang)}</span>
            </div>
            <div className="admin-row-actions">
              <button className="btn btn-sm btn-ghost" onClick={() => startEdit(o)}>{t("admin_edit")}</button>
              <button className="btn btn-sm btn-danger" onClick={() => remove(o.id)}>{t("admin_delete")}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Admin() {
  return (
    <Gate>
      <AdminInner />
    </Gate>
  );
}
