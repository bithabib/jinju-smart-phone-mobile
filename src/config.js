// =============================================================
//  Jinju Smart Phone Mobile — central configuration
//  Edit the values here to update business info & links sitewide.
// =============================================================

// Public URL where the site is deployed. The QR codes always point here, so
// they work even when you generate them while running on localhost.
// 🔧 Change this if you move the site to a custom domain.
export const SITE_URL = "https://bithabib.github.io/jinju-smart-phone-mobile/";

// The "link hub" page that the QR code opens.
export const LINKS_URL = SITE_URL + "#/links";

// Resolve an image path against the deploy base (handles GitHub Pages sub-path).
// - http(s):// or data: URLs are returned unchanged
// - "/img/x" or "img/x" become "<base>img/x" so they work under a sub-path
export function resolveImg(p) {
  if (!p) return p;
  if (/^(https?:|data:)/.test(p)) return p;
  return import.meta.env.BASE_URL + String(p).replace(/^\//, "");
}

// Passcode for the Admin (manage offers) and Sell Sheet pages.
// 🔧 CHANGE THIS to your own secret. (For real security use Firebase Auth —
// see README. This passcode keeps casual visitors out and is fine for a small shop.)
export const ADMIN_PASSCODE = "jinju1434";

export const BUSINESS = {
  nameEn: "Jinju Smart Phone Mobile",
  nameKo: "진주중고폰 Mobile",
  taglineEn: "A Great Place to be Stranded",
  taglineKo: "믿을 수 있는 중고폰 매장",
  owner: "Muhammad Nadeem",
  phone: "010-5757-1434",
  tel: "055-762-1434",
  fax: "055-762-5584",
  email: "nadeem1111@naver.com",
  kakao: "nadeem111",
  addressEn: "Dongjin-ro 205-2, Sang-dong, Jinju-si, Gyeongsangnam-do, South Korea",
  addressKo: "경상남도 진주시 상대동 동진로 205-2",
  bank: "NH 312-0178-5470-21",
  bankHolder: "나딤모함마드 (농협)",
  // Naver Map link for the shop — tapping the address / map button opens this.
  naverMap: "https://naver.me/FmGvhrva",
};

// All social / contact links — used by the QR link hub and footer.
export const LINKS = [
  {
    id: "facebook1",
    labelEn: "Facebook",
    labelKo: "페이스북",
    sub: "Jinju Smart Phone",
    icon: "facebook",
    color: "#1877F2",
    url: "https://www.facebook.com/share/1E2Nzj6XFs/",
  },
  {
    id: "facebook2",
    labelEn: "Facebook · Profile",
    labelKo: "페이스북 · 프로필",
    sub: "Muhammad Nadeem",
    icon: "facebook",
    color: "#1877F2",
    url: "https://www.facebook.com/profile.php?id=100057417281306",
  },
  {
    id: "instagram",
    labelEn: "Instagram",
    labelKo: "인스타그램",
    sub: "@muhammadnadeem791",
    icon: "instagram",
    color: "#E1306C",
    url: "https://www.instagram.com/muhammadnadeem791",
  },
  {
    id: "tiktok",
    labelEn: "TikTok",
    labelKo: "틱톡",
    sub: "@jinjusmartphonekorea1",
    icon: "tiktok",
    color: "#111111",
    url: "https://www.tiktok.com/@jinjusmartphonekorea1",
  },
  {
    id: "whatsapp",
    labelEn: "WhatsApp",
    labelKo: "왓츠앱",
    sub: "Chat with us",
    icon: "whatsapp",
    color: "#25D366",
    url: "https://wa.me/qr/X2EQCT25FYIDK1",
  },
  {
    id: "kakao",
    labelEn: "KakaoTalk",
    labelKo: "카카오톡",
    sub: "nadeem111",
    icon: "kakao",
    color: "#FEE500",
    // Direct add QR is shown as an image on the Links page (kakao_profile_qr.png)
    url: "https://qr.kakao.com/talk/nadeem111",
  },
  {
    id: "call",
    labelEn: "Call the shop",
    labelKo: "전화 걸기",
    sub: "010-5757-1434",
    icon: "phone",
    color: "#0a4da2",
    url: "tel:+821057571434",
  },
];

// Featured offers shown when Firebase has no data yet (and in demo mode).
// The shop owner can override these any time from the Admin page.
export const DEFAULT_OFFERS = [
  {
    id: "demo1",
    titleEn: "Samsung Galaxy S23",
    titleKo: "삼성 갤럭시 S23",
    price: "₩450,000",
    descEn: "Excellent condition · 256GB · Warranty",
    descKo: "최상급 · 256GB · 보증 포함",
    image: "/img/personal_card.jpeg",
    badgeEn: "Hot Deal",
    badgeKo: "특가",
  },
  {
    id: "demo2",
    titleEn: "iPhone 13 Pro",
    titleKo: "아이폰 13 프로",
    price: "₩620,000",
    descEn: "Like new · 128GB · Unlocked",
    descKo: "새것 같음 · 128GB · 언락",
    image: "/img/personal_card.jpeg",
    badgeEn: "Best Seller",
    badgeKo: "베스트",
  },
  {
    id: "demo3",
    titleEn: "LG U+ Plan + Phone",
    titleKo: "LG U+ 요금제 + 단말기",
    price: "From ₩0",
    descEn: "New number activation special",
    descKo: "신규 개통 특별 혜택",
    image: "/img/personal_card.jpeg",
    badgeEn: "Promo",
    badgeKo: "프로모션",
  },
];
