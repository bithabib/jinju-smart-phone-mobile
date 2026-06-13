import { useState } from "react";
import { useLang } from "../i18n";
import { ADMIN_PASSCODE } from "../config";

const KEY = "jspm_owner_ok";

// Wraps owner-only pages behind a simple passcode.
export default function Gate({ children }) {
  const { t } = useLang();
  const [ok, setOk] = useState(() => sessionStorage.getItem(KEY) === "1");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  if (ok) {
    return (
      <>
        <div className="gate-bar">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              sessionStorage.removeItem(KEY);
              setOk(false);
            }}
          >
            {t("admin_logout")}
          </button>
        </div>
        {children}
      </>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSCODE) {
      sessionStorage.setItem(KEY, "1");
      setOk(true);
    } else {
      setErr(true);
    }
  };

  return (
    <section className="section gate">
      <form className="gate-card" onSubmit={submit}>
        <h2>{t("admin_login")}</h2>
        <label className="field">
          <span>{t("admin_password")}</span>
          <input
            type="password"
            value={pw}
            autoFocus
            onChange={(e) => {
              setPw(e.target.value);
              setErr(false);
            }}
          />
        </label>
        {err && <p className="err">{t("admin_wrong")}</p>}
        <button className="btn btn-primary btn-block" type="submit">
          {t("admin_login_btn")}
        </button>
      </form>
    </section>
  );
}
