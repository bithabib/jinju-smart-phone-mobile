// =============================================================
//  Data layer
//  - If a real Firebase config is filled in below, the site uses
//    Cloud Firestore (live sync across all devices).
//  - If the config still has the "REPLACE_ME" placeholders, the
//    site automatically falls back to the browser's localStorage
//    so everything works immediately for testing / demo.
//  See README.md for how to create your free Firebase project.
// =============================================================

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { DEFAULT_OFFERS } from "./config";

// 🔧 PASTE YOUR FIREBASE CONFIG HERE (from Firebase console → Project settings)
const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME",
};

export const FIREBASE_READY = !Object.values(firebaseConfig).some(
  (v) => v === "REPLACE_ME"
);

let db = null;
if (FIREBASE_READY) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

/* ---------------- localStorage fallback helpers ---------------- */
const LS_OFFERS = "jspm_offers";
const LS_SALES = "jspm_sales";

function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  // Notify same-tab listeners
  window.dispatchEvent(new CustomEvent("jspm-ls", { detail: { key } }));
}

function lsSubscribe(key, fallback, cb) {
  const emit = () => cb(lsGet(key, fallback));
  emit();
  const handler = (e) => {
    if (!e.detail || e.detail.key === key) emit();
  };
  window.addEventListener("jspm-ls", handler);
  window.addEventListener("storage", emit);
  return () => {
    window.removeEventListener("jspm-ls", handler);
    window.removeEventListener("storage", emit);
  };
}

/* ----------------------------- OFFERS ----------------------------- */

// subscribeOffers(cb) → returns unsubscribe()
export function subscribeOffers(cb) {
  if (FIREBASE_READY) {
    return onSnapshot(collection(db, "offers"), (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      cb(items);
    });
  }
  // Seed defaults the first time
  if (localStorage.getItem(LS_OFFERS) === null) lsSet(LS_OFFERS, DEFAULT_OFFERS);
  return lsSubscribe(LS_OFFERS, DEFAULT_OFFERS, cb);
}

export async function saveOffer(offer) {
  if (FIREBASE_READY) {
    const id = offer.id || doc(collection(db, "offers")).id;
    const { id: _omit, ...data } = offer;
    await setDoc(doc(db, "offers", id), data);
    return id;
  }
  const list = lsGet(LS_OFFERS, []);
  if (offer.id) {
    const idx = list.findIndex((o) => o.id === offer.id);
    if (idx >= 0) list[idx] = offer;
    else list.push(offer);
  } else {
    offer.id = "o" + Date.now();
    list.push(offer);
  }
  lsSet(LS_OFFERS, list);
  return offer.id;
}

export async function deleteOffer(id) {
  if (FIREBASE_READY) {
    await deleteDoc(doc(db, "offers", id));
    return;
  }
  lsSet(LS_OFFERS, lsGet(LS_OFFERS, []).filter((o) => o.id !== id));
}

/* ------------------------------ SALES ----------------------------- */

export function subscribeSales(cb) {
  if (FIREBASE_READY) {
    const q = query(collection(db, "sales"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }
  return lsSubscribe(LS_SALES, [], (list) =>
    cb([...list].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)))
  );
}

export async function addSale(entry) {
  const record = { ...entry, createdAt: Date.now() };
  if (FIREBASE_READY) {
    const ref = await addDoc(collection(db, "sales"), record);
    return ref.id;
  }
  const list = lsGet(LS_SALES, []);
  record.id = "s" + Date.now();
  list.push(record);
  lsSet(LS_SALES, list);
  return record.id;
}

export async function deleteSale(id) {
  if (FIREBASE_READY) {
    await deleteDoc(doc(db, "sales", id));
    return;
  }
  lsSet(LS_SALES, lsGet(LS_SALES, []).filter((s) => s.id !== id));
}
