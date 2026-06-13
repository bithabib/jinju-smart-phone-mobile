import { createContext, useContext, useEffect, useState } from "react";

// Translation dictionary. Each key has { en, ko }.
const STRINGS = {
  // Nav
  nav_home: { en: "Home", ko: "홈" },
  nav_offers: { en: "Offers", ko: "특가" },
  nav_links: { en: "Links", ko: "링크" },
  nav_sell: { en: "Sell Sheet", ko: "판매장부" },
  nav_admin: { en: "Admin", ko: "관리자" },
  nav_card: { en: "Card", ko: "명함" },
  nav_gallery: { en: "Gallery", ko: "갤러리" },

  // Gallery
  gallery_title: { en: "Our Shop", ko: "매장 둘러보기" },
  gallery_subtitle: { en: "Take a look inside Jinju Smart Phone Mobile.", ko: "진주중고폰 매장을 둘러보세요." },
  gallery_see_all: { en: "See all photos", ko: "사진 모두 보기" },
  gallery_count: { en: "photos", ko: "장의 사진" },

  // Business card
  card_title: { en: "Business Card", ko: "명함" },
  card_subtitle: { en: "Print this card. The QR opens all your social links.", ko: "이 명함을 인쇄하세요. QR을 스캔하면 모든 소셜 링크가 열립니다." },
  card_scan: { en: "Scan for all our links", ko: "스캔하면 모든 링크로 연결" },
  card_front: { en: "Front", ko: "앞면" },
  card_back: { en: "Back", ko: "뒷면" },
  card_print: { en: "Print / Save as PDF", ko: "인쇄 / PDF 저장" },
  card_download_qr: { en: "Download QR", ko: "QR 다운로드" },
  card_hint: { en: "Tip: in the print dialog choose paper size and set margins to 'None' for an exact 90 × 54 mm card. Each side prints on its own page.", ko: "팁: 인쇄 창에서 여백을 '없음'으로 설정하면 정확한 90 × 54 mm 명함이 됩니다. 앞면과 뒷면은 각각 다른 페이지에 인쇄됩니다." },

  // Hero
  hero_tagline: { en: "Used & New Smartphones · Samsung · LG U+", ko: "중고 · 신규 스마트폰 · 삼성 · LG U+" },
  hero_cta_offers: { en: "See Today's Offers", ko: "오늘의 특가 보기" },
  hero_cta_call: { en: "Call Now", ko: "전화하기" },
  hero_cta_map: { en: "Find Us", ko: "오시는 길" },

  // Offers section
  offers_title: { en: "Featured Offers", ko: "추천 특가 상품" },
  offers_subtitle: { en: "Hand-picked deals — updated by the shop.", ko: "매장에서 직접 고른 특가 상품입니다." },
  offers_empty: { en: "No offers right now. Please check back soon!", ko: "현재 등록된 특가가 없습니다. 곧 다시 확인해 주세요!" },

  // About / contact
  about_title: { en: "Visit Our Shop", ko: "매장 방문 안내" },
  contact_phone: { en: "Mobile", ko: "휴대폰" },
  contact_tel: { en: "Tel", ko: "전화" },
  contact_fax: { en: "Fax", ko: "팩스" },
  contact_email: { en: "Email", ko: "이메일" },
  contact_kakao: { en: "KakaoTalk", ko: "카카오톡" },
  contact_address: { en: "Address", ko: "주소" },
  contact_bank: { en: "Bank Account", ko: "계좌번호" },
  open_map: { en: "Open in Naver Map", ko: "네이버 지도에서 열기" },
  view_directions: { en: "Tap to get directions", ko: "탭하여 길찾기" },

  // Social
  social_title: { en: "Follow & Contact Us", ko: "팔로우 및 문의" },
  social_subtitle: { en: "All our channels in one place.", ko: "모든 채널을 한 곳에서." },

  // Links page
  links_title: { en: "Connect with us", ko: "연결하기" },
  links_subtitle: { en: "Tap any button below.", ko: "아래 버튼을 눌러주세요." },
  links_kakao_scan: { en: "Scan to add on KakaoTalk", ko: "스캔하여 카카오톡 친구추가" },
  links_share: { en: "Share this page", ko: "이 페이지 공유" },

  // QR page
  qr_title: { en: "Your Shop QR Code", ko: "매장 QR 코드" },
  qr_subtitle: { en: "Print this QR. Anyone who scans it gets all your links.", ko: "이 QR을 인쇄하세요. 스캔하면 모든 링크로 연결됩니다." },
  qr_download: { en: "Download QR (PNG)", ko: "QR 다운로드 (PNG)" },
  qr_points_to: { en: "Points to", ko: "연결 주소" },
  qr_print: { en: "Print", ko: "인쇄" },

  // Admin
  admin_title: { en: "Manage Offers", ko: "특가 상품 관리" },
  admin_login: { en: "Owner Login", ko: "관리자 로그인" },
  admin_password: { en: "Password", ko: "비밀번호" },
  admin_login_btn: { en: "Log in", ko: "로그인" },
  admin_logout: { en: "Log out", ko: "로그아웃" },
  admin_wrong: { en: "Wrong password.", ko: "비밀번호가 올바르지 않습니다." },
  admin_add: { en: "Add Offer", ko: "특가 추가" },
  admin_edit: { en: "Edit", ko: "수정" },
  admin_delete: { en: "Delete", ko: "삭제" },
  admin_save: { en: "Save", ko: "저장" },
  admin_cancel: { en: "Cancel", ko: "취소" },
  admin_hint: { en: "Tip: keep it to 3–4 offers for the cleanest look.", ko: "팁: 3~4개의 특가를 유지하면 가장 깔끔합니다." },
  f_title_en: { en: "Title (English)", ko: "제목 (영어)" },
  f_title_ko: { en: "Title (Korean)", ko: "제목 (한국어)" },
  f_price: { en: "Price", ko: "가격" },
  f_desc_en: { en: "Description (English)", ko: "설명 (영어)" },
  f_desc_ko: { en: "Description (Korean)", ko: "설명 (한국어)" },
  f_badge_en: { en: "Badge (English, optional)", ko: "배지 (영어, 선택)" },
  f_badge_ko: { en: "Badge (Korean, optional)", ko: "배지 (한국어, 선택)" },
  f_image: { en: "Image URL", ko: "이미지 URL" },

  // Sell sheet
  sell_title: { en: "Sell Entry Sheet", ko: "판매 입력 장부" },
  sell_subtitle: { en: "Record each phone sale.", ko: "각 휴대폰 판매를 기록하세요." },
  sell_add: { en: "Add Entry", ko: "기록 추가" },
  sell_export: { en: "Export CSV", ko: "CSV 내보내기" },
  sell_search: { en: "Search…", ko: "검색…" },
  sell_empty: { en: "No entries yet. Add your first sale above.", ko: "기록이 없습니다. 위에서 첫 판매를 추가하세요." },
  col_day: { en: "Day", ko: "날짜" },
  col_shop: { en: "Shop", ko: "매장" },
  col_model: { en: "Model", ko: "모델" },
  col_serial: { en: "Serial No.", ko: "시리얼 번호" },
  col_price: { en: "Price", ko: "가격" },
  col_imei: { en: "IMEI No.", ko: "IMEI 번호" },
  col_name: { en: "Name", ko: "이름" },
  col_sign: { en: "Sign", ko: "서명" },
  col_sal: { en: "Sal", ko: "판매" },
  col_action: { en: "Action", ko: "관리" },
  sell_total: { en: "Total entries", ko: "총 기록" },

  // Common
  loading: { en: "Loading…", ko: "불러오는 중…" },
  back_home: { en: "← Back to home", ko: "← 홈으로" },
  copied: { en: "Copied!", ko: "복사됨!" },
  footer_rights: { en: "All rights reserved.", ko: "모든 권리 보유." },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "ko");

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // t(key) → translated string in current language
  const t = (key) => {
    const entry = STRINGS[key];
    if (!entry) return key;
    return entry[lang] ?? entry.en;
  };

  const toggle = () => setLang((l) => (l === "ko" ? "en" : "ko"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

// Helper to pick the right field of an object by language, e.g. pick(item, "title")
export function pick(obj, base, lang) {
  const key = base + (lang === "ko" ? "Ko" : "En");
  return obj[key] ?? obj[base + "En"] ?? obj[base + "Ko"] ?? "";
}
